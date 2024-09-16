import React from 'react';

function ProductCard({ product }) {
  const discountedPrice = (product.price * 0.5).toFixed(2);
  const rating = product.rating ? product.rating.rate : 0;

  const getStarRating = (rating) => {
    const fullStar = '★';
    const emptyStar = '☆';
    const roundedRating = Math.round(rating);
    return fullStar.repeat(roundedRating) + emptyStar.repeat(5 - roundedRating);
  };

  const addToCart = () => {
    console.log(`Added ${product.title} to cart`);
  };

  return (
    <div className="product-card" id={`product-${product.id}`}>
      <img src={product.image} alt={product.title} className="product-image" />
      <div className="product-details">
        <p className="product-title">{product.title}</p>
        <div className="price-container">
          <span className="product-price">${discountedPrice}</span>
          <span className="old-price">${product.price.toFixed(2)}</span>
        </div>
        <div className="star-rating">{getStarRating(rating)}</div>
      </div>
      <button className="add-to-cart-btn" type="button" title="Add to Cart" onClick={addToCart}></button>
      <div className="sale-tag">50% OFF</div>
    </div>
  );
}

export default ProductCard;