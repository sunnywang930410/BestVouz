import React, { useState } from 'react';
import { Menu, X, ShoppingCart, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import HamMenu from './HamMenu';
import NavBar from './NavBar';

const Header = () => {
    // 移動版菜單開關狀態
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // 切換移動版菜單狀態
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    return (
        <header className="fixed top-0 left-0 w-full h-auto header-bg header" data-theme="light" >
            <NavBar />
        </header>
    );
};
export default Header;