import { useLocation } from 'react-router-dom';
function Step() {
    const location = useLocation();
    const getStep = () => {
    if (location.pathname === "/checkout/step1") return 1;
    if (location.pathname === "/checkout/step2") return 2;
    if (location.pathname === "/checkout/step3") return 3;
    return 1;
  };
  const step = getStep();
    return (
        <div className="mb-12 mt-12">
            <ul className="steps steps-horizontal text-gray-800">
                <li className={`step ${step >= 1 ? 'step-warning ' : ''}`}>勾選結帳商品</li>
                <li className={`step ${step >= 2 ? 'step-warning ' : ''}`}>填寫資料</li>
                <li className={`step ${step >= 3 ? 'step-warning ' : ''}`}>結帳</li>
            </ul>
        </div>
    );
}

export default Step;