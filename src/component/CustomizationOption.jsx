import { useState, useEffect } from "react";


const CustomizationOption = ({ type, product, options, label, title, tip, onOptionChange }) => {
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
      <h4 className="text-md md:text-lg">{title}</h4>
      {tip && <span className="text-sm text-gray-500">+{tip}$</span>}
    </div>
  );

  switch (type) {
    case "selector":
      return (
        <div className="mb-10">
          <LabelTip />
          <select
            defaultValue="Pick a size"
            className="select w-full"
            onChange={(e) => {
              const selectedSize = e.target.value;
              onOptionChange(label, selectedSize, 0);
            }}
          >
            <option disabled>選擇尺寸</option>
            {options.size.map((size, i) => (
              <option key={i}>{size}</option>
            ))}
          </select>
        </div>
      );

    case "image":
      const images = options[`${label}-img`] || [];
      return (
        <div className="mb-10">
          <LabelTip />
          <div className="grid grid-cols-4 gap-2 mt-2">
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
          <h4 className="text-center text-sm md:text-base mb-2">為壽星寫下祝福吧！（最多30字）</h4>
          <input
            type="text"
            maxLength={30}
            placeholder="為壽星寫下祝福吧！（最多30字）"
            className="input w-full md:w-80 text-sm md:text-base py-2 px-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
      );



      case "text":
        return (
          <div className="mb-12">
            <div className="flex items-start justify-between flex-wrap gap-y-2">
              {/* 左側標題 */}
              <h4 className="text-sm md:text-base whitespace-nowrap mr-4">{title}</h4>
      
              {/* 中間選項 + 價格提示 */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between flex-1 gap-2 sm:gap-6">
                {/* 選項區塊 */}
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {data.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 text-xs sm:text-sm whitespace-nowrap"
                    >
                      <input
                        type="radio"
                        name={`${label}-radio`}
                        value={option}
                        className="checkbox"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (onOptionChange) {
                            onOptionChange(label, value, 0);
                          }
                        }}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
      
                {/* 加價提示 */}
                {tip && (
                  <span className="text-xs sm:text-sm text-gray-500 whitespace-nowrap">
                    +{tip}$
                  </span>
                )}
              </div>
            </div>
          </div>
        );      


      case "button":
        const btnoption = [...Array(10).keys()].map(String).concat("?");
        // 最多只能選 3 個（總共上下排加起來）
        const maxSelection = 3;
        const [selectedButtons, setSelectedButtons] = useState([]); // e.g. ["0-1", "1-2"]
        const isSelected = (key) => selectedButtons.includes(key);
        useEffect(() => {
          onOptionChange(label, selectedButtons.map((key) => key.split("-")[1]), 0);
        }, [selectedButtons]);
      
        const toggleButton = (key) => {
          setSelectedButtons((prev) => {
            if (prev.includes(key)) {
              return prev.filter((item) => item !== key);
            } else if (prev.length < maxSelection) {
              return [...prev, key];
            } else {
              // 如果已選滿，這邊可以加提醒或 alert
              return prev;
            }
          });
        };
      
        const renderButtonRow = (rowIndex) => (
          <div className="grid grid-cols-5 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11 gap-4 mb-2">
            {btnoption.map((val) => {
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
              <h4 className="text-md md:text-lg">{title}</h4>
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
