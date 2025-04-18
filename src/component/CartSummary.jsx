import { ShoppingCart } from 'lucide-react';
import { useContext } from "react";
import { selectCartItems } from '../redux/cartSlice';
import { useSelector } from 'react-redux';
import CartContent from './CartContent';
import { ModalContext } from "../component/ModalContext";

function CartSummary() {
    const { toggleModal, drawerCheckboxRef, isChecked, setIsChecked } = useContext(ModalContext);  // 使用 context 中的值
  const cartItems = useSelector(selectCartItems) || [];
  const count = cartItems.reduce((sum, item) => sum + item.quantities, 0);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checked state
  };
  return (
    <>
      <div className="drawer-end">
      <input
          id="cartModal"
          type="checkbox"
          className="drawer-toggle"
          ref={drawerCheckboxRef}
          checked={isChecked}  // Controlled checkbox state
          onChange={handleCheckboxChange}  // Handle change to update state
          hidden
        />
        <nav onClick={toggleModal} className="w-8 h-8 items-center cursor-pointer">
          <div className="indicator">
            {count > 0 && (
              <span className="indicator-item badge badge-primary text-white">
                {count}
              </span>
            )}
            <div className="w-8 h-8">
              <ShoppingCart
                strokeWidth={2.5}
                className="w-8 h-8 md:flex text-current group-hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </nav>
        <div className="drawer-side  z-9999">
          <label
            htmlFor="cartModal"
            aria-label="close sidebar"
            className="drawer-overlay"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          ></label>
          <div className="menu bg-[#FFFEE9] text-base-content min-h-full body-bg w-80 p-4">
            <CartContent />
          </div>
        </div>
      </div>
    </>
  );
}

export default CartSummary;
