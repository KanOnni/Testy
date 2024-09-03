import React from 'react';
import ShippingSvg from '../assets/free shipping.svg';
import supportSvg from '../assets/24support.svg';
import PaymentSvg from '../assets/secure payment.svg';
import GuaranteeSvg from '../assets/Moneyback icon.svg';

const Footer: React.FC = () => {
    return (
        <footer>
            <div className="icon-row">
                <div className="icon">
                    <img src={ShippingSvg} alt="Free Shipping" />
                    <div className="text">
                        <h6>Free Shipping</h6>
                        <p>Free shipping on all your order</p>
                    </div>
                </div>
                <div className="icon">
                    <img src={supportSvg} alt="24/7 Help" />
                    <div className="text">
                        <h6>24/7 Help</h6>
                        <p>Instant access to Support</p>
                    </div>
                </div>
                <div className="icon">
                    <img src={PaymentSvg} alt="Secure Payment" />
                    <div className="text">
                        <h6>Secure Payment</h6>
                        <p>We ensure your money is save</p>
                    </div>
                </div>
                <div className="icon">
                    <img src={GuaranteeSvg} alt="Money Back Guarantee" />
                    <div className="text">
                        <h6>Money Back Guarantee</h6>
                        <p>30 Days Money-Back Guarantee</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
