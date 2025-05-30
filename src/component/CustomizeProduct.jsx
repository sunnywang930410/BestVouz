import CustomizationOption from "./CustomizationOption";
import { useState, useEffect } from "react";
import QuantitySelector from "./QuantitySelector";
import AddToCart from "./AddToCart";
import { Info } from 'lucide-react';

function CustomizeProduct({ product, options }) {
    const [customSelections, setCustomSelections] = useState({}); // 儲存每個選項的使用者選擇
    const [tipPrices, setTipPrices] = useState({}); // 儲存每個選項的加價（tip）
    const [sizePriceDiff, setSizePriceDiff] = useState(0);
    const [text, setText] = useState(""); // 用來儲存文字留言的狀態
    useEffect(() => {
        setCustomSelections({
            size: "6吋",
        });
    }, [])
    // tip計算與紀錄使用者的選項
    const handleOptionChange = (label, value, tip = 0, price = 0) => {
        // console.log("handleOptionChange called:", label, value, tip);
        tip = (!isNaN(tip)) ? tip : 0;
        setCustomSelections((prev) => {
            const newSelections = {
                ...prev,
                [label]: value,
            };
            return newSelections;
        });

        if (label === "size") {
            // 尺寸：只存加價差額，不進 tip
            setSizePriceDiff(price);
        } else {
            // 其餘選項維持原本 tip 邏輯
            setTipPrices((prev) => ({ ...prev, [label]: tip }));
        }
    };
    const [quantities, setQuantity] = useState(1);
    const handleQuantityChange = (val) => {
        setQuantity(val);
    };
    // 計算總加價
    const totalTip = Object.values(tipPrices).reduce((sum, val) => sum + val, 0);
    const sizePrice = (Number(product.price) + sizePriceDiff);
    const totalPrice = (Number(product.price) + sizePriceDiff + totalTip) * quantities;

    // 文字留言
    const handleTextChange = (e) => {
        if (e.target.value.length <= 30) { // 檢查輸入的字數
            setText(e.target.value); // 更新文字狀態
        }
    };

    return (
        <div className="mt-36">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* 左側：蛋糕圖片 */}
                <div className="flex flex-col items-center gap-0 px-6 sm:px-10 md:px-6">
                    <img
                        alt={product.name}
                        className="w-[300px] sm:w-[400px] h-auto rounded-xl shadow-md"
                        src={product.cover}
                    />
                </div>
                {/* 右側：客製化選項 */}
                <div className="flex flex-col gap-4 px-6 sm:px-10 md:px-6">
                    <span className="text-left text-3xl md:text-2xl sm:text-xl font-semibold">{product.name}</span>
                    <span className="text-left text-lg md:text-base sm:text-sm custom-text-gray-500 leading-loose">{product.description}</span>
                    <div className="collapse collapse-arrow bg-base-100 border border-base-300">
                        <input type="checkbox" />
                        <div className="collapse-title font-semibold flex gap-4 text-left text-lg md:text-base sm:text-sm custom-text-gray-500 body-bg">
                            <Info />
                            <span>保存期限與方法</span>
                        </div>
                        <div className="collapse-content flex flex-col text-sm text-left text-lg md:text-base sm:text-sm custom-text-gray-500 body-bg">
                            <span>保存期限：{product.shelfLife}</span>
                            <span>保存方法：{product.storageMethod}</span>
                        </div>
                    </div>
                    <span className="text-left text-3xl md:text-2xl sm:text-xl">${sizePrice}</span>
                    {/* 尺寸 */}
                    <CustomizationOption
                        type="button"
                        product={product} // 哪種商品
                        options={options}
                        label="size"
                        title="尺寸"
                        onOptionChange={handleOptionChange}
                        customSelections={customSelections}
                    />
                    {/* 數量 */}
                    <div className="mb-4 sm:mb-6 flex items-center justify-between">
                        <QuantitySelector
                            value={quantities}
                            onChange={handleQuantityChange}
                        />
                    </div>
                    {/* 蛋糕內容 */}
                    {product.category === "客製化蛋糕" && (<div className="border-[3px] border-primary rounded-xl p-6 sm:p-8 mb-8 sm:mb-6 mt-8 sm:mt-6">
                        {/* 外層水果 */}
                        <CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            options={options}
                            label="fruit"
                            title="外層水果"
                            tip={20}
                            onOptionChange={handleOptionChange}
                        />
                        {/* 鮮奶油 */}
                        <CustomizationOption
                            type="checkbox"
                            product={product} // 哪種商品
                            options={options}
                            label="cream"
                            title="鮮奶油"
                            tip={10}
                            onOptionChange={handleOptionChange}
                        />
                        {/* 文字留言 */}
                        <div className="mb-4">
                            <div className="flex items-center gap-2 mb-2 text-left">
                                {/* 左側標題 */}
                                <h4 className="text-lg md:text-base sm:text-md custom-text-gray-800">文字留言</h4>
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
                            options={options}
                            label="text-jam"
                            title="選擇文字醬料"
                            onOptionChange={handleOptionChange}
                        />
                    </div>
                    )}
                    {/* 配件選擇 */}
                    <div className="border-[3px] border-primary rounded-xl p-6 sm:p-8">
                        {/* 蠟燭 */}
                        <CustomizationOption
                            type="selector"
                            product={product} // 哪種商品
                            options={options}
                            label="candle"
                            title="蠟燭歲數"
                            onOptionChange={handleOptionChange}
                        />
                        {/* 裝飾 */}
                        <CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            options={options}
                            label="decoration"
                            title="裝飾"
                            tip={5}
                            onOptionChange={handleOptionChange}
                        />
                    </div>
                    <div className="flex flex-col justify-start text-lg sm:text-base p-2 custom-text-gray-800">
                        <span className="text-left mb-2">加價小計：${totalTip} </span>
                        <span className="text-left">數量： {quantities}</span>
                    </div>
                    <div className="flex items-center justify-between p-2 mb-12 sm:mb-16">
                        <div className="text-2xl md:text-2xl sm:text-xl custom-text-red-600 font-semibold">Total: ${totalPrice}</div>
                        <AddToCart product={product} options={options} quantities={quantities} totalPrice={totalPrice} customSelections={customSelections} price={totalPrice / quantities} />
                    </div>
                </div>
            </div>
        </div>

    );
}

export default CustomizeProduct;

