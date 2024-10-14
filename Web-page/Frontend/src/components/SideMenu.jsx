import React from 'react';
import { useNavigate } from 'react-router-dom';

function SideMenu({ isOpen, toggleMenu, cart, checkout, removeFromCart }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('../');
  }

  return (
    <div className="menu" style={{ right: isOpen ? '0' : '-100%' }}>
      <div className="menu-header">
        <button className="close-button" onClick={toggleMenu}>X</button>
      </div>
      <h1>Cart</h1>
      <ul className="cart-list">
        {cart.length === 0 ? (
          <li>Your cart is empty.</li>
        ) : (
          cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span>{item.name} (x{item.quantity})</span>
              <button className="remove-button" onClick={() => removeFromCart(item)}>X</button>
            </li>
          ))
        )}
      </ul>
      <div className="cart-footer">
        {cart.length > 0 && (
          <button className="btn" onClick={() => checkout()}>{/*checkout-button*/}
            Checkout
          </button>
        )}
        <button className="" onClick={() => logout()}>Log out</button>
      </div>
    </div>
  );
}
 
export default SideMenu;