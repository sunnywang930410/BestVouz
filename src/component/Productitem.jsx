const ProductItem = ({ product }) => {
    return (
        <div>
            <div>
                {product.cover}
            </div>
            <div>
                <p className="text-2x1">{product.name}</p>
                <p className="text-base">{product.description}</p>
                <p className="text-x1">{product.price}</p>
                製作蛋糕
            </div>
        </div>
    )
}

export default ProductItem;