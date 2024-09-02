import React from 'react';
import '../../components/footer/footer.css'; // Ensure the path is correct for your project

export default function Footer() {
    return (
        <>
            <div className="footer-container">
                <div className="footer-section">
                    <h1 className="footer-heading">DineDelight</h1>
                    <p className="footer-text">
                        108 Adam Street<br />
                        New York, NY 530220<br />
                        United States
                    </p>
                    <p className="footer-text">
                        Phone: <span className="footer-highlight">+1 588 955 8452</span>
                    </p>
                    <p className="footer-text">
                        Email: <a href='mailto:dinedelight0fficial@gmmail.com' className="footer-highlight">dinedelight0fficial@gmail.com</a>
                    </p>
                </div>

                <div className="footer-section" style={{ "marginLeft": "17vh" }}>
                    <h1 className="footer-heading">Explore</h1>
                    <a href="/" className="footer-link" >Home</a><br />
                    <a href="/about" className="footer-link">About Us</a><br />
                    <a href="/reservation" className="footer-link">reservations</a><br />
                    <a href="/contact" className="footer-link">Contact Us</a><br />
                    <a href="/faq" className="footer-link">FAQs</a><br />
                </div>

                <div className="footer-section">
                    <h1 className="footer-heading">Our Services</h1>
                    <a href="/" className="footer-link">Online Booking</a><br />
                    <a href="/" className="footer-link">Customer Reviews</a><br />
                    <a href="/" className="footer-link">Exclusive Discounts</a><br />
                    <a href="/" className="footer-link">Food Blog</a><br />
                </div>

                <div className="footer-section">
                    <h1 className="footer-heading">Stay Updated</h1>
                    <p className="footer-text">
                        Subscribe to our newsletter to receive the latest restaurant deals and reviews.
                    </p>
                    <div className="footer-input-group">
                        <input
                            type="email"
                            className="footer-input"
                            placeholder="Enter your email"
                            aria-label="Recipient's email"
                            aria-describedby="button-addon2"
                        />
                        <button className="footer-button" type="button" id="button-addon2">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>


        </>
    );
}
