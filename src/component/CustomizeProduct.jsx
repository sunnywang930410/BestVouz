import CustomizationOption from "./CustomizationOption";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import AddToCart from "./AddToCart";

function CustomizeProduct({ product }) {
    const [text, setText] = useState(""); // 用來儲存文字留言的狀態

    const handleTextChange = (e) => {
        if (e.target.value.length <= 30) { // 檢查輸入的字數
            setText(e.target.value); // 更新文字狀態
        }
    };
    return (
        <div>
            {/* 客製化選單標題 */}
            <div className="p-16">
                <h2 className="text-2xl">
                    客製化選單
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 左側：蛋糕圖片、名稱、原價  */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-between w-[400px] px-4 text-xl">
                        <span>{product.name}</span>
                        <span>{product.price}</span>
                    </div>
                    <img
                        alt={product.name}
                        className="w-[400px] h-auto rounded-xl shadow-md"
                        src={product.cover}
                    />
                </div>
                {/* 右側：客製化選項 */}
                <div className="flex flex-col gap-4">
                    <h4 className="text-left text-xl">蛋糕內容</h4>
                    {/* 蛋糕內容 */}
                    <div className="border-[3px] border-primary rounded-xl p-8 mb-16">
                        {/* 尺寸 */}
                        <CustomizationOption
                            type="selector"
                            product={product} // 哪種商品
                            label="size"
                            title="尺寸"
                        />
                        {/* 外層水果 */}
                        {["生日蛋糕", "戚風蛋糕"].includes(product.name) && <CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="fruit"
                            title="外層水果"
                            tip={20}
                        />}
                        {/* 造型 */}
                        {product.name == "造型蛋糕" && (<CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="style"
                            title="造型"
                        />)}
                        {/* 內餡 */}
                        {["生日蛋糕", "造型蛋糕"].includes(product.name) && (<CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="inside"
                            title="內餡"
                            tip={20}
                        />)}
                        {/* 鮮奶油 */}
                        <CustomizationOption
                            type="checkbox"
                            product={product} // 哪種商品
                            label="cream"
                            title="鮮奶油"
                            tip={10}
                        />
                        {/* 文字留言 */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2 text-left">
                                {/* 左側標題 */}
                                <h4 className="text-lg">文字留言</h4>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={handleTextChange}
                                    maxLength={30}
                                    placeholder="為壽星寫下祝福吧！（最多30字）"
                                    className="input w-full pr-12" // 添加了 pr-12 來騰出空間
                                />
                                {/* 字數計數器 */}
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm">{text.length}/30</span>
                            </div>
                        </div>
                        {/* 選擇文字醬料 */}
                        <CustomizationOption
                            type="text"
                            product={product} // 哪種商品
                            label="text-jam"
                            title="選擇文字醬料"
                        />
                        {/* 插圖 */}
                        {product.name == "戚風蛋糕" && (<CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="picture"
                            title="插圖"
                            tip={5}
                        />)}
                        {/* 選擇插圖醬料 */}
                        {product.name == "戚風蛋糕" && (<CustomizationOption
                            type="text"
                            product={product} // 哪種商品
                            label="picture-jam"
                            title="選擇插圖醬料"
                        />)}
                        {/* 數量 */}
                        <div className="mb-6 flex items-center justify-between">
                            <h4 className="text-lg text-left">數量</h4>
                            <QuantitySelector />
                        </div>
                    </div>
                    <h4 className="text-left text-lg">配件選擇</h4>
                    {/* 配件選擇 */}
                    <div className="border-[3px] border-primary rounded-xl p-8">
                        {/* 蠟燭 */}
                        <CustomizationOption
                            type="button"
                            product={product} // 哪種商品
                            label="candle"
                            title="蠟燭"
                            tip="最多選3個"
                        />
                        {/* 餐具數量 */}
                        <div className="mb-6 flex items-center justify-between">
                            <h4 className="text-lg text-left">餐具數量</h4>
                            <QuantitySelector />
                        </div>
                        {/* 裝飾 */}
                        <CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="decoration"
                            title="裝飾"
                            tip={5}
                        />
                    </div>
                    <div className="flex items-center justify-between p-2 mb-16">
                        <span className="text-2xl">Total:</span>
                        <AddToCart />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomizeProduct;

