import React, { useState } from 'react';

function ProductCard({ product, addToCart, onProductClick }) {
  const discountedPrice = (product.price.toFixed(2) - (product.price.toFixed(2) * (product.discount / 100))).toFixed(2);
  const rating = product.rating ? product.rating.rate : 0;

  const getStarRating = (rating) => {
    const fullStar = '★';
    const emptyStar = '☆';
    const roundedRating = Math.round(rating);
    return fullStar.repeat(roundedRating) + emptyStar.repeat(5 - roundedRating);
  };
  if (product.amount > 0 ){
    if (product.price>discountedPrice) {
      return (
        <div className="product-card" id={`product-${product.id}`} >
          <div className="product-details">
            <img src={product.image.toString('base64')} alt={product.name} className="product-image" onClick={() => onProductClick(product)}/>
            <p className="product-title">{product.name}</p>
            <div className="price-container">
              <span className="product-price">${discountedPrice}</span>
              <span className="old-price">${product.price.toFixed(2)}</span>
            </div>
            <div className="star-rating">{getStarRating(rating)}</div>
          </div>
          <button className="add-to-cart-btn" type="button" title="Add to Cart" onClick={() => addToCart(product)}></button>
          <div className="sale-tag">{product.discount}% OFF</div>
        </div>
      );
    } else {
      return (
        <div className="product-card" id={`product-${product.id}`}>
          <div className="product-details">
            <img src={product.image.toString('base64')} alt={product.name} className="product-image" onClick={() => onProductClick(product)}/>
            <p className="product-title">{product.name}</p>
            <div className="price-container">
              <span className="product-price">${discountedPrice}</span>
            </div>
            <div className="star-rating">{getStarRating(rating)}</div>
          </div>
          <button className="add-to-cart-btn" type="button" title="Add to Cart" onClick={() => addToCart(product)}></button>
        </div>
      );
    }
    
  }
}

export default ProductCard;