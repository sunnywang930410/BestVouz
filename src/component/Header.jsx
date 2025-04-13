import React, { useState } from 'react';
import { User, Menu, X, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    // 移動版菜單開關狀態
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 切換移動版菜單狀態
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        // css grid 排版
        <header className="w-full header-bg shadow-sm py-3 px-4 md:px-6" data-theme="light">
            <div className="container mx-auto flex items-center justify-between">
                {/* ===== Logo 部分 ===== */}
                <div className="flex items-center">
                    <div className="w-15 h-auto rounded-full flex items-center justify-center ">
                        <Link to="/" className="">
                            <img src="/img/Logo.png" alt="Logo" />
                        </Link>
                    </div>
                </div>

                {/* ===== 桌面版導航菜單 ===== */}
                <nav className="hidden md:flex justify-end flex-1">
                    <ul className="flex space-x-16 font-medium">
                        <li>
                            <Link to="/" className="hover:text-amber-600 transition-colors">
                                首頁
                            </Link>
                        </li>
                        <li>
                            <Link to="/menu" className="hover:text-amber-600 transition-colors">
                                菜單
                            </Link>
                        </li>
                        <li>
                            <Link to="/about" className="hover:text-amber-600 transition-colors">
                                關於我們
                            </Link>
                        </li>
                        { /* 用戶按鈕 */}
                        <button className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 border border-amber-100">
                            <User size={18} />
                        </button>

                        {/* 購物車按鈕 */}
                        <button className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-800 border border-amber-100">
                            <ShoppingCart size={18} />
                        </button>

                        {/* 開關切換器 */}
                        <div className="w-12 h-6 bg-gray-200 rounded-full flex items-center px-1 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-amber-500 shadow-sm"></div>
                        </div>
                    </ul>
                </nav>

                {/* ===== 用戶功能區 ===== */}
                <div className="flex items-center space-x-4">


                    {/* 移動版菜單開關按鈕 */}
                    <button
                        className="ml-2 md:hidden w-8 h-8 flex items-center justify-center text-amber-800"
                        onClick={toggleMobileMenu}
                    >
                        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
                        <li className="pt-2 border-t border-gray-100">
                            <div className="flex items-center">
                                <span className="mr-2">為您獻上最好的祝福</span>
                                <div className="flex space-x-2">
                                    <div className="w-4 h-4 rounded-full bg-purple-300"></div>
                                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                    <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </nav>
            )}

        </header>
    );
};

export default Header;