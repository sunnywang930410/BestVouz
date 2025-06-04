import { useEffect, useState } from "react";
import { useLogout, useUpdateProfile, useUserInfo } from "../react-query";
import { getMyOrders } from "../api/fireAuth/index";
import { format } from "date-fns";

const ProfileCard = () => {
    const { data: userInfo } = useUserInfo();
    const logout = useLogout();
    const updateProfile = useUpdateProfile();
    const [formData, setFormData] = useState({
        username: userInfo?.username || '',
        adrs: userInfo?.adrs || '',
        tel: userInfo?.tel || '',
    });
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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
        updateProfile.mutate({
            ...formData,
            uid: userInfo?.uid,
        });
    }
    // user資料
    useEffect(() => {
        setFormData({
            username: userInfo?.username || '',
            adrs: userInfo?.adrs || '',
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
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    if (loading) return <p className="text-center">載入中…</p>;
    if (orders.length === 0) return <p className="text-center">目前沒有任何訂單</p>;


    return (
        // <div className="profile-card mt-40">
        //     <form onSubmit={handleFinish}>
        //         <input
        //             type="text"
        //             name="username"
        //             value={formData.username}
        //             onChange={onChange}
        //         />
        //         <input
        //             type="text"
        //             name="email"
        //             value={formData.email}
        //             onChange={onChange}
        //         />
        //         <button type="submit">Update Profile</button>
        //         <button onClick={handleLogout}>Logout</button>
        //     </form>
        // </div>
        <div className="mt-40">
            <div className="text-left flex justify-start gap-12">
                <img alt="Avatar" />
                <p className="">{userInfo.username}</p>
            </div>
            <div className="flex flex-row md:flex-row gap-12 items-stretch mt-8">
                <div className="flex flex-col w-full h-full md:w-1/2 gap-4">
                    <h3 className="text-xl text-left">帳戶基本資料</h3>
                    <section className="fieldset border-[3px] border-primary rounded-xl p-6 custom-text-gray-800 space-y-4">
                        <div className="grid sm:grid-cols-1 gap-4">
                            <div className="text-left">
                                <label className="label text-base p-2">姓名</label>
                                <input
                                    className="input w-full"
                                    value={userInfo.username}
                                    // onChange={handleChange("name")}
                                    placeholder="Name"
                                />
                            </div>
                            <div className="text-left">
                                <label className="label text-base p-2">電子信箱</label>
                                <input
                                    className="input w-full"
                                    value={userInfo.email}
                                    // onChange={handleChange("email")}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="text-left">
                                <label className="label text-base p-2">電話</label>
                                <input
                                    className="input w-full"
                                    value={userInfo.phone}
                                    // onChange={handleChange("phone")}
                                    placeholder="Phone"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className="w-1/3 btn btn-primary body-text text-base mt-4">編輯資料</button>
                        </div>

                    </section>
                </div>
                <div className="flex flex-col w-full h-full md:w-1/2 gap-8">
                    {/* 2. 訂單紀錄 */}
                    <section className="space-y-5">
                        <h3 className="text-xl text-left">我的訂單</h3>
                        {orders.length === 0 ? (
                            <p className="text-center text-gray-500">目前沒有任何訂單。</p>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className="collapse collapse-arrow bg-white rounded-xl shadow p-2 space-y-2">
                                    {/* 訂單基本資訊 */}
                                    <input type="checkbox" />
                                    <div className="collapse-title font-semibold flex justify-between items-center">
                                        <span className="font-medium text-gray-800">訂單編號：{order.id.slice(-8).toUpperCase()}</span>
                                        <span className="text-sm text-gray-500">
                                            {format(order.createdAt.toDate?.() ?? order.createdAt, "yyyy/MM/dd HH:mm")}
                                        </span>
                                    </div>

                                    {/* 商品清單 */}
                                    <div className="collapse-content text-sm">
                                        {/* {order.items.map((it) => (
                                            <div key={it.id} className="border-b pb-2">
                                                <div className="flex justify-between font-medium">
                                                    <span>
                                                        {it.name} {it.quantities > 1 && `×${it.quantities}`}
                                                    </span>
                                                    <span className="text-right">NT$ {it.totalPrice}</span>
                                                </div>
                                                {it.customSelections && (
                                                    <ul className="ml-4 text-gray-500 list-disc">
                                                        {Object.entries(it.customSelections).map(([k, v]) =>
                                                            v ? (
                                                                <li key={k}>
                                                                    {k}：{Array.isArray(v) ? v.join("、") : v}
                                                                </li>
                                                            ) : null
                                                        )}
                                                    </ul>
                                                )}
                                            </div>
                                        ))} */}
                                    </div>

                                    {/* 金額與出貨方式 */}
                                    {/* <div className="collapse-content2 text-sm text-gray-600 flex justify-between">
                                        <span>
                                            送貨方式：{order.buyerInfo.shipMethod === "home" ? "宅配" : "自取"}
                                        </span>
                                        <span>
                                            付款方式：{order.buyerInfo.payMethod === "credit" ? "信用卡" : "貨到付款"}
                                        </span>
                                    </div> */}

                                    <span className="text-right custom-text-red-600 font-bold p-2">總計 NT$ {order.totalAmount}</span>
                                </div>
                            ))
                        )}
                    </section>
                </div>
            </div>
        </div>
    )
}

export default ProfileCard;