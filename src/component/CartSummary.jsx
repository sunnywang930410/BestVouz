import { ShoppingCart } from 'lucide-react';
import { useState } from "react";
import { selectCartItems } from '../redux/cartSlice';
import { useSelector } from 'react-redux';

function CartSummary() {
    const [isOpen, setIsOpen] = useState(false);
    const cartItems = useSelector(selectCartItems) || [];
    const count = cartItems.reduce((sum, item) => sum + item.quantities, 0);
    const toggleModal = () => setIsOpen(!isOpen);

    return (
        <nav
            onClick={toggleModal}
            className="w-8 h-8 items-center cursor-pointer"
        >
            <div className="indicator">
                {count > 0 && <span className="indicator-item badge badge-primary text-white">{count}</span>}
                <div className="w-8 h-8">
                    <ShoppingCart strokeWidth={2.5} className="w-8 h-8 md:flex text-current group-hover:scale-105 transition-transform" />
                </div>
            </div>
        </nav>
    );
}

export default CartSummary;