import { Link, useNavigate } from "react-router";

const ProductItem = ({ product }) => {
    const navigate = useNavigate();

    const handleNavigateTocake = () => {
        navigate("/menu");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    
    return (
        <div className="card card-side flex-col sm:flex-row !rounded-lg border-2 border-primary bg-base-100 items-center space-y-2 sm:space-y-4 sm:space-x-10 p-2 sm:p-4">
            {/* 圖片區塊 */}
            <div className="w-[200px] sm:w-1/4 aspect-square">
                <figure className="w-full h-full">
                    <img
                        className="w-full h-full object-cover rounded-lg"
                        src={product.cover}
                        alt={product.name}
                    />
                </figure>
            </div>

            {/* 內容區塊 */}
            <div className="flex flex-col card-body w-full sm:w-3/4 py-1 sm:py-5 px-1 sm:px-5">
                <div className="text-left space-y-2 sm:space-y-4">
                    <h4 className="card-title text-lg sm:text-xl md:text-2xl text-left">{product.name}</h4>
                    <span className="text-xs sm:text-sm md:text-base block text-left">{product.description}</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2 sm:gap-4 pt-2 sm:pt-8">
                    <span className="text-base sm:text-lg md:text-xl text-center sm:text-left">${product.price}</span>
                    <Link to={`/product/${product.id}`}>
                        <button className="btn btn-secondary w-full sm:w-auto active:bg-secondary-content text-info font-normal py-1 sm:py-2 px-4 sm:px-6 md:px-10 text-sm sm:text-base"
                        onClick={handleNavigateTocake}>
                            購買蛋糕
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductItem;