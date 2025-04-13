import CustomizationOption from "./CustomizationOption";

function CustomizeProduct({ product }) {
    return (
        <div>
            {/* 客製化選單標題 */}
            <div className="p-8">
                <h2>
                    客製化選單
                </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 左側：蛋糕圖片、名稱、原價  */}
                <div className="flex flex-col items-center gap-4">
                    <div className="flex justify-between w-[400px] px-4 text-lg font-semibold">
                        <span>{product.name}</span>
                        <span>${product.price}</span>
                    </div>
                    <img
                        alt={product.name}
                        className="w-[400px] h-auto rounded-xl shadow-md"
                        src={product.cover}
                    />
                </div>
                {/* 右側：客製化選項 */}
                <div className="flex flex-col gap-6">
                    <h4>蛋糕內容</h4>
                    {/* 蛋糕內容 */}
                    <div className="card bg-base-100 shadow-md p-4 border border-base-200">
                        {/* 尺寸 */}
                        <CustomizationOption
                            type="selector"
                            product={product} // 哪種商品
                            label="size"
                            title="尺寸"
                        />
                        {/* 外層水果 */}
                        <CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="fruit"
                            title="外層水果"
                            tip={20}
                        />
                        {/* 造型 */}
                        {product.style && (<CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="style"
                            title="造型"
                        />)}
                        {/* 內餡 */}
                        {product.inside && (<CustomizationOption
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
                        <CustomizationOption
                            type="Input"
                            product={product} // 哪種商品
                            label="Input-text"
                            title="文字留言"
                            tip={5}
                        />
                        {/* 選擇文字醬料 */}
                        <CustomizationOption
                            type="text"
                            product={product} // 哪種商品
                            label="text-jam"
                            title="選擇文字醬料"
                        />
                        {/* 插圖 */}
                        {product.picture && (<CustomizationOption
                            type="image"
                            product={product} // 哪種商品
                            label="picture"
                            title="插圖"
                            tip={5}
                        />)}
                        {/* 數量 */}
                        <CustomizationOption
                            type="counter"
                            product={product} // 哪種商品
                            label="qty"
                            title="數量"
                        />
                    </div>
                    {/* 配件選擇 */}
                    <div className="card bg-base-100 shadow-md p-4 border border-base-200">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomizeProduct;

