import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SideMenu from '../components/SideMenu';
import ProductGrid from '../components/ProductGrid';
import '../App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const userId = localStorage.getItem("id");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  if (localStorage.getItem("remeber") !== true) {
    localStorage.clear("remember");
    localStorage.clear("id");
  }
  
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  return (
    <div className="App">
      <header>
        <Navbar toggleMenu={toggleMenu} carts={cart.length}/>
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} cart={cart} />
      </header>
      <main>
        <section>
          <div className="trending-container">
            <a className="trendingtext">Trending</a>
          </div>
          <ProductGrid addToCart={addToCart}/>
        </section>
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;