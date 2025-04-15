import { ShoppingCart } from 'lucide-react';

function AddToCart() {
    return (
        <button
            style={{ backgroundColor: 'var(--color-secondary)' }}
            className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg">
            <ShoppingCart strokeWidth={2} className='w-5 h-auto text-white' />
            <span className='text-lg text-white'>加入購物車</span>
        </button>
    );
}

export default AddToCart;