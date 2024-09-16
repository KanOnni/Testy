import React, { useState } from 'react';
import Navbar from './components/navbar';
import SideMenu from './components/SideMenu';
import ProductGrid from './components/ProductGrid';
import './App.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="App">
      <header>
        <Navbar toggleMenu={toggleMenu} />
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </header>
      <main>
        <section>
          <div className="trending-container">
            <a className="trendingtext">Trending</a>
          </div>
          <ProductGrid />
        </section>
      </main>
      <footer>
        {/* Footer content */}
      </footer>
    </div>
  );
}

export default App;