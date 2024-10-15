import React from 'react';
import ProductGrid from './ProductGrid';

const ProductDetail = ({ product, recommendedProducts, onClose }) => {
  const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);

  return (
    <div className="product-detail">
      <button onClick={onClose}>Close</button>
      <h2>{product.name}</h2>
      <img src={product.image} alt={product.name} />
      <p>{product.description}</p>
      <p>Price: ${discountedPrice}</p>
      <div className="star-rating">{product.rating ? '★'.repeat(Math.round(product.rating.rate)) + '☆'.repeat(5 - Math.round(product.rating.rate)) : 'No rating'}</div>
      <h3>Recommended Products</h3>
      <ProductGrid products={recommendedProducts} />
    </div>
  );
};

export default ProductDetail;