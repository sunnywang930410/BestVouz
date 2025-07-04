import { useEffect, useState } from "react";
import { useLogout, useUpdateProfile, useUserInfo } from "../react-query";
import { getMyOrders } from "../api/fireAuth/index";
import { format } from "date-fns";
import { CircleIcon } from "lucide-react";

const ProfileCard = () => {
    // 更換頭像
    const avatarUrl = "https://img.daisyui.com/images/profile/demo/yellingcat@192.webp";

    const { data: userInfo } = useUserInfo();
    const user = { uid: userInfo?.uid };
    const logout = useLogout();
    const updateProfile = useUpdateProfile();
    const [formData, setFormData] = useState({
        username: userInfo?.username || '',
        // adrs: userInfo?.adrs || '',
        tel: userInfo?.tel || '',
        email: userInfo?.email
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [expandedOrderId, setExpandedOrderId] = useState(null);
    const handleLogout = () => {
        logout.mutate();
    }

    const onChange = (e) => {
        const { name, type, checked, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };
    const handleFinish = (e) => {
        e.preventDefault();
        setShowModal(true);
        updateProfile.mutate({
            uid: user?.uid,
            username: formData.username,
            email: formData.email,
            tel: formData.tel,
        });
    }

    // user資料
    useEffect(() => {
        setFormData({
            username: userInfo?.username || '',
            // adrs: userInfo?.adrs || '',
            tel: userInfo?.tel || '',
            email: userInfo?.email || ''
        });
    }, [userInfo]);
    // order資料
    useEffect(() => {
        (async () => {
            try {
                const data = await getMyOrders();
                setOrders(data);
                if (data.length > 0) {
                    setExpandedOrderId(data[0].id);
                }
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const labelMap = {
        size: "尺寸",
        fruit: "外層水果",
        inside: "內餡",
        cream: "鮮奶油",
        "text-jam": "文字醬料",
        picture: "插圖",
        "picture-jam": "插圖醬料",
        candle: "蠟燭",
        decoration: "裝飾",
    };
    return (
        <div className="mt-12 md:mt-30 lg:mt-30 p-4">
            <div className="text-left flex justify-between items-center gap-0 md:gap-12">
                <div className="flex flex-row item-center gap-8">
                    {userInfo ? (
                        // 已登入 → 顯示頭像
                        <div className="rounded-full overflow-hidden w-15 md:w-20 h-auto">
                            <img src={avatarUrl} alt="User Avatar" />
                        </div>
                    ) : (
                        // 未登入 → 顯示 icon
                        <div className="bg-gray-200 rounded-full flex items-center justify-center w-full h-full">
                            <CircleIcon className="w-12 h-12 text-gray-500" />
                        </div>
                    )}
                    <span className="text-lg md:text-xl lg:text-2xl">{userInfo.username}</span>
                </div>
                <button className="text-right text-base lg:text-lg px-4 py-2 rounded-lg border border-primary hover:bg-neutral" onClick={handleLogout}>登出</button>
            </div>
            <div className="flex flex-col md:flex-row md:flex-row gap-12 items-stretch mt-8">
                <div className="flex flex-col w-full h-full md:w-1/2 gap-4">
                    <h3 className="text-center md:text-left lg:text-left text-lg lg:text-xl">帳戶基本資料</h3>
                    <section className="fieldset border-[3px] border-primary rounded-xl p-4 lg:p-6 custom-text-gray-800 space-y-0 lg:space-y-4">
                        <form className="grid sm:grid-cols-1 gap-4" onSubmit={handleFinish}>
                            <div className="text-center sm:text-left mb-0 lg:mb-2">
                                <label className="label text-base lg:text-lg p-1 md:p-2">姓名</label>
                                <input
                                    name="username"
                                    className="input w-full text-sm lg:text-base"
                                    value={formData.username}
                                    readOnly={!isEditing}
                                    onChange={onChange}
                                    placeholder="Name"
                                />
                            </div>
                            <div className="text-center sm:text-left mb-0 lg:mb-2">
                                <label className="label text-base lg:text-lg p-1 md:p-2">電子信箱</label>
                                <input
                                    name="email"
                                    className="input w-full text-sm lg:text-base"
                                    value={formData.email}
                                    readOnly={!isEditing}
                                    onChange={onChange}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="text-center sm:text-left mb-0 lg:mb-2">
                                <label className="label text-base lg:text-lg p-1 md:p-2">電話</label>
                                <input
                                    name="tel"
                                    className="input w-full text-sm lg:text-base"
                                    value={formData.tel}
                                    readOnly={!isEditing}
                                    onChange={onChange}
                                    placeholder="Phone"
                                />
                            </div>
                        </form >
                        <div className="flex justify-end">
                            <button
                                className="px-6 sm:px-10 btn btn-primary body-text text-base mt-4"
                                onClick={isEditing ? handleFinish : () => setIsEditing(true)}>{isEditing ? "儲存" : "編輯資料"}
                            </button>
                            {showModal && (
                                <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                                    <div className="min-h-[200px] body-bg px-3 py-3 rounded-xl shadow-xl border border-gray-200 w-[90%] max-w-md text-center space-y-4 flex flex-col justify-center">
                                        <div className="text-xl">儲存成功！</div>
                                        <div className="mt-4">
                                            <button
                                                className="px-10 py-2 rounded-lg custom-button body-text transition text-lg"
                                                onClick={() => { setShowModal(false); setIsEditing(false) }}
                                            >
                                                確認
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </section>
                </div>
                <div className="flex flex-col w-full h-full md:w-1/2 gap-8">
                    {/* 訂單紀錄 */}
                    <section className="space-y-5">
                        <h3 className="text-center md:text-left lg:text-left text-lg lg:text-xl">我的訂單</h3>
                        <div className=" max-h-[500px] overflow-y-scroll pr-2 space-y-5">
                            {loading ? (<span className="loading oading-dots loading-sm"></span>)
                                : orders.length === 0 ? (<span className="text-center text-gray-500 text-sm">目前沒有任何訂單</span>)
                                    : (orders.map((order) => (
                                        <div key={order.id} className="collapse collapse-arrow text-gray-800 bg-white rounded-xl shadow p-2 space-y-2">
                                            {/* 訂單基本資訊 */}
                                            <input
                                                type="checkbox"
                                                checked={expandedOrderId === order.id}
                                                onChange={() =>
                                                    setExpandedOrderId(expandedOrderId === order.id ? null : order.id)
                                                }
                                            />
                                            <div className="collapse-title font-semibold flex justify-between items-center">
                                                <span className="font-medium text-gray-800 text-left text-sm md:text-base">訂單編號：{order.id.slice(-8).toUpperCase()}</span>
                                                <span className="text-sm text-gray-500  text-right">
                                                    {format(order.createdAt.toDate?.() ?? order.createdAt, "yyyy/MM/dd HH:mm")}
                                                </span>
                                            </div>

                                            {/* 商品清單 */}
                                            <div className="collapse-content text-sm">
                                                {order.items.map((it) => (
                                                    <div key={it.id} className="pb-2">
                                                        <div className="flex justify-between text-left font-medium">
                                                            <span className="body-text text-sm lg:text-base">
                                                                商品名稱：{it.name}{it.customSelections["size"] &&
                                                                    it.customSelections["size"].trim() !== "" && (
                                                                        <> ({it.customSelections["size"]})</>
                                                                    )}
                                                            </span>
                                                            <span className="text-right">NT$ {it.totalPrice}</span>
                                                        </div>
                                                        {it.customSelections && (
                                                            <div className="text-gray-500 text-left text-sm lg:text-base">
                                                                {Object.entries(it.customSelections).sort(([keyA], [keyB]) => {
                                                                    if (keyA === "text-jam") return 1;
                                                                    if (keyB === "text-jam") return -1;
                                                                    return 0;
                                                                }).map(([k, v]) => {
                                                                    if (
                                                                        k === "size" ||
                                                                        !v ||
                                                                        v === "無" ||
                                                                        v === "none" ||
                                                                        v === "null" ||
                                                                        v === "" ||
                                                                        v.length === 0
                                                                    ) return null;
                                                                    return (
                                                                        v ? (
                                                                            <div className="text-left" key={k}>
                                                                                <span className="font-medium capitalize">
                                                                                    {(k === "fruit" || k === "cream") ? "+" : labelMap[k] + "："}
                                                                                </span>
                                                                                <span>{v}</span>
                                                                            </div>
                                                                        ) : null
                                                                    )
                                                                })}
                                                                {it.hasText && <span className="flex font-medium text-left text-sm lg:text-base">文字留言：{it.text}</span>}
                                                                <span className="flex text-left text-sm lg:text-base">商品數量：{it.quantities}</span>
                                                            </div>
                                                        )}
                                                        {/* 金額與出貨方式 */}
                                                        <div className="text-gray-500 text-left flex flex-col mt-4 text-sm lg:text-base">
                                                            <span>
                                                                取貨方式：{order.buyerInfo.shipMethod === "home" ? "外送" : "現場取貨"}
                                                            </span>
                                                            <span>
                                                                付費方式：{order.buyerInfo.payMethod === "credit" ? "信用卡" : "貨到付款"}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-right custom-text-red-600 font-bold p-2">總計 NT$ {order.totalAmount}</span>
                                        </div>
                                    )))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;