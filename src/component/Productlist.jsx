import ProductItem from "./Productitem";

const Productlist = ({ menu }) => {

    return (
        <div>
            {
                menu.map((menu) => (
                    <ProductItem menu={menu} />
                ))
            }
        </div>
    )
}

export default Productlist;
