const ProductItem = ({ menu }) => {
    return (
        <div>
            <div>
                {menu.cover}
            </div>
            <div>
                <p className="text-2x1">{menu.name}</p>
                <p className="text-base">{menu.description}</p>
                <p className="text-x1">{menu.price}</p>
                製作蛋糕
            </div>
        </div>
    )
}

export default ProductItem;