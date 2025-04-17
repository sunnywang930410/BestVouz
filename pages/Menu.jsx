import { useEffect } from "react";
import Productlist from "../src/component/Productlist";
import product from "../src/json/customize.json";
const Menu = () => {

    // 添加 useEffect 來處理頁面載入時滾動到頂部
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []); // 空依賴數組表示只在組件掛載時執行

    return (
        <div className="mb-10">
            <Productlist product={product} />
        </div>
    )
}

export default Menu;