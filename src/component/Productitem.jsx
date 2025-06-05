import { Search, ShoppingCart } from "lucide-react";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";

const ProductItem = ({ product }) => {
    const [selectedItem, setSelectedItem] = useState(null);
    const navigate = useNavigate();
    const dialogRef = useRef(null);
    // const navigate = useNavigate();

    const handleNavigateTocake = () => {
        navigate("/menu");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    const handleOpenModal = (product) => {
        setSelectedItem(product);
        if (dialogRef.current) dialogRef.current.showModal();
    };


    return (
        <div className="w-[270px] body-bg flex-col justify-center items-center">
            {/* 圖片區塊 */}
            <div key={product.id} className="justify-center items-center rounded-xl overflow-hidden relative group">
                <img
                    className="w-full h-full  justify-center items-center"
                    src={product.cover}
                    alt={product.name}
                />
                <div className="absolute inset-0 flex items-center justify-center gap-4 
                bg-black/40 opacity-0 translate-y-full 
                group-hover:translate-y-0 group-hover:opacity-100 
                transition-all duration-500 ease-in-out">
                    <button
                        onClick={() => {
                            handleNavigateTocake();
                            navigate(`/product/${product.id}`);
                        }}
                        className="p-2 cursor-pointer border-2 border-secondary bg-gray-300 rounded-lg shadow-lg hover:bg-gray-200 transition"
                    >
                        <ShoppingCart className="w-8 h-auto text-secondary" />

                    </button>

                    <button
                        onClick={() => handleOpenModal(product)}
                        className="p-2 cursor-pointer border-2 border-gray-300 bg-gray-300 rounded-lg shadow-lg hover:bg-gray-200 transition"
                    >
                        <Search className="w-8 h-auto text-secondary" />
                    </button>
                </div>
            </div>

            {/* 內容區塊 */}
            <div className="flex flex-col justify-center items-center">
                <h4 className="text-lg font-bold">{product.name}</h4>
                <h5 className="">${product.price}</h5>
            </div>



            {/* Modal 彈窗 */}
            <dialog ref={dialogRef} className="modal">
                <div className="modal-box max-w-3xl body-bg">
                    {selectedItem && (
                        <div className="flex flex-row items-start">
                            <div className="w-1/3">
                                <img src={selectedItem.cover} alt={selectedItem.name} className="w-full h-auto rounded-xl" />
                            </div>
                            <div className="w-2/3 flex flex-col text-left ml-2">
                                <h4 className="text-lg font-bold mb-2">{selectedItem.name}</h4>
                                <h5 className="mb-4">{selectedItem.description}</h5>
                                <h4 className="mb-4">${selectedItem.price}</h4>
                                <button
                                    onClick={() => {
                                        const dialog = document.getElementById("item_modal");
                                        if (dialog) dialog.close();
                                        navigate(`/product/${selectedItem.id}`);
                                    }}
                                    className="mt-auto  px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90 transition"
                                >
                                    前往購買
                                </button>
                            </div>

                        </div>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>關閉</button>
                </form>
            </dialog>
        </div>
    )
}

export default ProductItem;