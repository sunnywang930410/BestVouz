{/* 開關切換器 */ }
import { useSelector, useDispatch } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { selectLightMode, setColorMode } from "@/redux/colorSLice";

export default function SetColorMode() {
    const lightMode = useSelector(selectLightMode);
    const dispatch = useDispatch();

    const toggleColor = () => {
        dispatch(setColorMode(!lightMode))
        if (lightMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }

    return (
        <div className="flex items-center gap-2">

            {/* DaisyUI Toggle 開關 */}
            <div className="w-12 h-6">
                <input
                    type="checkbox"
                    className="toggle theme-controller"
                    checked={!lightMode} // 因為 lightMode 為 true 時代表亮模式，Toggle 應該是「關」
                    onChange={toggleColor}
                />
            </div>
        </div>
    );
}
