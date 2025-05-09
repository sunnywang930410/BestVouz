import { useDispatch, useSelector } from "react-redux";
import { addCartItems, removeCartItems, selectCartItems } from "@/redux/cartSlice";

function CartContent() {
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);
    // const totalPrice = cartItems.reduce((total, item) => {
    //     return total + (item.price * item.quantities);
    // }, 0);
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
    return (
        <div className="body-bg space-y-4">
            {cartItems.length === 0 ? (
                <div className="text-center ">Cart is empty</div>
            ) : (
                cartItems.map((item) => (
                    <div key={item.id} className="relative flex body-bg shadow-sm border border-2 border-primary rounded-lg overflow-hidden p-2">
                        {/* 圖片區 */}
                        <div className="w-35 flex items-center justify-center">
                            <img
                                src={item.cover}
                                alt={item.name}
                                className="object-cover w-full h-full rounded-lg"
                            />
                        </div>

                        {/* 資訊區 */}
                        <div className="flex flex-col justify-between p-2 flex-grow relative w-full">
                            {/* 移除按鈕右上角 */}
                            <button
                                className="absolute top-2 right-0 btn btn-xs btn-circle btn-outline"
                                onClick={() => dispatch(removeCartItems(item.id))}
                            >
                                ✕
                            </button>

                            <div>
                                <h2 className="text-base">{item.name}({item.customSelections["size"].length < 2 ? "6吋" : item.customSelections["size"]})*{item.quantities}</h2>
                                {/* <p className="text-sm text-gray-600">數量：{item.quantities}</p> */}

                                {/* 客製化選項 */}
                                {item.customSelections && (
                                    <div className="mt-1 text-sm space-y-1">
                                        {Object.entries(item.customSelections).map(([key, value]) => (
                                            key !== "size" && value.length > 0 && (
                                                <div key={key} className="flex gap-1">
                                                    <span className="font-medium capitalize">
                                                        {(key === "fruit" || key === "cream") ? "+" : labelMap[key] + ":"}
                                                    </span>
                                                    <span>{value}</span>
                                                </div>
                                            )
                                        ))}
                                    </div>
                                )}
                            </div>
                            {/* 總金額區塊 */}
                            <div className="text-right text-lg text-sm">
                                ${item.totalPrice}
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default CartContent;