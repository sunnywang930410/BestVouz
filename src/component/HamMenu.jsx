function HamMenu({ onClick, mobileMenuOpen, className }) {
    return (
        <span
            onClick={onClick}
            className={`inline-block absolute z-10 w-16 h-10 opacity-70 left-16 top-8 hover:opacity-100 md:hidden flex items-center justify-center ${className}`}
        >
            <span className="w-8 h-6 flex flex-col justify-between hover:cursor-pointer">
                {/* 第一條線 */}
                <span
                    className={`bg-base-content h-[3px] transition-all duration-400 w-full origin-center ${mobileMenuOpen
                        ? "opacity-0"
                        : "translate-y-[6px] rotate-[-4deg]" /* 修正旋轉前的位置 */
                        }`}
                ></span>
                {/* 第二條線 */}
                <span
                    className={`bg-base-content h-[3px] w-full transition-all duration-400 origin-center ${mobileMenuOpen
                        ? "rotate-45 w-8 translate-y-[5px]" /* 調整旋轉軸心 */
                        : "translate-y-[3px] rotate-[2deg]"
                        }`}
                ></span>
                {/* 第三條線 */}
                <span
                    className={`bg-base-content h-[3px] w-full transition-all duration-400 origin-center ${mobileMenuOpen
                        ? "rotate-[-45deg] w-8 -translate-y-[6px]" /* 修正旋轉軸心 */
                        : "rotate-[-2deg]"
                        }`}
                ></span>
            </span>
        </span>
    )
}

export default HamMenu;