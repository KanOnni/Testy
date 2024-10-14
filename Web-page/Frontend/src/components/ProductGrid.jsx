import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductGrid( {addToCart} ) {
  const [products, setProducts] = useState([]);

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

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart}/>
      ))}
    </div>
  );
}

export default ProductGrid;