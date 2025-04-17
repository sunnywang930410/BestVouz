import React, { useState } from 'react';
import NavBar from './NavBar';

const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full h-auto header-bg z-9999 header">
            <NavBar />
        </header>
    );
};
export default Header;