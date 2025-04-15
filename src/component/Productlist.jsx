import ProductItem from "./Productitem";

const Productlist = ({ product }) => {

    return (
        <div>
            <p>~Hot Sale~</p>
            {
                product.map((product) => (
                    <ProductItem key={product.id} product={product} />
                ))
            }
        </div>
    )
}

export default Productlist;
