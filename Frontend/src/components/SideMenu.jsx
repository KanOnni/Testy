import React from 'react';

function SideMenu({ isOpen, toggleMenu }) {
  const handleMenuItemClick = (menuItem) => {
    console.log(`Menu item clicked: ${menuItem}`);
    toggleMenu();
  };

  return (
    <div className="menu" style={{ right: isOpen ? '0' : '-100%' }}>
      <div className="menu-header">
        <button className="close-button" onClick={toggleMenu}>X</button>
      </div>
      <ul>
        <li><a href="#clothes" onClick={() => handleMenuItemClick('Clothes')}>Clothes</a></li>
        <li><a href="#shoes" onClick={() => handleMenuItemClick('Shoes')}>Shoes</a></li>
        <li><a href="#accessories" onClick={() => handleMenuItemClick('Accessories')}>Accessories</a></li>
        <li><a href="#sale" onClick={() => handleMenuItemClick('Sale')}>Sale</a></li>
      </ul>
    </div>
  );
}
 
export default SideMenu;