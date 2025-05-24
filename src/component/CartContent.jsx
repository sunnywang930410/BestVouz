import { useDispatch, useSelector } from "react-redux";
import { removeCartItems, clearCart, selectCartItems, updateQuantity } from "@/redux/cartSlice";
import { useNavigate } from "react-router";
import { ModalContext } from "../component/ModalContext";
import { useContext } from 'react';
function CartContent() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const totalPrice = cartItems.reduce((total, item) => {
        console.log(item.totalPrice)
        return total + item.totalPrice;
    }, 0);
    const labelMap = {
        size: "尺寸",
        fruit: "外層水果",
        cream: "鮮奶油",
        "text-jam": "文字醬料",
        candle: "蠟燭",
        decoration: "裝飾"
    };
    const { toggleModal } = useContext(ModalContext);
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate("/checkout/step1");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
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
                            <div className="text-left text-gray-800">
                                <label className="text-sm">數量</label>
                                <select
                                    value={item.quantities}
                                    onChange={(e) =>
                                        dispatch(updateQuantity({
                                            id: item.id,
                                            quantities: parseInt(e.target.value)
                                        }))
                                    }
                                    className="text-sm"
                                >
                                    {Array.from({ length: 10 }, (_, i) => i + 1).map(num => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {/* 資訊區 */}
                        <div className="flex flex-col p-2 flex-grow relative w-30 whitespace-nowrap">
                            <div>
                                <h2 className="text-base font-semibold text-left mb-1">{item.name}({item.customSelections["size"].length < 2 ? "6吋" : item.customSelections["size"]})</h2>

                                {/* 客製化選項 */}
                                {item.customSelections && (
                                    <div className="text-sm text-gray-400">
                                        {Object.entries(item.customSelections).map(([key, value]) => {
                                            console.log("customSelections:", item.customSelections.fruit);
                                            if (key === "size" || !value || value.length === 0) return null;
                                            return (
                                                <div key={key} className="flex gap-1">
                                                    <span className="font-medium capitalize">
                                                        {(key === "fruit" || key === "cream") ? "+" : labelMap[key] + ":"}
                                                    </span>
                                                    <span>{value}</span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                )}
                            </div>

                        </div>
                        <div className="flex flex-col justify-end">
                            {/* 移除按鈕右上角 */}
                            <button
                                className="absolute top-4 right-2 btn btn-xs btn-circle bg-[#FFFEE9] hover:bg-[#F3E7BE]"
                                onClick={() => dispatch(removeCartItems(item.id))}
                            >
                                ✕
                            </button>
                            {/* 單品總金額區塊 */}
                            <div className="text-right text-sm text-gray-800">
                                ${item.totalPrice}
                            </div>
                        </div>
                    </div>
                ))
            )}
            {cartItems.length > 0 && (
                <div className="fixed bottom-25 left-5 right-5">
                    <hr className="mb-4 text-gray-800" />
                    <div className="text-right text-lg font-medium text-gray-800">
                        TOTAL: ${totalPrice}
                    </div>
                    <div className="flex justify-between gap-2 mt-12">
                        <button
                            className="w-2/5 px-4 py-2 rounded-lg border border-primary hover:bg-neutral hover:text-white transition"
                            onClick={() => dispatch(clearCart())}
                        >
                            清除購物車
                        </button>
                        <button
                            className="w-2/5 px-4 py-2 rounded-lg bg-[#E8D69A] body-text hover:bg-[#C8B885] hover:text-white transition flex items-center justify-center"
                            onClick={() => { handleNavigate(); toggleModal(); }}
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