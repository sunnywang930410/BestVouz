import React, { useState } from 'react';
import { Menu, X, ShoppingCart, CircleUserRound } from 'lucide-react';
import { Link } from 'react-router-dom';
import HamMenu from './HamMenu';
import NavBar from './NavBar';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-auto header-bg header" data-theme="light" >
            <NavBar />
        </header>
    );
};
export default Header;