import { Link } from "react-router";


const ProductItem = ({ product }) => {
    return (
        <div className="justify-center items-center">
            <div className="card card-side !rounded-lg border-2 bg-base-100 ">
                <figure className="w-90 h-auto">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={product.cover}
                        alt={product.name} />
                </figure>
                <div className="card-body">
                    <h3 className="card-title">{product.name}</h3>
                    <h5 className="text-base">{product.description}</h5>

                    <h4 className="text-x1">{product.price}</h4>


                    <div className="card-actions justify-end">

                        <Link to={`/product/${product.id}`}>
                            <button className="btn btn-primary">
                                購買蛋糕
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;