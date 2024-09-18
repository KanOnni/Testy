import React, { useEffect, useState } from 'react';

const Woman = () => {
    const [products, setProducts] = useState([]);
    const [basket, setBasket] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products/category/jewelery?sort=asc')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error(err));
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

    // Rest of the component code remains the same
    // ...

};

export default Woman;