import React from 'react';
import Ctoimg from '../assets/Cto img.svg'; // Adjust the path according to your project structure
import { useNavigate } from 'react-router-dom';

const SaleSection = () => {

    const navigate = useNavigate();

    const RouterToShop = () => {
        navigate('/shop'); 
    };

    return (
        <section className="Cto">
            <div className="saleInfo">
                <h3>SUMMER SALE</h3>
                <div className="Line">
                    <p>Revamp your style and save up to 70%!</p>
                </div>
            </div>
            <div className="SaleImg">
                <img className="cto img" src={Ctoimg} alt="this summer sale img" />
            </div>
            <button className="btn" onClick={RouterToShop}>
                SHOP NOW <span className="arrow">&#8594;</span>
            </button>
        </section>
    );
};

export default SaleSection;