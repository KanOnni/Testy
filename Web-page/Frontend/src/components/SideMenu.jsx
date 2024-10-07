import React from 'react';

function SideMenu({ isOpen, toggleMenu, cart }) {
  const handleMenuItemClick = (menuItem) => {
    console.log(`Menu item clicked: ${menuItem}`);
    toggleMenu();
  };

  return (
    <div className="menu" style={{ right: isOpen ? '0' : '-100%' }}>
      <div className="menu-header">
        <button className="close-button" onClick={toggleMenu}>X</button>
        <h2>Your Cart</h2> {/* Add title to the side menu */}
      </div>
      <ul className="cart-list">
        {cart.length === 0 ? (
          <li>Your cart is empty.</li>
        ) : (
          cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name}</span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))
        )}
      </ul>
      <div className="cart-footer">
        {cart.length > 0 && (
          <button className="checkout-button" onClick={handleMenuItemClick}>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}
 
export default SideMenu;