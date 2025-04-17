import { ShoppingCart } from 'lucide-react';
import { useState } from "react";

function CartSummary() {
    const [isOpen, setIsOpen] = useState(false);
    const toggleModal = () => setIsOpen(isOpen);

    return (
        <nav
            onClick={toggleModal}
            className="w-8 h-8 items-center cursor-pointer"
        >
            <div className="indicator">
                <span className="indicator-item badge badge-primary text-white">5</span>
                <ShoppingCart strokeWidth={2.5} className="w-8 h-8 md:flex text-current group-hover:scale-105 transition-transform" />
            </div>
        </nav>
    );
}

export default CartSummary;