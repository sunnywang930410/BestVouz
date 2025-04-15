import { Link } from "react-router";


const ProductItem = ({ product }) => {
    return (


        <div>
            <div className="card card-side bg-base-100 shadow-sm">
                <figure>
                    <img
                        className="w-70 h-auto"
                        src={product.cover}
                        alt={product.name} />
                </figure>
                <div className="card-body">
                    <p className="card-title">{product.name}</p>
                    <p className="text-base">{product.description}</p>
                    <p className="text-x1">{product.price}</p>
                    <div className="card-actions justify-end">

                        <Link to={`/product/id/${product.id}`}>
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