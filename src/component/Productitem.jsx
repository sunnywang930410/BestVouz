import { Link } from "react-router";


const ProductItem = ({ product }) => {
    return (
            <div className="card card-side !rounded-lg border-2 bg-base-100 items-center space-x-10 ">
                <div className="w-1/4">
                <figure>
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={product.cover}
                        alt={product.name} />
                </figure>
                </div>
                <div className="flex flex-col card-body w-3/4 py-5 px-5">
                        <h3 className="flex-1 card-title ">{product.name}</h3>
                    <span className="flex-1 text-base">{product.description}</span>
                    
                    <div className="flex flex-1 card-actions justify-between">
                    <span className="text-xl">{product.price}</span>
                        <Link to={`/product/${product.id}`}>
                            <button className="btn btn-primary">
                                購買蛋糕
                            </button>
                        </Link>

                    </div>
                </div>
            </div>
    )
}

export default ProductItem;