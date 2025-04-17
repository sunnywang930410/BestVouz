import { useState, useEffect } from "react";


const CustomizationOption = ({ type, product, label, title, tip, onOptionChange }) => {
  const data = product[label] || [];
  if (!data) return null;

  // case image 狀態變數：儲存已按過的內容
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    if (data && data.length > 0 && onOptionChange) {
      //console.log("🔥 onOptionChange triggered:", label, selectedItems);
      onOptionChange(label, selectedItems, selectedItems.length * tip);
    }
  }, [selectedItems]);
  const toggleSelection = (name) => {
    setSelectedItems((prevSelected) =>
      prevSelected.includes(name)
        ? prevSelected.filter((item) => item !== name)
        : [...prevSelected, name]
    );
  };

  const LabelTip = () => (
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-base text-lg">{title}</h4>
      {tip && <span className="text-sm text-gray-500">+{tip}$</span>}
    </div>
  );

  switch (type) {
    case "selector":
      return (
        <div className="mb-10">
          <LabelTip />
          <select defaultValue="Pick a size" className="select w-full">
            <option disabled>選擇尺寸</option>
            {product.size.map((size, i) => (
              <option key={i}>{size}</option>
            ))}
          </select>
        </div>
      );

    case "image":
      const images = product[`${label}-img`] || [];
      return (
        <div className="mb-10">
          <LabelTip />
          <div className="grid grid-cols-4 gap-4 mt-2">
            {data.map((name, index) => {
              const isSelected = selectedItems.includes(name);
              return (
                <button
                  key={index}
                  onClick={() => toggleSelection(name)}
                  className={`flex flex-col items-center text-center p-2 rounded-md border transition 
                    ${isSelected ? "border-orange-500 bg-orange-100" : "border-gray-200"} 
                    hover:border-orange-300 hover:bg-orange-50`}
                >
                  <img
                    src={images[index]}
                    alt={name}
                    className="w-24 h-24 object-cover rounded-md shadow"
                  />

                  <h6 className="mt-1 text-sm">{name}</h6>
                </button>
              );
            })}
          </div>
        </div>
      );

    case "checkbox":
      return (
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {/* 左側標題與 checkbox 區塊 */}
            <div className="flex items-center gap-18.5">
              <h4 className="text-base text-lg">{title}</h4>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={data[0]}
                  className="checkbox"
                  onChange={(e) => {
                    const isChecked = e.target.checked;
                    const value = e.target.value;
                    // 這裡可搭配 onOptionChange 傳給父層
                    if (onOptionChange) {
                      onOptionChange(label, "鮮奶油", isChecked ? tip : 0);
                    }
                  }}
                />
                <span className="text-sm">{data[0]}</span>
              </label>
            </div>
            {/* 右側加價提示 */}
            {tip && <span className="text-sm text-gray-500">+{tip}$</span>}
          </div>
        </div>
      );

    case "Input":
      return (
        <div className="mb-10">
          <LabelTip />
          <input
            type="text"
            maxLength={30}
            placeholder="為壽星寫下祝福吧！（最多30字）"
            className="input w-full"
          />
        </div>
      );

    case "text":
      return (
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {/* 左側標題與選項區塊 */}
            <div className="flex items-center gap-8">
              <h4 className="text-base">{title}</h4>
              <div className="flex gap-8">
                {data.map((option, index) => (
                  <label key={index} className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`${label}-radio`}  // 確保每個選項共用同一個 name 屬性
                      value={option}
                      className="checkbox"
                    />
                    <span className="text-sm">{option}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* 右側加價提示 */}
            {tip && <span className="text-sm text-gray-500">+{tip}$</span>}
          </div>
        </div>
      );

    case "button":
      const options = [...Array(10).keys()].map(String).concat("?");
      // 最多只能選 3 個（總共上下排加起來）
      const maxSelection = 3;
      const [selectedButtons, setSelectedButtons] = useState([]); // e.g. ["0-1", "1-2"]
      const isSelected = (key) => selectedButtons.includes(key);
      const toggleButton = (key) => {
        setSelectedButtons((prev) => {
          if (prev.includes(key)) {
            return prev.filter((item) => item !== key);
          } else if (prev.length < maxSelection) {
            return [...prev, key];
          } else {
            // 選滿了，這邊可加 toast 或 alert
            return prev;
          }
        });
      };

      const renderButtonRow = (rowIndex) => (
        <div className="grid grid-cols-11 gap-4 mb-2">
          {options.map((val) => {
            const key = `${rowIndex}-${val}`;
            return (
              <button
                key={key}
                onClick={() => toggleButton(key)}
                className={`btn btn-sm w-full border transition
              ${isSelected(key)
                    ? "border-pink-300 bg-pink-200"
                    : "btn-outline border-gray-300"}
              hover:border-pink-200 hover:bg-orange-50`}
              >
                {val}
              </button>
            );
          })}
        </div>
      );

      return (
        <div className="mb-10">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg">{title}</h4>
            <p className="text-sm text-gray-500">最多選擇 3 項</p>
          </div>
          {renderButtonRow(0)}
          {renderButtonRow(1)}
        </div>
      );
      
    default:
      return null;
  }
};

export default CustomizationOption;
