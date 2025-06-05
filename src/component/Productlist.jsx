import ProductItem from "./Productitem";

const Productlist = ({ product }) => {

    return (
        <div>
            <div className="grid md:grid-cols-3 px-4 justify-center items-center">
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
