import './Home.css'
import React from 'react';
import Header from '../components/Header';
import SaleSection from '../components/CtoSection';
import Footer from '../components/Footer';

const Home = () => {
  return (
        <div>
            <Header />
            <SaleSection />
            <Footer />
        </div>
  );
};

export default Home;