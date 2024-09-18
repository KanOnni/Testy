import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductGrid() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
    try {
        const response = await fetch("http://localhost:3001/products", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
                "Access-Control-Allow-Headers":
                "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
            },
        });
        const b = await response.json();

        const list = b.list.map((product) => {
        return {
            ...product,
        };
        });
        setProducts(list);
    } catch (error) {}
    })();
    }, []);

  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;