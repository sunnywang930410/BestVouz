import ProductItem from "./Productitem";

const Productlist = ({ product }) => {

    return (
        <div>
            <h2 className="my-6">~Hot Sale~</h2>
            <div className="space-y-10">
                {
                    product.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))
                }
            </div>

        </div>
    )
}

export default Productlist;
