import Productlist from "../src/component/Productlist";
import product from "../src/json/customize.json";
const Menu = () => {
    return (
        <div>
            <Productlist product={product} />
        </div>
    )
}

export default Menu;