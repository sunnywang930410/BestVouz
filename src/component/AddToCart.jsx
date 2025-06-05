import { ShoppingCart } from 'lucide-react';
import { addCartItems } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useState, useContext } from 'react';
import { CircleCheckBig } from 'lucide-react';
import { ModalContext } from "../component/ModalContext";
import { text } from 'framer-motion/client';
function AddToCart({ product, quantities, totalPrice, customSelections, price, text, hasText }) {
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const addToCart = () => {
        // 設定預設值
        const defaultSelections = {
            fruit: "無",
            cream: "無",
            "text-jam": "無",
            candle: "無",
            decoration: "無",
            ...(product.size === "可調整尺吋" ? { size: customSelections.size || "6吋" } : {}),
            ...customSelections,
        };
        setShowToast(true);
        dispatch(addCartItems(
            {
                id: product.id,
                name: product.name,
                cover: product.cover,
                totalPrice,
                quantities,
                customSelections: defaultSelections,
                price,
                text,
                hasText
            }
        ))
    };
    const { toggleModal } = useContext(ModalContext);
    return (
        <>
            <button
                className="group flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
                 bg-secondary border-2 border-transparent 
                 transition-colors duration-200 
                 hover:bg-secondary-content
                 active:bg-secondary-content 
                 "
                onClick={addToCart}>
                <ShoppingCart
                    strokeWidth={2}
                    className="w-5 h-auto text-white"
                />
                <span className="text-base md:text-lg lg:text-xl text-white">
                    加入購物車
                </span>
            </button>
            {showToast && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[rgba(0,0,0,0.5)] px-4">
                    <div className="body-bg px-6 py-5 rounded-xl shadow-xl border border-gray-200 w-full max-w-md text-center space-y-4">
                        <CircleCheckBig className="text-[#22C55E] w-14 h-14 sm:w-16 sm:h-16 mx-auto" />
                        <h2 className="text-lg sm:text-xl custom-text-gray-800">商品已加入購物車!!</h2>
                        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
                            <button
                                className="px-4 py-2 rounded-lg border border-primary hover:bg-neutral transition"
                                onClick={() => setShowToast(false)}
                            >
                                繼續購買
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg custom-button body-text hover:bg-[#C8B885] hover:text-white transition flex items-center justify-center"
                                onClick={() => {
                                    setShowToast(false);
                                    toggleModal();
                                }}
                            >
                                查看購物車
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}

export default AddToCart;