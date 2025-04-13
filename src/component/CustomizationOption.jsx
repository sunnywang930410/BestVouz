
import QuantitySelector from "./QuantitySelector"

const CustomizationOption = ({ type, product, label, title, tip }) => {
    const data = product[label];
    if (!data) return null;
    switch (type) {
        case "selector":
            return (
                <div className="mb-6">
                    <h4 className="text-base font-bold">{title}</h4>
                    <select defaultValue="Pick a color" className="select">
                        <option disabled={true}>6吋</option>
                        <option>{product.size[0]}</option>
                        <option>{product.size[1]}</option>
                        <option>{product.size[2]}</option>
                        <option>{product.size[3]}</option>
                    </select>
                </div>
            );
        case "image":
            const images = product[`${label}-img`] || [];
            return (
                <div className="mb-6">
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold">{title}</h4>
                        {tip && <p className="text-sm">+{tip}$</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        {data.map((name, index) => (
                            <div key={index} className="text-center">
                                <img src={images[index]} alt={name} className="w-24 h-24 mx-auto" />
                                <h6 className="mt-2 text-sm">{name}</h6>
                            </div>
                        ))}
                    </div>
                </div>
            );
        case "checkbox":
            return (
                <div>
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold">{title}</h4>
                        {tip && <p className="text-sm">+{tip}$</p>}
                    </div>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" value={names[0]} className="checkbox" />
                        <span>{names[0]}</span>
                    </label>
                </div>
            );
        case "Input":
            return (
                <div>
                    <div className="flex items-center justify-between">
                        <h4 className="text-base font-bold">{title}</h4>
                        {tip && <p className="text-sm">+{tip}$</p>}
                    </div>
                    <input type="text" placeholder="為壽星寫下祝福吧！(最多30字)" className="input" />
                </div>
            );
        case "text":
            return(
                <div>
                    <h6 className="text-base">{title}</h6>
                    <h6 className="text-base">{product.text-jam[0]}</h6>
                    <h6 className="text-base">{product.text-jam[1]}</h6>
                    <h6 className="text-base">{product.text-jam[2]}</h6>
                </div>
            );
        case "counter":
            return(
                <div>
                    <h4 className="text-base font-bold">{title}</h4>
                    <QuantitySelector/>
                </div>
            );
    }
}