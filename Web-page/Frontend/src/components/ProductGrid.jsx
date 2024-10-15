import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';

function ProductGrid( {addToCart, products, onProductClick } ) {
  return (
    <div className="product-grid">
      {products.map(product => (
        <ProductCard key={product.id} product={product} addToCart={addToCart} onProductClick={onProductClick}/>
      ))}
    </div>
  );
}

export default ProductGrid;