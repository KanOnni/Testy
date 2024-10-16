import React from 'react';
import ProductGrid from './ProductGrid';
import '../App.css';

const ProductDetail = ({ product, recommendedProducts, onClose,  addToCart, onProductClick }) => {
  const discountedPrice = (product.price - (product.price * (product.discount / 100))).toFixed(2);

  return (
    <div>
      <div className="product-detail">
        <button onClick={onClose} className='close'>X</button>
        <h2>{product.name}</h2>
        <img className='product-img' src={product.image} alt={product.name} />
        <p>{product.description}</p>
        <p>Color: {product.color}</p>
        <p>Size: {product.size}</p>
        <div className="price-container">
          {discountedPrice == product.price.toFixed(2) ? (
            <span className="product-price-b">${discountedPrice}</span>
          ) : (
            <div>
              <span className="product-price-b">${discountedPrice}</span>
              <span className="old-price-b">${product.price.toFixed(2)}</span>
            </div>
          )}
        </div>
        <button className="add-to-cart-button" type="button" title="Add to Cart" onClick={() => addToCart(product)}></button>
      </div>
      <h3>Recommended Products</h3>
      <ProductGrid products={recommendedProducts} addToCart={addToCart} onProductClick={onProductClick} />
    </div>
  );
};

export default ProductDetail;