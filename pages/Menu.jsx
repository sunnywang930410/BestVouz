import { useEffect, useState } from "react";
import Productlist from "../src/component/Productlist";
import product from "../src/json/customize.json";
import PopularItems from "../src/component/PopularItems";
import { Link } from "react-router";

const Menu = () => {

    const [priceSort, setPriceSort] = useState("none");



    const [filter, setFilter] = useState({ type: "all", value: "全部商品" });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const handleCategoryClick = (value) => {
        setFilter({ type: "category", value });
    };

    const handleTagsClick = (value) => {
        setFilter({ type: "tags", value });
    };

    const handleAllClick = () => {
        setFilter({ type: "all", value: "全部商品" });
    };

    // 先做分類/標籤過濾
    let filteredProducts = product.filter((item) => {
        if (filter.type === "category") {
            return item.category === filter.value;
        } else if (filter.type === "tags") {
            return item.tags?.includes(filter.value);
        }
        return true;
    });

    // 然後再做價格排序
    filteredProducts = filteredProducts.slice().sort((a, b) => {
        const priceA = parseInt(a.price);
        const priceB = parseInt(b.price);

        if (priceSort === "lowToHigh") {
            return priceA - priceB;
        } else if (priceSort === "highToLow") {
            return priceB - priceA;
        } else {
            return 0;
        }
    });

    const getClass = (type, value) => {
        return `my-1 custom-button-hover ${filter.type === type && filter.value === value ? "custom-button" : ""
            }`;
    };


    return (
        <div className="flex flex-row mt-12 justify-center w-full mt-50 ml-2 mr-2">
            {/* 側邊欄 */}
            <div>
                <div className="breadcrumbs text-xs sm:text-sm mb-2 ml-2">
                    <ul>
                        <li><a href="/">首頁</a></li>
                        <li><Link to={"/menu"}>蛋糕種類</Link></li>
                        <li><a
                            onClick={() => {
                                // 重新觸發篩選，即使點的是相同分類
                                if (filter.type === "category") {
                                    handleCategoryClick(filter.value);
                                } else if (filter.type === "tags") {
                                    handleTagsClick(filter.value);
                                }
                            }}
                        >
                            {filter.value}
                        </a></li>
                    </ul>
                </div>
                <ul className="menu w-50 md:w-60 lg:w-70 text-xs sm:text-sm md:text-base lg:text-lg">

                    <li>
                        <a onClick={handleAllClick} className={getClass("all", "全部商品")}>
                            全部商品
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => handleTagsClick("人氣商品")}
                            className={getClass("tags", "人氣商品")}
                        >
                            人氣商品
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => handleCategoryClick("客製化蛋糕")}
                            className={getClass("category", "客製化蛋糕")}
                        >
                            客製化蛋糕
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => handleTagsClick("冰淇淋蛋糕")}
                            className={getClass("tags", "冰淇淋蛋糕")}
                        >
                            冰淇淋蛋糕
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => handleTagsClick("杯子蛋糕")}
                            className={getClass("tags", "杯子蛋糕")}
                        >
                            杯子蛋糕
                        </a>
                    </li>
                    <li>
                        <a
                            onClick={() => handleTagsClick("生乳捲")}
                            className={getClass("tags", "生乳捲")}
                        >
                            生乳捲
                        </a>
                    </li>
                </ul>

            </div>

            {/* 主內容 */}
            <div className="mb-10 ml-6 mr-6 w-full max-w-[900px] justify-center items-center">
                {filter.type === "tags" && filter.value === "人氣商品" ? (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold text-start">人氣商品</h2>
                            <select
                                className="select select-bordered  w-[150px] md:w-[180px] lg:max-w-xs"
                                value={priceSort}
                                onChange={(e) => setPriceSort(e.target.value)}
                            >
                                <option value="none">價格排序</option>
                                <option value="lowToHigh">價格：由低到高</option>
                                <option value="highToLow">價格：由高到低</option>
                            </select>
                        </div>

                        <hr className="mb-4" />
                        <PopularItems isInMenu={true} priceSort={priceSort} />
                    </>
                ) : (
                    <>
                        <div className="flex flex-col sm:flex-row justify-between items-center mb-2">
                            <h2 className="text-2xl font-bold text-start">
                                {filter.type === "all" ? "全部商品" : filter.value}
                            </h2>
                            <select
                                className="select select-bordered  w-[150px] md:w-[180px] lg:max-w-xs"
                                value={priceSort}
                                onChange={(e) => setPriceSort(e.target.value)}
                            >
                                <option value="none">價格排序</option>
                                <option value="lowToHigh">價格：由低到高</option>
                                <option value="highToLow">價格：由高到低</option>
                            </select>
                        </div>
                        <hr className="mb-4" />
                        <Productlist product={filteredProducts} />
                    </>
                )}

            </div>
        </div>
    );
};

export default Menu;
