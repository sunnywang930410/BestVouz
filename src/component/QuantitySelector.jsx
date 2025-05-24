function QuantitySelector({
  value,
  onChange,
  className = "",
  inputClassName = "",
  buttonClassName = "",
}) {
  const increase = () => onChange(value + 1);
  const decrease = () => onChange(Math.max(1, value - 1));

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <button className={`btn text-lg px-3 bg-[#F3E7BE] hover:bg-[#C8B885] ${buttonClassName}`} onClick={decrease}>-</button>
      <input
        type="number"
        className={`input input-bordered text-center text-sm text-gray-800 ${inputClassName}`}
        value={value}
        readOnly
      />
      <button className={`btn text-lg px-3 bg-[#F3E7BE] hover:bg-[#C8B885] ${buttonClassName}`} onClick={increase}>+</button>
    </div>
  );
}


export default QuantitySelector;
