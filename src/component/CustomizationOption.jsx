import { useState, useEffect } from "react";


const CustomizationOption = ({ type, product, options, label, title, tip, onOptionChange, customSelections }) => {
  // console.log("CustomizationOption label:", label);

  const data = product[label] || [];
  const names = options[label] || [];
  if (!data) return null;
  if (!names) return null;

  // case image 狀態變數：儲存已按過的內容
  const [selectedItems, setSelectedItems] = useState([]);
  useEffect(() => {
    if (names && names.length > 0 && onOptionChange) {
      onOptionChange(label, selectedItems, selectedItems.length * tip);
    }
  }, [selectedItems]);

  const toggleSelection = (name) => {
    setSelectedItems((prevSelected) =>
      prevSelected[0] === name ? [] : [name]
    );
  };

  // 蠟燭
  const [selectedcandles, setSelectedcandles] = useState("");
  const handlecandleChange = (e) => {
    const value = e.target.value;
    setSelectedcandles(value);
    if (onOptionChange) {
      onOptionChange(label, value, 0); 
    }
  };

  const LabelTip = () => (
    <div className="flex justify-between items-center mb-2">
      <h4 className="text-lg md:text-base sm:text-md custom-text-gray-800">{title}</h4>
      {tip && <span className="text-sm">+{tip}$</span>}
    </div>
  );

  switch (type) {
    case "button":
      return (
        <div className="flex items-center gap-4 mb-6 flex-wrap mt-2">
          <div className="mt-2">
            <LabelTip />
          </div>
          <div className="flex gap-3 flex-wrap custom-text-gray-800">
            {options.size.map((size, i) => (
              <button
                key={i}
                onClick={() => onOptionChange("size", size.label, 0, size.price)}
                className={`px-4 py-2 custom-text-gray-500 rounded-xl border border-gray-300 text-sm 
                    image-hover transition 
                  ${customSelections["size"] === size.label
                    ? "border-[#FFE0E4] bg-[#FFDBDB]"
                    : "body-bg"
                  }`}
              >
                {size.label}
              </button>
            ))}

          </div>
        </div>
      );


    case "image":
      const images = options[`${label}-img`] || [];
      return (
        <div className="mb-10">
          <LabelTip />
          <div className="grid grid-cols-4 gap-2 mt-2">
            {names.map((name, index) => {
              const isSelected = selectedItems.includes(name);
              return (
                <button
                  key={index}
                  onClick={() => toggleSelection(name)}
                  className={`flex flex-col items-center text-center custom-text-gray-500 p-2 rounded-md border transition 
                ${isSelected ? "border-[#FFE0E4] bg-[#FFDBDB]" : "border-gray-200"} 
                image-hover`}
                >
                  <div className="w-full aspect-square overflow-hidden rounded-md shadow">
                    <img
                      src={images[index]}
                      alt={name}
                      className="w-full h-full object-contain"
                    />
                  </div>
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
              <h4 className="text-lg md:text-base sm:text-md custom-text-gray-800">{title}</h4>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={data[0]}
                  className="checkbox custom-text-gray-800"
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
            {tip && <span className="text-sm">+{tip}$</span>}
          </div>
        </div>
      );

    case "Input":
      return (
        <div className="mb-10">
          <LabelTip />
          <h4 className="text-center text-sm md:text-base mb-2">為壽星寫下祝福吧！（最多30字）</h4>
          <input
            type="text"
            maxLength={30}
            placeholder="為壽星寫下祝福吧！（最多30字）"
            className="custom-text-gray-800 input w-full md:w-80 text-sm md:text-base py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      );

    case "text":
      return (
        <div className="mb-12">
          <div className="flex items-start justify-between flex-wrap gap-y-2">
            {/* 左側標題 */}
            <h4 className="text-lg md:text-base sm:text-md whitespace-nowrap mr-4 custom-text-gray-500">{title}</h4>
            {/* 中間選項*/}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-1 gap-2 sm:gap-6 custom-text-gray-500">
              {/* 選項區塊 */}
              <div className="flex flex-wrap gap-4 sm:gap-6">
                {names.map((name, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                  >
                    <input
                      type="radio"
                      name={`${label}-radio`}
                      value={name}
                      className="checkbox custom-text-gray-800"
                      onChange={(e) => {
                        const value = e.target.value;
                        if (onOptionChange) {
                          onOptionChange(label, value, 0);
                        }
                      }}
                    />
                    <span>{name}</span>
                  </label>

                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'selector':
      return (
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-lg md:text-base sm:text-md custom-text-gray-800">{title}</h4>
          <select
            className="select custom-text-gray-500"
            value={selectedcandles}
            onChange={handlecandleChange}>
            <option value="" disabled>選擇數字</option>
            <option value="?">?</option>
            {[...Array(100)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1}
              </option>
            ))}
          </select>
        </div>
      );

    default:
      return null;
  }
};

export default CustomizationOption;
