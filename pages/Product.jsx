import CustomizeProduct from "../src/component/CustomizeProduct"
import Header from "../src/component/Header"
import products from "../src/json/customize.json"

function Product() {
    // const { productId } = useParams();
    // const product = products.find(
    //     (x) => x.id === productId
    // );
    const testProduct = {
        name: "水果蛋糕",
        price: 800,
        candle: ["Red", "Blue", "Green"],
        decoration: ["Star", "Flower"],
        cover: "/images/cake-cover.jpg", // 確保圖片有放
        size: ["6吋", "8吋", "10吋", "12吋"],
        fruit: ["草莓", "芒果"],
        "fruit-img": ["/images/strawberry.jpg", "/images/mango.jpg"],
        style: ["可愛", "優雅"],
        "style-img": ["/images/cute.jpg", "/images/elegant.jpg"],
        inside: ["草莓", "巧克力"],
        "inside-img": ["/images/inside1.jpg", "/images/inside2.jpg"],
        cream: ["要"],
        picture: ["愛心", "星星"],
        "picture-img": ["/images/pic1.jpg", "/images/pic2.jpg"],
        "text-jam": ["草莓醬", "巧克力醬", "抹茶醬"]
      };

    return (
        <div className=" main-layout min-h-screen">
            <Header />
            <CustomizeProduct product={testProduct} />
        </div>
    );
}

export default Product;
