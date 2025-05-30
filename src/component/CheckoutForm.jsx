import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectCartItems, selectedItemsID } from "@/redux/cartSlice";
function CheckoutForm() {
    const items = useSelector(selectCartItems) || [];
    const ids = useSelector(selectedItemsID) || [];
    // 過濾已勾選的商品
    const cartItems = items.filter((item) => ids.includes(item.id));
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        shipMethod: "",
        address: "",
        payMethod: "",
    });
    const handleChange = (key) => (e) =>
        setForm((f) => ({ ...f, [key]: e.target.value }));
    const navigate = useNavigate();
    const handleNavigateBack = () => {
        navigate("/checkout/step1");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const handleNavigateNext = () => {
        navigate("/checkout/step3");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
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
    const subtotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
    const shippingFee = form.shipMethod === "home" ? 30 : 0;
    const total = subtotal + shippingFee;
    return (
        <>
            <div className="flex flex-col md:flex-row gap-12 items-stretch">
                {/* 左半 */}
                <div className="flex flex-col w-full h-full md:w-1/2 gap-8">
                    {/* 會員資料 */}
                    <section>
                        <h3 className="text-xl mb-2 text-left">會員資料</h3>
                        <fieldset className="fieldset border-[3px] border-primary rounded-xl p-6 custom-text-gray-800 space-y-4">
                            <div className="text-left">
                                <label className="label text-base p-2">姓名</label>
                                <input
                                    className="input w-full"
                                    value={form.name}
                                    onChange={handleChange("name")}
                                    placeholder="Name"
                                />
                            </div>
                            <div className="text-left">
                                <label className="label text-base p-2">電子信箱</label>
                                <input
                                    className="input w-full"
                                    value={form.email}
                                    onChange={handleChange("email")}
                                    placeholder="Email"
                                />
                            </div>
                            <div className="text-left">
                                <label className="label text-base p-2">電話</label>
                                <input
                                    className="input w-full"
                                    value={form.phone}
                                    onChange={handleChange("phone")}
                                    placeholder="Phone"
                                />
                            </div>
                        </fieldset>
                    </section>

                    {/* 送貨／付款 */}
                    <section className="mb-24">
                        <h3 className="text-xl mb-2 text-left">選擇送貨與付款方式</h3>
                        <fieldset className="fieldset border-[3px] border-primary rounded-xl p-6 custom-text-gray-800 space-y-4">
                            {/* 送貨方式 */}
                            <div className="text-left">
                                <label className="label text-base p-2">送貨方式</label>
                                <select
                                    className="select w-full"
                                    value={form.shipMethod}
                                    onChange={handleChange("shipMethod")}
                                >
                                    <option value="">請選擇送貨方式</option>
                                    <option value="home">外送</option>
                                    <option value="pickup">現場取貨</option>
                                </select>
                            </div>

                            {/* 送貨地點：只有外送才輸入 */}
                            {form.shipMethod === "home" && (
                                <div className="text-left">
                                    <label className="label text-base p-2">送貨地址</label>
                                    <input
                                        className="input w-full"
                                        value={form.address}
                                        onChange={handleChange("address")}
                                        placeholder="Address"
                                    />
                                </div>
                            )}

                            {/* 付款方式 */}
                            <div className="text-left">
                                <label className="label text-base p-2">付款方式</label>
                                <select
                                    className="select w-full"
                                    value={form.payMethod}
                                    onChange={handleChange("payMethod")}
                                >
                                    <option value="">請選擇付款方式</option>
                                    <option value="credit">信用卡</option>
                                    <option value="atm">ATM 轉帳</option>
                                    <option value="cod">貨到付款</option>
                                </select>
                            </div>
                        </fieldset>
                    </section>
                </div>
                {/* 右半：結帳明細 */}
                <div className="flex flex-col relative w-full h-full md:w-1/2">
                    <h3 className="text-xl mb-2 text-left">結帳明細</h3>
                    <div className="flex-1 flex">
                        <fieldset className="fieldset border-[3px] border-primary rounded-xl p-6 w-full pb-32">
                            {cartItems.map((item) => (
                                <div key={item.id} className="flex gap-4 mb-4">
                                    {/* 圖片 */}
                                    <img
                                        src={item.cover}
                                        alt={item.name}
                                        className="w-1/4 h-30 object-cover rounded-lg"
                                    />
                                    {/* 文字資訊 */}
                                    <div className="flex-1 text-left">
                                        <h4 className="font-medium text-base">
                                            {item.name} (
                                            {item.customSelections.size.length < 2 ? "6吋" : item.customSelections.size})
                                        </h4>
                                        <div className="text-sm custom-text-gray-500">
                                            {Object.entries(item.customSelections).map(([k, v]) =>
                                                k === "size" || !v ? null : (
                                                    <div key={k}>
                                                        {(k === "fruit" || k === "cream") ? "+" : labelMap[k] + ":"}
                                                        {v}
                                                        {console.log("value", v)}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                        <div className="text-sm custom-text-gray-800">NT$ {item.totalPrice}</div>
                                        <div className="absolute bottom-6 right-6 w-[calc(100%-3rem)] mt-12 text-right space-y-2 custom-text-gray-800">
                                            <div className="flex justify-between text-base">
                                                <span>小計：</span>
                                                <span>NT$ {subtotal}</span>
                                            </div>
                                            {form.shipMethod === "home" && (
                                                <div className="flex justify-between text-base">
                                                    <span>運費：</span>
                                                    <span>NT$ {shippingFee}</span>
                                                </div>
                                            )}
                                            <div className="border-t mt-2"></div>
                                            <div className="flex justify-between font-semibold text-xl custom-text-red-600">
                                                <span>總計：</span>
                                                <span>NT$ {total}</span>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ))}
                        </fieldset>
                    </div>
                </div>
            </div>
            <div className="flex justify-between mb-12">
                <button
                    className="px-10 py-2 rounded-lg custom-text-gray-800 border border-2 border-secondary hover:bg-secondary-content/25"
                    onClick={() => { handleNavigateBack(); }}
                >
                    上一步
                </button>
                <button
                    className="px-10 py-2 rounded-lg bg-secondary border-2 border-transparent text-white
                 transition-colors duration-200 
                 hover:bg-secondary-content
                 active:bg-secondary-content"
                    onClick={() => { handleNavigateNext(); }}
                >
                    下一步
                </button>
            </div>
        </>
    );
}

export default CheckoutForm;
