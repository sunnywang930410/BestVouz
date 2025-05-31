import { useDispatch, useSelector } from "react-redux";
import { removeCartItems, selectCartItems, toggleSelectItem, selectedItemsID, updateQuantity } from "@/redux/cartSlice";
import QuantitySelector from "./QuantitySelector"
import { useNavigate } from "react-router";
import { useState } from "react";
function CheckoutList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const selectItemsID = useSelector(selectedItemsID);
    const isSelected = (id) => selectItemsID.includes(id);
    const selectedItems = cartItems.filter(item => isSelected(item.id));
    const selectedCount = selectedItems.length;
    const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantities, 0);
    const selectedTotal = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();
    const handleNavigate = () => {
        if (selectedCount === 0) {
            setShowModal(true);
            return;
        }
        navigate("/checkout/step2");
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
        decoration: "裝飾"
    };
    // 派發更新數量
    const handleChange = (id, newQty) => {
        dispatch(updateQuantity({ id, quantities: newQty }));
    };
    return (
        <div>
            {cartItems.map((item) => (
                <div key={item.id} className="card card-side body-bg flex-col sm:flex-row items-center !rounded-lg border-2 border-primary bg-base-100 space-y-2 sm:space-y-0 sm:space-x-6 p-4 mb-6">
                    {/* checkbox */}
                    <div className="flex-shrink-0 pr-2">
                        <input
                            type="checkbox"
                            className="checkbox border-2 border-primary"
                            checked={isSelected(item.id)}
                            onChange={() => dispatch(toggleSelectItem(item.id))}
                        />
                    </div>
                    {/* 圖片區 */}
                    <div className="w-40 flex items-center justify-center ml-16">
                        <img
                            src={item.cover}
                            alt={item.name}
                            className="object-cover w-full h-full rounded-lg"
                        />
                    </div>
                    <div className="flex justify-between items-center w-2/3 relative">
                        {/* 商品標題 + 客製化內容 */}
                        <div className="flex flex-col">
                            <h2 className="text-lg font-medium text-left font-semibold mb-1">
                                {item.name}
                                {item.customSelections["size"] && item.customSelections["size"].trim() !== "" && (
                                    <> ({item.customSelections["size"]})</>
                                )}
                            </h2>

                            {/* 客製化選項 */}
                            {item.customSelections && (
                                <div className="text-sm text-gray-400">
                                    {Object.entries(item.customSelections).map(([key, value]) => {
                                        if (key === "size" || !value || value === "無" || value === "none" || value === "null" || value === "" || value.length === 0) return null;
                                        return (
                                            <div key={key} className="flex gap-1">
                                                <span className="font-medium capitalize">
                                                    {(key === "fruit" || key === "cream") ? "+" : labelMap[key] + ":"}
                                                </span>
                                                <span>{value}</span>
                                            </div>
                                        )
                                    })}
                                    {item.hasText && <span className="flex font-medium text-left">文字留言: {item.text}</span>}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* 右側：數量、價格、移除 */}
                    <div className="flex items-center gap-4 sm:gap-6 w-1/3 custom-text-gray-800">
                        <QuantitySelector
                            value={item.quantities}
                            onChange={(newQty) => handleChange(item.id, newQty)}
                        />
                        <div className="text-lg w-20 text-right whitespace-nowrap font-medium custom-text-gray-800">
                            ${item.totalPrice}
                        </div>
                        <button
                            className="btn btn-xs btn-circle body-bg hover:bg-[#F3E7BE]"
                            onClick={() => dispatch(removeCartItems(item.id))}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            ))}
            <div className="mt-12">
                {/* 計算勾選商品數 */}
                <div>
                    {selectedCount >= 0 && (
                        <div className="text-right text-base mt-12 font-semibold custom-text-gray-800">
                            已勾擇 <span className="custom-text-gray-800">{selectedCount}</span> 筆商品（共{selectedQuantity}件）
                        </div>
                    )}
                    {/* 價格總計 */}
                    <div className="text-right text-xl mt-8 font-semibold custom-text-red-600">
                        總計：${selectedTotal}
                    </div>
                </div>
                {/* 下一步按鈕 */}
                <div className="flex justify-end mt-12">
                    <button
                        className="px-10 py-2 rounded-lg bg-secondary border-2 border-transparent text-white
                 transition-colors duration-200 
                 hover:bg-secondary-content
                 active:bg-secondary-content"
                        onClick={() => { handleNavigate(); }}
                    >
                        下一步
                    </button>
                </div>
            </div>
            {showModal && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                    <div className="min-h-[220px] body-bg px-6 py-5 rounded-xl shadow-xl border border-gray-200 w-[90%] max-w-md text-center space-y-4 flex flex-col justify-center">
                        <div className="text-xl">您尚未勾選任何商品，請選擇後再繼續！</div>
                        <div className="mt-4">
                            <button
                                className="px-10 py-2 rounded-lg custom-button body-text transition text-lg"
                                onClick={() => setShowModal(false)}
                            >
                                確認
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default CheckoutList;