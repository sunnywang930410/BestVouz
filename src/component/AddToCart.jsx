import { ShoppingCart } from 'lucide-react';
import { addCartItems } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { useState, useContext } from 'react';
import { CircleCheckBig } from 'lucide-react';
import { ModalContext } from "../component/ModalContext";
function AddToCart({ product, quantities, totalPrice, customSelections, price }) {
    const dispatch = useDispatch();
    const [showToast, setShowToast] = useState(false);
    const addToCart = () => {
        setShowToast(true);
        dispatch(addCartItems(
            {
                id: product.id,
                name: product.name,
                cover: product.cover,
                totalPrice,
                quantities,
                customSelections,
                price
            }
        ))
    };
    const { toggleModal } = useContext(ModalContext);
    return (
        <>
            <button
                className="group flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
                 bg-[var(--color-secondary)] border-2 border-transparent 
                 transition-colors duration-200 
                 hover:bg-[#FFFEE9] hover:border-[#6B7280] 
                 active:bg-[#434751]"
                onClick={addToCart}>
                <ShoppingCart
                    strokeWidth={2}
                    className="w-5 h-auto text-white group-hover:text-black"
                />
                <span className="text-lg text-white group-hover:text-black">
                    加入購物車
                </span>
            </button>
            {showToast && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center bg-[rgba(0,0,0,0.5)]">
                    <div className="body-bg px-6 py-5 rounded-xl shadow-xl border border-gray-200 w-[90%] max-w-md text-center space-y-4">
                        <CircleCheckBig className="text-[#22C55E] w-16 h-16 mx-auto" />
                        <h2 className="text-xl body-text">商品已加入購物車!!</h2>
                        <div className="flex justify-center gap-4">
                            <button
                                className="px-4 py-2 rounded-lg border border-primary hover:bg-neutral hover:text-white transition"
                                onClick={() => setShowToast(false)}
                            >
                                繼續購買
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-[#E8D69A] body-text hover:bg-[#C8B885] hover:text-white transition flex items-center justify-center"
                                onClick={() => {setShowToast(false);toggleModal();}}
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