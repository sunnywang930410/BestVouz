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
        <div className="mt-6 mb-8 md:mb-12 md:mt-12">
            <ul className="steps steps-horizontal custom-text-gray-800">
                <li className={`step ${step >= 1 ? 'step-warning ' : ''} text-sm md:text-base`}>勾選結帳商品</li>
                <li className={`step ${step >= 2 ? 'step-warning ' : ''} text-sm md:text-base`}>填寫資料</li>
                <li className={`step ${step >= 3 ? 'step-warning ' : ''} text-sm md:text-base`}>訂單確認</li>
            </ul>
        </div>
    );
}

export default Step;