import { useState } from "react"
import { Link, NavLink } from "react-router";
import HamMenu from "./HamMenu";
import { CircleUserRound, ShoppingCart } from "lucide-react";
import CartSummary from "./CartSummary";
import SetColorMode from "./SetColorMode";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navBarContent = [
        { to: "/", label: "首頁" },
        { to: "/menu", label: "菜單" },
        { to: "/about", label: "關於我們" },
    ]

    const NavBarContent = () => (
        <div className="w-full flex flex-col md:flex-row md:justify-between md:space-x-6 items-center">
            {/* ===== Logo 部分 ===== */}
            <div className="hidden md:flex w-16 h-auto rounded-full ">
                <Link to="/">
                    <img src="/img/Logo.png" alt="Logo" />
                </Link>
            </div>

            <div className="md:flex items-center space-x-10 justify-center">
                {/* ===== 導覽列內容 ===== */}

                <ul className="flex flex-col md:flex-row md:space-x-10">
                    {navBarContent.map(({ to, label }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                className={({ isActive }) =>
                                    `text-base transition-all duration-300 ease-in-out ${isActive ? "opacity-100" : "opacity-60"
                                    } hover:opacity-80`
                                }
                            >
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>


                <div className='flex md:flex-row space-x-4'>
                    { /* 用戶按鈕 */}
                    <button className="hidden md:flex w-8 h-8 items-center">
                        <CircleUserRound strokeWidth={2.5} className='w-10 h-auto' />
                    </button>

                    {/* 購物車按鈕 */}
                    <CartSummary />
                </div>
                {/* 開關切換器 */}
                <SetColorMode />
            </div>
        </div>
    )

    return (
        // 桌面板導覽列 
        <>
            {/* 桌面版導覽列 */}
            <div className="hidden md:flex justify-between mt-4 mb-4 px-10 py-2">
                <NavBarContent />
            </div>

            {/* 手機版 Drawer */}
            <div className="drawer md:hidden w-full mt-4 mb-4 ">
                <input id="drawer-toggle" type="checkbox" className="drawer-toggle" checked={isOpen} readOnly />
                {/* 手機版Header */}
                <div className="drawer-content z-999">
                    <div className="w-full flex items-center justify-between px-10 py-2 ">
                        <div className="flex items-center">
                            <HamMenu
                                onClick={() => setIsOpen(!isOpen)}
                                isOpen={isOpen}
                            />
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="w-8 h-8">
                                <CircleUserRound strokeWidth={2.5} className="w-full h-full" />
                            </button>
                            <div className="w-8 h-8">
                                <CartSummary />
                                {/* <ShoppingCart strokeWidth={2.5} className="w-full h-full" /> */}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="drawer-side z-50">
                    <div className={`fixed w-full left-0 right-0 transition-all duration-300 ease-in-out z-40 ${isOpen
                        ? 'top-[84px] h-[calc(100vh-84px)]'
                        : 'top-[-100vh]'
                        }`}>
                        <div className="w-full justify-center items-center drawer-bg h-full">
                            <NavBarContent />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NavBar;