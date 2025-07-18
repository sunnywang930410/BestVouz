import { useDispatch, useSelector } from "react-redux";
import { removeCartItems, clearCart, selectCartItems, updateQuantity } from "@/redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../component/ModalContext";
import { useContext, useState, useEffect } from 'react';
import { auth } from "../api/firebaseconfig";
import { onAuthStateChanged } from "firebase/auth";
function CartContent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);
    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.totalPrice;
    }, 0);
    const { toggleModal } = useContext(ModalContext);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const labelMap = {
        size: "尺寸",
        fruit: "外層水果",
        cream: "鮮奶油",
        "text-jam": "文字醬料",
        candle: "蠟燭",
        decoration: "裝飾"
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setIsLoggedIn(!!user); // user 存在即為 true
        });
        return () => unsubscribe(); // 避免記憶體洩漏
    }, []);
    const handleCheckout = () => {
        if (!isLoggedIn) {
            toggleModal();
            navigate("/auth/login", { state: { redirectTo: "/checkout/step1" } });
            window.scrollTo({ top: 0, behavior: "smooth" });
        } else {
            toggleModal();
            navigate("/checkout/step1");
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };
    return (
        <div className="body-bg space-y-4">
            {cartItems.length === 0 ? (
                <div className="text-center ">Cart is empty</div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="relative flex body-bg shadow-sm border border-2 border-primary rounded-lg overflow-hidden p-2">
                        {/* 圖片區 */}
                        <div className="w-20 flex flex-col items-center justify-end gap-2">
                            <img
                                src={item.cover}
                                alt={item.name}
                                className="object-cover w-full h-3/4 rounded-lg"
                            />
                            <div className="text-lefilteredDataft custom-text-gray-800">
                                <label className="text-sm">數量</label>
                                <select
                                    value={item.quantities}
                                    onChange={(e) =>
                                        dispatch(updateQuantity({
                                            id: item.id,
                                            quantities: parseInt(e.target.value)
                                        }))
                                    }
                                    className="text-sm custom-text-gray-800"
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                        <option className="custom-text-gray-500" key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* 資訊區 */}
                        <div className="flex flex-col p-2 flex-grow relative w-30 whitespace-nowrap">
                            <div>
                                <h2 className="text-base font-semibold text-left mb-1">
                                    {item.name}
                                    {item.customSelections?.size && item.customSelections.size !== "無" && (
                                        <> (
                                            {item.customSelections.size.length > 1
                                                ? item.customSelections.size
                                                : "6吋"}
                                            )
                                        </>
                                    )}
                                </h2>

                                {/* 客製化選項 */}
                                {item.customSelections && (
                                    <div className="text-sm text-gray-400">
                                        {Object.entries(item.customSelections).sort(([keyA], [keyB]) => {
                                            if (keyA === "text-jam") return 1;
                                            if (keyB === "text-jam") return -1;
                                            return 0;
                                        }).map(([key, value]) => {
                                            if (key === "size" || !value || value === "無" || value === "none" || value === "null" || value === "" || value.length === 0) return null;
                                            return (
                                                <div key={key} className="flex gap-1">
                                                    <span className="font-medium capitalize">
                                                        {(key === "fruit" || key === "cream") ? "+" : labelMap[key] + "："}
                                                    </span>
                                                    <span>{value}</span>
                                                </div>
                                            )
                                        })}
                                         {item.hasText && <span className="flex font-medium text-left">文字留言：{item.text}</span>}
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="flex flex-col justify-end">
                            {/* 移除按鈕右上角 */}
                            <button
                                className="absolute top-4 right-2 btn btn-xs btn-circle body-bg hover:bg-[#F3E7BE]"
                                onClick={() => dispatch(removeCartItems(item.id))}
                            >
                                ✕
                            </button>
                            {/* 單品總金額區塊 */}
                            <div className="text-right text-sm custom-text-gray-800">
                                ${item.totalPrice}
                            </div>
                        </div>
                    </div>
                ))
            )}
            {cartItems.length > 0 && (
                <div className="fixed bottom-25 left-5 right-5">
                    <hr className="mb-4 custom-text-gray-800" />
                    <div className="text-right text-lg font-medium custom-text-gray-800">
                        TOTAL: ${totalPrice}
                    </div>
                    <div className="flex justify-between gap-2 mt-12">
                        <button
                            className="w-2/5 px-4 py-2 rounded-lg custom-text-gray-800 border border-2 border-secondary hover:bg-secondary-content/25"
                            onClick={() => dispatch(clearCart())}
                        >
                            清除購物車
                        </button>
                        <button
                            className="w-2/5 px-4 py-2 rounded-lg bg-secondary border-2 border-transparent text-white
                 transition-colors duration-200 
                 hover:bg-secondary-content
                 active:bg-secondary-content"
                            onClick={handleCheckout}
                        >
                            前往結帳
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CartContent;