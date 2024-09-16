import React from 'react';
import '../App.css';
import hamburger from '../img/HamburgerIcon.png';
import logo from '../img/logo.png';
import spyglass from '../img/Spyglass.png';
import cart from '../img/shopping-cart.png';

function Navbar({ toggleMenu }) {
  return (
    <div className="navbar">
      <input 
        className="hamburger-btn" 
        type="image" 
        src={hamburger} 
        alt="Menu" 
        onClick={toggleMenu}
      />
      <img className="logo-img" src={logo} alt="Testy Logo" />
      <div className="search-container">
        <input type="text" placeholder="SEARCH" className="search-input" />
        <img src={spyglass} alt="Search Icon" className="search-icon" />
      </div>
      <input class="cart-btn" type="image" src={cart} alt="Cart"></input>
      <div className="topnav">
        <a href="#men">MEN</a>
        <a href="#women">WOMEN</a>
        <a href="#children">CHILDREN</a>
      </div>
    </div>
  );
}

export default Navbar;