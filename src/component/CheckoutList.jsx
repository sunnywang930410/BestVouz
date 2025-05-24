import { useDispatch, useSelector } from "react-redux";
import { removeCartItems, selectCartItems, toggleSelectItem, selectedItemsID, updateQuantity } from "@/redux/cartSlice";
import QuantitySelector from "./QuantitySelector"
import { useNavigate } from "react-router";
function CheckoutList() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    const selectItemsID = useSelector(selectedItemsID);
    const isSelected = (id) => selectItemsID.includes(id);
    const selectedItems = cartItems.filter(item => isSelected(item.id));
    const selectedCount = selectedItems.length;
    const selectedQuantity = selectedItems.reduce((sum, item) => sum + item.quantities, 0);
    const selectedTotal = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);
    const navigate = useNavigate();
    const handleNavigate = () => {
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
                            className="checkbox"
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
                                {item.name}(
                                {item.customSelections["size"].length < 2 ? "6吋" : item.customSelections["size"]}
                                )
                            </h2>

                            {/* 客製化選項 */}
                            {item.customSelections && (
                                <div className="text-sm text-gray-400">
                                    {Object.entries(item.customSelections).map(([key, value]) => {
                                        if (key === "size" || !value || value.length === 0) return null;
                                        return (
                                            <div key={key} className="flex gap-1">
                                                <span className="font-medium capitalize">
                                                    {(key === "fruit" || key === "cream") ? "+" : labelMap[key] + ":"}
                                                </span>
                                                <span>{value}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                    {/* 右側：數量、價格、移除 */}
                    <div className="flex items-center gap-4 sm:gap-6 w-1/3 text-gray-800">
                        <QuantitySelector
                            value={item.quantities}
                            onChange={(newQty) => handleChange(item.id, newQty)}
                        />
                        <div className="text-lg w-20 text-right whitespace-nowrap font-medium text-gray-800">
                            ${item.totalPrice}
                        </div>
                        <button
                            className="btn btn-xs btn-circle bg-[#FFFEE9] hover:bg-[#F3E7BE]"
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
                        <div className="text-right text-base mt-12 font-semibold text-gray-800">
                            已勾擇 <span className="text-gray-800">{selectedCount}</span> 筆商品（共{selectedQuantity}件）
                        </div>
                    )}
                    {/* 價格總計 */}
                    <div className="text-right text-xl mt-8 font-semibold text-red-600">
                        總計：${selectedTotal}
                    </div>
                </div>
                {/* 下一步按鈕 */}
                <div className="flex justify-end mt-12">
                    <button
                        className="px-10 py-2 rounded-lg bg-[#E8D69A] body-text hover:bg-[#C8B885] hover:text-white"
                        onClick={() => { handleNavigate(); }}
                    >
                        下一步
                    </button>
                </div>

            </div>
        </div>
    );
}

export default CheckoutList;