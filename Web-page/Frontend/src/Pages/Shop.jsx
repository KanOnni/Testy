import React, { useState } from 'react';
import Navbar from '../components/navbar';
import SideMenu from '../components/SideMenu';
import ProductGrid from '../components/ProductGrid';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartItem, setCartItem] = useState(0);

  const userId = localStorage.getItem("id");
  const remember = localStorage.getItem("remember");
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const check = () => {
    if (remember == true) {
      localStorage.clear();
    }
    if (userId == null) {
      navigate("../");
    }
  }
  
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      setCartItem(cartItem + 1);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item  
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(product => product.id === item.id);
      setCartItem(cartItem - 1);
      if (itemToRemove && itemToRemove.quantity > 1) {
        return prevCart.map(product =>
          item.id === product.id ? { ...product, quantity: product.quantity - 1 } : product
        );
      } else {
        return prevCart.filter(product => product.id !== item.id);
      }
    });
  };

  const checkout = async () => {
    const address = prompt("Please enter your delivery address:");
    if (!address) {
      alert("Address is required!");
      return;
    }

    const orderData = {
      userId: userId,
      date: new Date().toISOString(),
      status: "Pending",
      address: address,
      };

    try {
      const orderResponse = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!orderResponse.ok) {
        throw new Error(orderResponse);
      }

      const order = await orderResponse.json();
      
      const orderItems = cart.map(item => ({
        orderId: order.order.id,
        productId: item.id,
        price: item.price,
        discount: item.discount,
        amount: item.quantity,
      }));
      
      for (let index = 0; index < orderItems.length; index++) {
        const orderItem = orderItems[index];
        const orderItemsResponse = await fetch("http://localhost:3001/orderItems", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(orderItem),
        });
  
        if (!orderItemsResponse.ok) {
          throw new Error("Failed to add order items");
        }
      }
      
      setCart([]);
      alert("Thank you for your order!");
      toggleMenu();
      alert("Thank you for shoping with us");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error processing your order.");
    }
  };

  const deBug = () => {
    console.log(cart);
  };

  return (
    <div className="App" onLoad={check()}>
      <header>
        <Navbar toggleMenu={toggleMenu} carts={cartItem}/>
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} cart={cart} checkout={checkout} removeFromCart={removeFromCart}/>
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
        <button onClick={() => deBug()}>TEST</button>
      </footer>
    </div>
  );
}

export default App;