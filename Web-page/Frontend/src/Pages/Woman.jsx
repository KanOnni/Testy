import React, { useEffect, useState } from 'react';

const Woman = () => {
    const [products, setProducts] = useState([]);
    const [basket, setBasket] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

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

    useEffect(() => {
        const storedBasket = localStorage.getItem('basket');
        if (storedBasket) {
            setBasket(JSON.parse(storedBasket));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('basket', JSON.stringify(basket));
    }, [basket]);

    const addToBasket = (product) => {
        setBasket(prevBasket => [...prevBasket, product]);
    };

    const removeFromBasket = (id) => {
        setBasket(prevBasket => prevBasket.filter(item => item.id !== id));
    };

    const handleCardClick = (product) => {
        setSelectedProduct(product);
    };

    const handleBackToProducts = () => {
        setSelectedProduct(null);
    };

    return (
        <div style={{ padding: '2em', fontFamily: 'Arial, sans-serif', color: '#333' }}>
            {selectedProduct ? (
                // Product Details View
                <div style={{ textAlign: 'center' }}>
                    <button
                        onClick={handleBackToProducts}
                        style={{
                            backgroundColor: '#F66B6A',
                            color: 'white',
                            border: 'none',
                            padding: '0.5em 1em',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginBottom: '2em',
                            fontSize: '1rem',
                        }}
                    >
                        Back to Products
                    </button>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2em', marginBottom: '3em' }}>
                        <img
                            src={selectedProduct.image}
                            alt={selectedProduct.title}
                            style={{ width: '300px', height: '300px', objectFit: 'contain', borderRadius: '10px', border: '1px solid #ddd' }}
                        />
                        <div style={{ textAlign: 'left', maxWidth: '400px', lineHeight: '1.5' }}>
                            <h2 style={{ fontSize: '2rem', color: '#333' }}>{selectedProduct.title}</h2>
                            <p style={{ fontSize: '1.5rem', color: '#F66B6A', margin: '0.5em 0' }}>
                                ${selectedProduct.price}
                            </p>
                            <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '1em' }}>
                                {selectedProduct.description}
                            </p>
                            <button
                                onClick={() => addToBasket(selectedProduct)}
                                style={{
                                    backgroundColor: '#F66B6A',
                                    color: 'white',
                                    border: 'none',
                                    padding: '0.75em 1.5em',
                                    borderRadius: '5px',
                                    cursor: 'pointer',
                                    fontSize: '1rem',
                                }}
                            >
                                Add to Basket
                            </button>
                        </div>
                    </div>

                    {/* Recommended Products Section */}
                    <div style={{ textAlign: 'left' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '1em' }}>You may also like</h3>
                        <div style={{ display: 'flex', gap: '1.5em', justifyContent: 'center' }}>
                            {products
                                .filter(product => product.id !== selectedProduct.id)
                                .slice(0, 3) // Display only 3 recommendations
                                .map(product => (
                                    <div
                                        key={product.id}
                                        style={{
                                            border: '1px solid #ddd',
                                            borderRadius: '10px',
                                            padding: '1em',
                                            width: '200px',
                                            textAlign: 'center',
                                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                            cursor: 'pointer',
                                            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                        }}
                                        onClick={() => handleCardClick(product)}
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            style={{
                                                width: '150px',
                                                height: '150px',
                                                objectFit: 'cover',
                                                marginBottom: '1em',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <h2 style={{ fontSize: '1rem', marginBottom: '0.5em', color: '#333' }}>
                                            {product.title}
                                        </h2>
                                        <p style={{ marginBottom: '0.5em', fontSize: '1.1rem', color: '#F66B6A' }}>
                                            ${product.price}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            ) : (
                // Product List View
                <div style={{ display: 'flex', gap: '2em' }}>
                    {/* Product Cards */}
                    <div style={{ flex: 2 }}>
                        <h1 style={{ marginBottom: '1em', color: '#F66B6A' }}>Jewelry Collection</h1>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2em' }}>
                            {products.map(product => (
                                <div
                                    key={product.id}
                                    style={{
                                        border: '1px solid #ddd',
                                        borderRadius: '10px',
                                        padding: '1em',
                                        width: '200px',
                                        textAlign: 'center',
                                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                        backgroundColor: '#fff',
                                        cursor: 'pointer',
                                        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                                    }}
                                    onClick={() => handleCardClick(product)}
                                >
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={{
                                            width: '150px',
                                            height: '150px',
                                            objectFit: 'cover',
                                            marginBottom: '1em',
                                            borderRadius: '8px',
                                        }}
                                    />
                                    <h2 style={{ fontSize: '1rem', marginBottom: '0.5em', color: '#333' }}>
                                        {product.name}
                                    </h2>
                                    <p style={{ marginBottom: '0.5em', fontSize: '1.1rem', color: '#F66B6A' }}>
                                        ${product.price}
                                    </p>
                                    <p style={{ fontSize: '0.9rem', color: '#666' }}>{product.type}</p>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            addToBasket(product);
                                        }}
                                        style={{
                                            backgroundColor: '#F66B6A',
                                            color: 'white',
                                            border: 'none',
                                            padding: '0.5em 1em',
                                            borderRadius: '5px',
                                            cursor: 'pointer',
                                            fontSize: '0.9rem',
                                            marginTop: '0.5em',
                                        }}
                                    >
                                        Add to Basket
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Basket Section */}
                    <div style={{ flex: 1 }}>
                        <h2 style={{ marginBottom: '1em', color: '#F66B6A' }}>Your Basket</h2>
                        {basket.length === 0 ? (
                            <p style={{ color: '#666' }}>Your basket is empty.</p>
                        ) : (
                            <div
                                style={{
                                    border: '1px solid #ddd',
                                    borderRadius: '10px',
                                    padding: '1em',
                                    backgroundColor: '#fff',
                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                    height: '400px',
                                    overflowY: 'auto',
                                }}
                            >
                                {basket.map(item => (
                                    <div
                                        key={item.id}
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginBottom: '1em',
                                        }}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                                marginRight: '1em',
                                                borderRadius: '5px',
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <h3 style={{ fontSize: '1rem', marginBottom: '0.5em' }}>{item.title}</h3>
                                            <p style={{ fontSize: '0.9rem', color: '#F66B6A' }}>${item.price}</p>
                                        </div>
                                        <button
                                            onClick={() => removeFromBasket(item.id)}
                                            style={{
                                                backgroundColor: '#F66B6A',
                                                color: 'white',
                                                border: 'none',
                                                padding: '0.5em 1em',
                                                borderRadius: '5px',
                                                cursor: 'pointer',
                                                fontSize: '0.8rem',
                                            }}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))}
                                <hr style={{ margin: '1em 0' }} />
                                <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
                                    Total: ${basket.reduce((total, item) => total + item.price, 0).toFixed(2)}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

};

export default Woman;