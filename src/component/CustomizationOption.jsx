import QuantitySelector from "./QuantitySelector";

const CustomizationOption = ({ type, product, label, title, tip }) => {
  const data = product[label];
  if (!data) return null;

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
          <div className="grid grid-cols-2 gap-4 mt-2">
            {data.map((name, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <img
                  src={images[index]}
                  alt={name}
                  className="w-24 h-24 mx-auto rounded-md shadow"
                />
                <h6 className="mt-1 text-sm">{name}</h6>
              </div>
            ))}
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
                <input type="checkbox" value={data[0]} className="checkbox" />
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
                {product["text-jam"].map((option, index) => (
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

    case "counter":
      return (
        <div className="mb-10">
          <h4 className="text-base font-semibold mb-2">{title}</h4>
          <QuantitySelector />
        </div>
      );
    case "button":
      return(
        <div className="mb-10">
          <LabelTip />
          <div className="grid grid-cols-11 gap-4">
            {[...Array(10).keys()].map((num) => (
              <button
                key={num}
                className="btn btn-outline btn-sm w-full"
                onClick={() => console.log(num)} // 按鈕點擊事件
              >
                {num}
              </button>
            ))}
            <button
              className="btn btn-outline btn-sm w-full"
              onClick={() => console.log('?')} // 按鈕點擊事件
            >?</button>
          </div>
        </div>
      );
    

    default:
      return null;
  }
};

export default CustomizationOption;
