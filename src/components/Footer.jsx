import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="app-footer">
    <div className="container">
      <div className="footer-premium-inner">
        <div className="footer-newsletter-header">
          <h3>Stay Updated</h3>
          <p>Join 10,000+ tech-savvy traders getting exclusive market insights and price alerts.</p>
        </div>

        <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Enter your email address" required />
          <button type="submit" className="footer-btn-subscribe">
            Subscribe Now
          </button>
        </form>

        <div className="footer-links-row">
          <a href="#">About</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Support</a>
        </div>

        <p className="footer-copyright">
          © 2026 Phone Zone <span>ReTech</span>. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;


