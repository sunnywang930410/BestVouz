import { useState } from "react"
import { Link, NavLink } from "react-router";
import { CircleUserRound } from "lucide-react";
import CartSummary from "./CartSummary";
import SetColorMode from "./SetColorMode";

const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const navBarContent = [
        { to: "/", label: "首頁" },
        { to: "/menu", label: "蛋糕種類" },
        { to: "/FAQ", label: "FAQ" },
        { to: "/about", label: "關於BestVouz" },
        { to: "/comment", label: "評論區" }
    ]

    const NavBarContent = () => (
        <div className="w-full navbar md:justify-between items-center">
            <div className="navbar-start">
                <div className="md:hidden dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /> </svg>
                    </div>
                    <div>
                        <ul
                            tabIndex={0}
                            className="dropdown-content absolute top-19 left-[-50px] w-screen h-screen menu z-50  shadow-sm justify-content items-center drawer-bg"
                        >
                            {navBarContent.map(({ to, label }) => (
                                <li key={to}>
                                    <NavLink
                                        to={to}
                                        onClick={() => setIsOpen(false)}
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
                    </div>

                </div>
            </div>
            <div className="navbar-center">
                <div className="hidden md:flex w-16 h-auto rounded-full ">
                    <Link to="/">
                        <img src="/img/Logo.png" alt="Logo" />
                    </Link>
                </div>
            </div>
            <div className="navbar-end">
                <div className='flex md:flex-row space-x-4'>
                    { /* 用戶按鈕 */}
                    <button className="md:flex w-8 h-8 items-center btn btn-ghost btn-circle">
                        <CircleUserRound strokeWidth={2.5} className='w-10 h-auto' />
                    </button>

                    {/* 購物車按鈕 */}
                    {!isOpen && <CartSummary />}

                    {/* 開關切換器 */}
                    <SetColorMode className="md:flex" isDrawerOpen={isOpen} />

                </div>
            </div>
        </div>
    )

    const NavBarContentDown = () => (

        <div className="w-full navbar md:justify-between items-center">
            <ul
                className="w-full flex md:flex-row justify-between items-center md:mx-70 gap-10 md:gap-4">
                {navBarContent.map(({ to, label }) => (
                    <li key={to}>
                        <NavLink
                            to={to}
                            onClick={() => setIsOpen(false)}
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
        </div>

    )
    return (
        // 桌面板導覽列 
        <>
            {/* 桌面版導覽列 */}
            <div className="hidden md:flex md:flex-col justify-between mt-4 mb-4 px-10 py-2">
                <NavBarContent />
                <NavBarContentDown />
            </div>

            {/* 手機版 Drawer */}
            <div className="drawer md:hidden w-full mt-4 mb-4 ">
                {/* 手機版Header */}
                <div className="drawer-content z-999">
                    <div className="flex items-center justify-between px-10 py-2 ">
                        <NavBarContent />
                    </div>
                </div>


            </div>
        </>
    )
}

export default NavBar;