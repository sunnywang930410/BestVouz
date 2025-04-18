import CustomizationOption from "./CustomizationOption";
import { useState } from "react";
import QuantitySelector from "./QuantitySelector";
import AddToCart from "./AddToCart";

function CustomizeProduct({ product }) {
    const [customSelections, setCustomSelections] = useState({}); // 儲存每個選項的使用者選擇
    const [tipPrices, setTipPrices] = useState({}); // 儲存每個選項的加價（tip）
    const [text, setText] = useState(""); // 用來儲存文字留言的狀態

    // tip計算與紀錄使用者的選項
    const handleOptionChange = (label, value, tip = 0) => {
        // console.log("✅ handleOptionChange 被呼叫！");
        // console.log("label:", label);
        //console.log("value:", value);
        //console.log("tip:", tip);
        tip = (!isNaN(tip)) ? tip : 0;
        setCustomSelections((prev) => {
            const newSelections = {
                ...prev,
                [label]: value,
            };
            //console.log("🟡 更新後 customSelections:", newSelections);
            return newSelections;
        });

        setTipPrices((prev) => {
            const newTipPrices = {
                ...prev,
                [label]: tip,
            };
            //console.log("🔵 更新後 tipPrices:", newTipPrices);
            return newTipPrices;
        });
    };
    const [quantities, setQuantity] = useState(1);

    const handleQuantityChange = (val) => {
        //console.log("val 是：", val); 
        setQuantity(val);
    };
    // 計算總加價
    const totalTip = Object.values(tipPrices).reduce((sum, val) => sum + val, 0);
    const totalPrice = (Number(product.price) + totalTip) * quantities;

    // 文字留言
    const handleTextChange = (e) => {
        if (e.target.value.length <= 30) { // 檢查輸入的字數
            setText(e.target.value); // 更新文字狀態
        }
    };

    return (
        <div>
            {/* 客製化選單標題 */}
            <div className="p-4 sm:p-8 md:p-16">
                <h2 className="text-xl sm:text-lg md:text-2xl">
                    客製化選單
                </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {/* 左側：蛋糕圖片、名稱、原價 */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-between w-[300px] sm:w-[400px] px-4 text-lg md:text-xl">
                        <span>{product.name}</span>
                        <span>${product.price}</span>
                    </div>
                    <img
                        alt={product.name}
                        className="w-[300px] sm:w-[400px] h-auto rounded-xl shadow-md"
                        src={product.cover}
                    />
                </div>
                {/* 右側：客製化選項 */}
                <div className="flex flex-col gap-4">
                    <span className="text-left text-lg md:text-xl">蛋糕內容</span>
                    {/* 蛋糕內容 */}
                    <div className="border-[3px] border-primary rounded-xl p-6 sm:p-8 mb-12 sm:mb-16">
                        {/* 尺寸 */}
                        <CustomizationOption
                            type="selector"
                            product={product} // 哪種商品
                            label="size"
                            title="尺寸"
                            onOptionChange={handleOptionChange}
                        />
                        {/* 外層水果 */}
                        {["生日蛋糕", "戚風蛋糕"].includes(product.name) && (
                            <CustomizationOption
                                type="image"
                                product={product} // 哪種商品
                                label="fruit"
                                title="外層水果"
                                tip={20}
                                onOptionChange={handleOptionChange}
                            />
                        )}
                        {/* 造型 */}
                        {product.name === "造型蛋糕" && (
                            <CustomizationOption
                                type="image"
                                product={product} // 哪種商品
                                label="style"
                                title="造型"
                            />
                        )}
                        {/* 內餡 */}
                        {["生日蛋糕", "造型蛋糕"].includes(product.name) && (
                            <CustomizationOption
                                type="image"
                                product={product} // 哪種商品
                                label="inside"
                                title="內餡"
                                tip={20}
                                onOptionChange={handleOptionChange}
                            />
                        )}
                        {/* 鮮奶油 */}
                        <CustomizationOption
                            type="checkbox"
                            product={product} // 哪種商品
                            label="cream"
                            title="鮮奶油"
                            tip={10}
                            onOptionChange={handleOptionChange}
                        />
                        {/* 文字留言 */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2 text-left">
                                {/* 左側標題 */}
                                <h4 className="text-md sm:text-lg">文字留言</h4>
                            </div>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={text}
                                    onChange={handleTextChange}
                                    maxLength={30}
                                    placeholder="為壽星寫下祝福吧！（最多30字）"
                                    className="input w-full pr-12"
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
                            onOptionChange={handleOptionChange}
                        />
                        {/* 插圖 */}
                        {product.name === "生日蛋糕" && (
                            <CustomizationOption
                                type="image"
                                product={product} // 哪種商品
                                label="picture"
                                title="插圖"
                                tip={5}
                                onOptionChange={handleOptionChange}
                            />
                        )}
                        {/* 選擇插圖醬料 */}
                        {product.name === "生日蛋糕" && (
                            <CustomizationOption
                                type="text"
                                product={product} // 哪種商品
                                label="picture-jam"
                                title="選擇插圖醬料"
                                onOptionChange={handleOptionChange}
                            />
                        )}
                        {/* 數量 */}
                        <div className="mb-4 sm:mb-6 flex items-center justify-between">
                            <h4 className="text-md sm:text-lg text-left">數量</h4>
                            <QuantitySelector qty={(val) => handleQuantityChange(val)} />
                        </div>
                    </div>
                    <h4 className="text-left text-lg md:text-xl">配件選擇</h4>
                    {/* 配件選擇 */}
                    <div className="border-[3px] border-primary rounded-xl p-6 sm:p-8">
                        {/* 蠟燭 */}
                        <CustomizationOption
                            type="button"
                            product={product} // 哪種商品
                            label="candle"
                            title="蠟燭"
                            tip="最多選3個"
                            onOptionChange={handleOptionChange}
                        />
                        {/* 餐具數量 */}
                        <div className="mb-4 sm:mb-6 flex items-center justify-between">
                            <h4 className="text-md md:text-lg whitespace-nowrap">餐具數量</h4>
                            <QuantitySelector />
                        </div>
                        {/* 裝飾 */}
                        <CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="decoration"
                            title="裝飾"
                            tip={5}
                            onOptionChange={handleOptionChange}
                        />
                    </div>
                    <div className="flex justify-start text-md sm:text-lg p-2">
                        加價小計：${totalTip} * {quantities}
                    </div>
                    <div className="flex items-center justify-between p-2 mb-12 sm:mb-16">
                        <div className="text-xl sm:text-2xl">Total: ${totalPrice}</div>
                        <AddToCart product={product} quantities={quantities} totalPrice={totalPrice} customSelections={customSelections} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CustomizeProduct;

