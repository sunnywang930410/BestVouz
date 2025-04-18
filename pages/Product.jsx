import CustomizeProduct from "../src/component/CustomizeProduct"
import products from "../src/json/customize.json"
import { useParams } from "react-router-dom";

function Product() {
    const { id } = useParams();
    const product = products.find(p => String(p.id) === id);
    
    if (!product) {
        return <div>商品不存在，請返回選擇其他商品。</div>;
    }

    return (
        <div className=" main-layout min-h-screen">
            <CustomizeProduct product={product} />
        </div>
    );
}

export default Product;
