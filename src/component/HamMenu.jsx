function HamMenu({ onClick, isOpen, className }) {
    return (
        <span
            onClick={onClick}
            className={`inline-flex w-8 h-10 items-center justify-center opacity-70 hover:opacity-100 md:hidden ${className}`}
        >
            <span className="w-8 h-6 flex flex-col justify-between hover:cursor-pointer">
                {/* 第一條線 */}
                <span
                    className={`bg-base-content h-[3px] transition-all duration-400 w-full origin-center ${isOpen
                        ? "opacity-0"
                        : "translate-y-[6px] rotate-[-4deg]"}`}
                ></span>
                {/* 第二條線 */}
                <span
                    className={`bg-base-content h-[3px] w-full transition-all duration-400 origin-center ${isOpen
                        ? "rotate-45 w-8 translate-y-[5px]"
                        : "translate-y-[3px] rotate-[2deg]"}`}
                ></span>
                {/* 第三條線 */}
                <span
                    className={`bg-base-content h-[3px] w-full transition-all duration-400 origin-center ${isOpen
                        ? "rotate-[-45deg] w-8 -translate-y-[6px]"
                        : "rotate-[-2deg]"}`}
                ></span>
            </span>
        </span>
    )
}

export default HamMenu;