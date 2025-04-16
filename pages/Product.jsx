import CustomizeProduct from "../src/component/CustomizeProduct"
import Header from "../src/component/Header"
import products from "../src/json/customize.json"
import { useParams } from "react-router-dom";

function Product() {
    const { id } = useParams();
    const product = products.find(p => String(p.id) === id);
    
    if (!product) {
        return <div>商品不存在，請返回選擇其他商品。</div>;
    }

    // 測試商品內容列
    // const product = {
    //     name: "戚風蛋糕",
    //     price: 800,
    //     candle: ["Red", "Blue", "Green"],
    //     decoration: ["Star", "Flower"],
    //     cover: "/img/Chiffon.png", // 確保圖片有放
    //     size: ["6吋", "8吋", "10吋", "12吋"],
    //     fruit: ["草莓", "芒果"],
    //     "fruit-img": ["/images/strawberry.jpg", "/images/mango.jpg"],
    //     style: ["可愛", "優雅"],
    //     "style-img": ["/images/cute.jpg", "/images/elegant.jpg"],
    //     inside: ["草莓", "巧克力"],
    //     "inside-img": ["/images/inside1.jpg", "/images/inside2.jpg"],
    //     cream: ["要"],
    //     picture: ["愛心", "星星"],
    //     "picture-img": ["/images/pic1.jpg", "/images/pic2.jpg"],
    //     "picture-jam": ["藍莓醬", "檸檬醬", "焦糖醬"],
    //     "text-jam": ["草莓醬", "巧克力醬", "抹茶醬"]
    //   };

    return (
        <div className=" main-layout min-h-screen">
            <CustomizeProduct product={product} />
        </div>
    );
}

export default Product;
