function QuantitySelector({ value, onChange }) {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(Math.max(1, value - 1));
  return (
    <div className="flex items-center gap-2">
      <button className="btn btn-outline btn-sm text-lg" onClick={decrease}>-</button>
      <input
        type="number"
        className="input input-bordered text-center w-12 sm:w-16 md:w-30 text-gray-800"
        value={value}
        readOnly
      />
      <button className="btn btn-outline btn-sm text-lg" onClick={increase}>+</button>
    </div>
  );
};

export default QuantitySelector;
