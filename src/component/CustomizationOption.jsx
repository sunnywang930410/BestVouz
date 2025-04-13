import QuantitySelector from "./QuantitySelector";

const CustomizationOption = ({ type, product, label, title, tip }) => {
    const data = product[label];
    if (!data) return null;

    // 客製化選項標題、選項內容左右排版
    const BaseRow = ({ left, right }) => (
        <div className="flex items-center justify-between gap-4 mb-4">
            <div className="w-1/6 text-base font-semibold">{left}</div>
            <div className="w-5/6 flex justify-center items-center">{right}</div>
        </div>
    );

    switch (type) {
        case "selector":
            return (
                <BaseRow
                    left={title}
                    right={
                        <select defaultValue="Pick a size" className="select w-full max-w-xs">
                            <option disabled>選擇尺寸</option>
                            {product.size.map((size, i) => (
                                <option key={i}>{size}</option>
                            ))}
                        </select>
                    }
                />
            );

        case "image":
            const images = product[`${label}-img`] || [];
            return (
                <BaseRow
                    left={
                        <div>
                            {title}<br />{tip && <span className="text-sm text-gray-500">+{tip}$</span>}
                        </div>
                    }
                    right={
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            {data.map((name, index) => (
                                <div key={index} className="text-center">
                                    <img
                                        src={images[index]}
                                        alt={name}
                                        className="w-24 h-24 mx-auto rounded-md shadow"
                                    />
                                    <h6 className="mt-2 text-sm">{name}</h6>
                                </div>
                            ))}
                        </div>
                    }
                />
            );

        case "checkbox":
            return (
                <BaseRow
                    left={
                        <div>
                            {title}<br />{tip && <span className="text-sm text-gray-500">+{tip}$</span>}
                        </div>
                    }
                    right={
                        <label>
                            <input type="checkbox" value={data[0]} className="checkbox" />
                            <span className="text-sm">{data[0]}</span>
                        </label>
                    }
                />
            );

        case "Input":
            return (
                <BaseRow
                    left={title}
                    right={
                        <input
                            type="text"
                            maxLength={30}
                            placeholder="寫下祝福吧！（最多30字）"
                            className="input w-full max-w-xs"
                        />
                    }
                />
            );

        case "text":
            return (
                <BaseRow
                    left={title}
                    right={
                        <div className="grid grid-cols-3 gap-4 mt-2">
                            {product["text-jam"].map((option, index) => (
                                <div key={index}>{option}</div>
                            ))}
                        </div>
                    }
                />
            );

        case "counter":
            return (
                <BaseRow
                    left={title}
                    right={<QuantitySelector />}
                />
            );

        default:
            return null;
    }
};

export default CustomizationOption;
