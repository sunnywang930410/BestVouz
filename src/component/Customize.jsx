
function Customize({ product }) {
    return (
        <div>
            {/* 客製化選單標題 */}
            <div>
                <h2>
                    客製化選單
                </h2>
            </div>
            {/* 左側：蛋糕圖片、名稱、原價  */}
            <div>
                <div>
                    <h3>{product.name}</h3>
                    <h1>{product.price}</h1>
                </div>
                <img
                    alt={product.name}
                    className=""
                    src={product.cover}
                />
            </div>
            {/* 右側：客製化選項 */}
            <div>
                <h3>蛋糕內容</h3>
                {/* 蛋糕內容 */}
                <div>
                    <div>
                        <h3>尺寸</h3>
                        <select defaultValue="6吋" className="select">
                            <option disabled={true}>{product.size[0]}</option>
                            <option>{product.size[1]}</option>
                            <option>{product.size[2]}</option>
                            <option>{product.size[3]}</option>
                        </select>
                    </div>
                    <div>
                        <div>
                            <h3>外層水果</h3>
                            <p>+20$</p>
                        </div>
                        <div>
                            {product.fruit.map((fruitName, index) => (
                                <div key={index} className="text-center">
                                    <img
                                        src={product["fruit-img"][index]}
                                        alt={product["fruit"][index]} 
                                        className="w-24 h-24 object-cover mx-auto"
                                    />
                                    <p className="mt-2 text-sm">{product["fruit"][index]}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <div>
                            <h3>鮮奶油</h3>
                        </div>
                        
                    </div>
                </div>
                {/* 配件選擇 */}
                <div>

                </div>
            </div>
        </div>
    );
}