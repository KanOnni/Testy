import React from 'react';
import '../App.css';
import hamburger from '../assets/img/HamburgerIcon.png';
import logo from '../assets/img/logo.png';
import spyglass from '../assets/img/Spyglass.png';
import cart from '../assets/img/shopping-cart.png';

function Navbar({ toggleMenu, carts, searchQuery, handleSearchChange }) {
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
      <div className="cart-container">
        <input className="cart-btn" type="image" src={cart} alt="Cart" onClick={toggleMenu}/>
        <span className="cart-count">{carts}</span>
      </div>
      <div className="search-container">
        <input type="text" placeholder="SEARCH" className="search-input" value={searchQuery} onChange={handleSearchChange}/>
        /*<img src={spyglass} alt="Search Icon" className="search-icon" />*/
      </div>

      <div className="topnav">
        <a href="#men">MEN</a>
        <a href="#women">WOMEN</a>
        <a href="#children">CHILDREN</a>
      </div>
    </div>
  );
}

export default Navbar;