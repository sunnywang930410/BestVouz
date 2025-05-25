{/* 開關切換器 */ }
import { useSelector, useDispatch } from "react-redux";
import { Sun, Moon } from "lucide-react";
import { selectLightMode, setColorMode } from "@/redux/colorSlice";

export default function SetColorMode({ isDrawerOpen = false }) {
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
        <div className="hidden md:flex items-center gap-2">
            {isDrawerOpen ? (
                <button
                    onClick={toggleColor}
                    className="text-base font-medium hover:text-base-0 pt-10"
                >
                    {lightMode ? '深色模式' : '淺色模式'}
                </button>
            ) : (
                <div className="w-12 h-6">
                    <input
                        type="checkbox"
                        className="toggle theme-controller"
                        checked={!lightMode}
                        onChange={toggleColor}
                    />
                </div>
            )}
        </div>
    );
}
