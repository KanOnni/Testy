import React, { useState } from 'react';
import LogoSvg from '../assets/Testy.svg';
import './Header.css'; // Ensure this line correctly imports your CSS
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (menuItem) => {
        console.log(`Menu item clicked: ${menuItem}`);
        setIsMenuOpen(false); // Optionally close the menu after an item is clicked
    };

    return (
        <header>
            <nav>
                <img src={LogoSvg} alt="Testy logo" className="logo" />
                <ul className={`nav-links ${isMenuOpen ? 'hidden' : ''}`}>
                    <li><Link to="/">Man</Link></li>
                    <li><Link to="/woman">Woman</Link></li>
                    <li><Link to="/children">Children</Link></li>
                </ul>
            
            </nav>
        </header>
    );
};

export default Header;