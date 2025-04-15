import ProductItem from "./Productitem";

const Productlist = ({ product }) => {

    return (
        <div>
            {
                product.map((product) => (
                    <ProductItem product={product} />
                ))
            }
        </div>
    )
}

export default Productlist;
