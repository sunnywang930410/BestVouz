import { ShoppingCart } from 'lucide-react';

function AddToCart() {
    return (
        <button
            className="group flex items-center justify-center gap-2 px-3 py-2 rounded-lg 
                 bg-[var(--color-secondary)] border-2 border-transparent 
                 transition-colors duration-200 
                 hover:bg-[#FFFEE9] hover:border-[#6B7280] 
                 active:bg-[#434751]"
        >
            <ShoppingCart
                strokeWidth={2}
                className="w-5 h-auto text-white group-hover:text-black"
            />
            <span className="text-lg text-white group-hover:text-black">
                加入購物車
            </span>
        </button>
    );
}

export default AddToCart;