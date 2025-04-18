function HamMenu({ onClick, isOpen, className }) {
    return (
        <span
            onClick={onClick}
            className={`inline-flex w-8 h-10 items-center justify-center opacity-70 hover:opacity-100 md:hidden ${className}`}
        >
            <span className="relative w-8 h-6 hover:cursor-pointer">
                {/* 第一條線 */}
                <span
                    className={`bg-base-content h-[3px] absolute left-0 right-0 transition-all duration-400 ${
                        isOpen
                            ? 'opacity-0'
                            : 'top-0'
                    }`}
                ></span>
                {/* 第二條線 */}
                <span
                    className={`bg-base-content h-[3px] absolute left-0 right-0 transition-all duration-400 ${
                        isOpen
                            ? 'rotate-45 top-1/2 -translate-y-1/2'
                            : 'top-1/2 -translate-y-1/2'
                    }`}
                ></span>
                {/* 第三條線 */}
                <span
                    className={`bg-base-content h-[3px] absolute left-0 right-0 transition-all duration-400 ${
                        isOpen
                            ? '-rotate-45 top-1/2 -translate-y-1/2'
                            : 'bottom-0'
                    }`}
                ></span>
            </span>
        </span>
    )
}

export default HamMenu;