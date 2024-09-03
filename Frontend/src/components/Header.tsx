import React, { useState } from 'react';
import LogoSvg from '../assets/Testy.svg';
import './Header.css'; // Ensure this line correctly imports your CSS
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleMenuItemClick = (menuItem: string) => {
        console.log(`Menu item clicked: ${menuItem}`);
        setIsMenuOpen(false); // Optionally close the menu after an item is clicked
    };

    return (
        <header>
            <nav>
                <img src={LogoSvg} alt="Testy logo" className="logo" />
                <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="hamburger-icon">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <ul className={`nav-links ${isMenuOpen ? 'hidden' : ''}`}>
                    <li><Link to="/">Man</Link></li>
                    <li><Link to="/woman">Woman</Link></li>
                    <li><Link to="/children">Children</Link></li>
                </ul>
                <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
                    <div className="menu-header">
                        <button className="close-button" onClick={toggleMenu}>X</button>
                    </div>
                    <ul>
                        <li><a href="/clothes" onClick={() => handleMenuItemClick('Clothes')}>Clothes</a></li>
                        <li><a href="/shoes" onClick={() => handleMenuItemClick('Shoes')}>Shoes</a></li>
                        <li><a href="/accessories" onClick={() => handleMenuItemClick('Accessories')}>Accessories</a></li>
                        <li><a href="/sale" onClick={() => handleMenuItemClick('Sale')}>Sale</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
