import { useState,useEffect } from "react";

const QuantitySelector = ({qty}) => {
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1)); // 不低於 1
  useEffect(() => {
    if (qty) {
      qty(quantity);
    }
  }, [quantity]);
  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-outline btn-sm text-lg" onClick={decrease}>-</button>
      <input
        type="number"
        className="input input-bordered text-center w-12 sm:w-16 md:w-30"
        value={quantity}
        readOnly
      />
      <button className="btn btn-outline btn-sm text-lg" onClick={increase}>+</button>
    </div>
  );
};

export default QuantitySelector;
