import React, { useState, useEffect } from 'react';
import Navbar from '../components/navbar';
import SideMenu from '../components/SideMenu';
import ProductGrid from '../components/ProductGrid';
import ProductDetail from '../components/ProductDetail';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import './shop.css';

function Shop() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [cartItem, setCartItem] = useState(0);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const userId = localStorage.getItem("id");
  const remember = localStorage.getItem("remember");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/products", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
  
        const data = await response.json();
        const productList = data.list.map(product => ({ ...product }));
  
        setProducts(productList);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const menProducts = products.filter(product =>
    product.category.toLowerCase() == "men"
  )

  const womenProducts = products.filter(product =>
    product.category.toLowerCase() == "women"
  )

  const kidProducts = products.filter(product =>
    product.category.toLowerCase() == "children"
  )

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  const handleProductClick = (product) => {
    const filteredProducts = products.filter(p => p.id !== product.id);

    const rand = Math.floor(Math.random() * (filteredProducts.length - 2));

    const recommendedProducts = filteredProducts.slice(rand, rand + 3);

    setSelectedProduct({ ...product, recommendedProducts });
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
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
        product.amount-=1;
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item  
        );
      } else {
        product.amount-=1;
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  }

  const removeFromCart = (item) => {
    setCart((prevCart) => {
      const itemToRemove = prevCart.find(product => product.id === item.id);
      setCartItem(cartItem - 1);
      if (itemToRemove) {
        setProducts((prevProducts) =>
          prevProducts.map(product =>
            product.id === item.id ? { ...product, amount: product.amount + 1 } : product
          )
        );
        if (itemToRemove.quantity > 1) {
          return prevCart.map(product =>
            product.id === item.id ? { ...product, quantity: product.quantity - 1 } : product
          );
        } else {
          return prevCart.filter(product => product.id !== item.id);
        }
      }
      return prevCart;
    });
  }

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

        const num = products.find(p => p.id === orderItem.productId).amount;
        const updateProductAmountResponse = await fetch(`http://localhost:3001/products/${orderItem.productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: num,
          }),
        });
        
        const product = await updateProductAmountResponse.json();
        console.log(product.product.amount + " the: " + products.find(p => p.id === orderItem.productId).amount + "E" + orderItem.amount);

        if (!updateProductAmountResponse.ok) {
          throw new Error("Failed to update product amount");
        }
      }
      
      setCart([]);
      setCartItem(0);
      toggleMenu();
      alert("Thank you for shoping with us");
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("There was an error processing your order.");
    }
  }

  return (
    <div className="shop" onLoad={check()}>
      <header>
        <Navbar toggleMenu={toggleMenu} carts={cartItem} searchQuery={searchQuery} handleSearchChange={handleSearchChange}/>
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} cart={cart} checkout={checkout} removeFromCart={removeFromCart} products={products}/>
      </header>
      <main>
        
        {selectedProduct ? (
          <ProductDetail
            product={selectedProduct}
            recommendedProducts={selectedProduct.recommendedProducts}
            onClose={closeProductDetail}
            addToCart={addToCart}
            products={filteredProducts}
            onProductClick={handleProductClick}
          />
        ) : (
          <>
            <section>
              <div className="trending-container">
                <a className="trendingtext">Trending</a>
              </div>
              <ProductGrid addToCart={addToCart} products={filteredProducts} onProductClick={handleProductClick} />
            </section>
            <section>
              <div className="trending-container">
                <a className="trendingtext" id='men'>Men</a>
              </div>
              <ProductGrid addToCart={addToCart} products={menProducts} onProductClick={handleProductClick}/>
            </section>
            <section>
              <div className="trending-container">
                <a className="trendingtext" id='women'>Women</a>
              </div>
              <ProductGrid addToCart={addToCart} products={womenProducts} onProductClick={handleProductClick}/>
            </section>
            <section>
              <div className="trending-container">
                <a className="trendingtext" id='children'>Children</a>
              </div>
              <ProductGrid addToCart={addToCart} products={kidProducts} onProductClick={handleProductClick}/>
            </section>
          </>
        )}
      </main>
      <footer>
      </footer>
    </div>
  );
}

export default Shop;