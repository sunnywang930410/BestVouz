import { useEffect, useState } from "react";
import Productlist from "../src/component/Productlist";
import product from "../src/json/customize.json";
import PopularItems from "../src/component/PopularItems";

const Menu = () => {
    const [filter, setFilter] = useState({ type: "all", value: "全部" });

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, []);

    const handleCategoryClick = (value) => {
        setFilter({ type: "category", value });
    };

    const handleTagsClick = (value) => {
        setFilter({ type: "tag", value });
    };

    const handleAllClick = () => {
        setFilter({ type: "all", value: "全部" });
    };

    const filteredProducts = product.filter(item => {
        if (filter.type === "all") return true;
        if (filter.type === "category") return item.category === filter.value;
        if (filter.type === "tag") return item.tags && item.tags.includes(filter.value);
        return true;
    });

    return (
        <div className="flex flex-row mt-12 justify-center w-full mt-50">
            <div>
                <ul className="menu rounded-box w-56 bg-gray-100">
                    <li className="menu-title">分類</li>
                    <li><a onClick={() => handleAllClick()}>全部</a></li>
                    <li><a onClick={() => handleTagsClick("人氣商品")}>人氣商品</a></li>
                    <li><a onClick={() => handleCategoryClick("客製化蛋糕")}>客製化蛋糕</a></li>
                    <li><a onClick={() => handleCategoryClick("非客製化蛋糕")}>非客製化蛋糕</a></li>
                    <li><a onClick={() => handleTagsClick("冰淇淋蛋糕")}>冰淇淋蛋糕</a></li>
                    <li><a onClick={() => handleTagsClick("杯子蛋糕")}>杯子蛋糕</a></li>
                    <li><a onClick={() => handleTagsClick("生乳捲")}>生乳捲</a></li>
                </ul>
            </div>

            <div className="mb-10 ml-6">
                {filter.type === "tag" && filter.value === "人氣商品" ? (
                    <PopularItems isInMenu={true} />
                ) : (
                    <Productlist product={filteredProducts} />
                )}
            </div>
        </div>
    );
};

export default Menu;
