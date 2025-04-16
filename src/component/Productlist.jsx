import ProductItem from "./Productitem";

const Productlist = ({ product }) => {

    return (
        <div>
            <div className="my-10 text-2xl">~熱銷商品~</div>
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
