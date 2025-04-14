import React, { useState } from 'react';
import { Menu, X, ShoppingCart, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import HamMenu from './HamMenu';

const Header = () => {
    // 移動版菜單開關狀態
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 切換移動版菜單狀態
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        // css grid 排版
        <header className="fixed top-0 left-0 w-full h-auto header-bg shadow-sm px-4 md:px-6 header" data-theme="light" >
            <div className="mx-8 my-2 flex items-center justify-between">
                {/* ===== Logo 部分 ===== */}
                <div className="hidden md:block flex items-center">
                    <div className="w-16 h-auto rounded-full flex items-center justify-center ">
                        <Link to="/" className="">
                            <img src="/img/Logo.png" alt="Logo" />
                        </Link>
                    </div>
                </div>

                {/* ===== 桌面版導航菜單 ===== */}
                <nav className="hidden items-center md:flex justify-end flex-1 mr-10">
                    <ul className="flex space-x-16">
                        <li className='flex items-center' >
                            <Link to="/" className="hover:text-amber-600 transition-colors text-base">
                                首頁
                            </Link>
                        </li>
                        <li className='flex items-center'>
                            <Link to="/menu" className="hover:text-amber-600 transition-colors text-base">
                                菜單
                            </Link>
                        </li>
                        <li className='flex items-center'>
                            <Link to="/about" className="hover:text-amber-600 transition-colors text-base">
                                關於我們
                            </Link>
                        </li>
                    </ul>
                </nav>

                <div className=' flex items-center space-x-6 md:justify-end md:items-center'>
                    { /* 用戶按鈕 */}
                    <button className="w-8 h-8 flex items-center justify-center ">
                        <CircleUserRound strokeWidth={2.5} className='w-10 h-auto' />
                    </button>

                    {/* 購物車按鈕 */}
                    <button className="w-8 h-8 flex items-center justify-center">
                        <ShoppingCart strokeWidth={2.5} className='w-10 h-auto' />
                    </button>

                    {/* 開關切換器 */}
                    <div className="hidden md:block w-12 h-6 ">
                        <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                    </div>
                </div>

                {/* ===== 用戶功能區 ===== */}
                <div className="flex items-center space-x-4">


                    {/* 移動版菜單開關按鈕 */}
                    <button
                        className="ml-2 md:hidden w-8 h-8 flex items-center justify-center text-amber-800"
                        onClick={toggleMobileMenu}
                    >
                        <HamMenu />
                    </button>
                </div>
            </div>

            {/* ===== 移動版菜單 ===== */}
            {mobileMenuOpen && (
                <nav className="md:hidden mt-4 px-2 pb-4 border-t border-gray-100 pt-4">
                    <ul className="flex flex-col space-y-4 text-amber-800">
                        <li>
                            <Link to="/" className="block py-2 hover:text-amber-600 transition-colors">
                                首頁
                            </Link>
                        </li>
                        <li>
                            <Link to="/menu" className="block py-2 hover:text-amber-600 transition-colors">
                                菜單
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="block py-2 hover:text-amber-600 transition-colors">
                                關於我們
                            </Link>
                        </li>
                        <li>
                            {/* 開關切換器 */}
                            <input type="checkbox" value="synthwave" className="toggle theme-controller" />
                        </li>
                    </ul>
                </nav>

            )}
        </header>
    );
};

export default Header;