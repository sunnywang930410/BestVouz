import Step from "../src/component/Step"
import { CircleCheckBig } from 'lucide-react';
import { useNavigate } from "react-router";

function Success() {
    const navigate = useNavigate();
    const handleNavigateHome = () => {
        navigate("/");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const handleNavigateProfile = () => {
        navigate("/auth/profile");
        // 導航時也滾動到頂部
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    return (
        <div className="space-y-4 pb-12 mt-12 md:pb-32 md:mt-36">
            <Step />
            <div className="flex flex-col items-center justify-center mt-20 p-4">
                <CircleCheckBig className="text-[#22C55E] w-24 h-24 mx-auto" />
                <div className="flex flex-col gap-6 items-center justify-center mt-12">
                    <span className="text-lg md:text-xl lg:text-2xl md:text-xl sm:text-lg">感謝您的購買！</span>
                    <span className="text-base md:text-lg lg:text-xl sm:text-base custom-text-gray-800">我們已收到您的訂單，請檢視訂單，確認您的付款狀態</span>
                </div>
                <div className="flex justify-center gap-12 mt-12">
                    <button
                        className="px-6 sm:px-10 py-2 text-base rounded-lg custom-text-gray-800 border border-2 border-secondary hover:bg-secondary-content/25"
                        onClick={() => { handleNavigateHome(); }}
                    >
                        返回首頁
                    </button>
                    <button className="px-6 sm:px-10 py-2 text-base rounded-lg bg-secondary border-2 border-transparent text-white
                 transition-colors duration-200 
                 hover:bg-secondary-content
                 active:bg-secondary-content"
                        onClick={() => { handleNavigateProfile(); }}
                    >
                        查看訂單
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Success;