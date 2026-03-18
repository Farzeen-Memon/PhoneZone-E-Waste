import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
  <footer className="app-footer">
    <div className="container">
      <div className="footer-grid">
        <div>
          <div className="footer-logo">
            <div className="icon">
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>devices</span>
            </div>
            <span>Phone Zone <span className="brand">ReTech</span></span>
          </div>
          <p className="footer-desc">
            Redefining the standard of tech circularity through premium service and secure valuations.
          </p>
        </div>
        <div className="footer-col">
          <h5>Trade-In</h5>
          <ul>
            <li><Link to="/sell">Sell My Phone</Link></li>
            <li><Link to="/sell">Sell My Laptop</Link></li>
            <li><Link to="/sell">Bulk Trade-In</Link></li>
            <li><a href="#">Enterprise Portal</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Company</h5>
          <ul>
            <li><a href="#">About ReTech</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Contact Support</a></li>
          </ul>
        </div>
        <div className="footer-col">
          <h5>Newsletter</h5>
          <p className="footer-desc" style={{ marginBottom: '1rem' }}>Get market price alerts for your devices.</p>
          <div className="newsletter-input">
            <input type="email" placeholder="Email address" />
            <button className="newsletter-btn">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2026 Phone Zone ReTech. All rights reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ color: '#94a3b8' }}><span className="material-symbols-outlined">language</span></a>
          <a href="#" style={{ color: '#94a3b8' }}><span className="material-symbols-outlined">public</span></a>
          <a href="#" style={{ color: '#94a3b8' }}><span className="material-symbols-outlined">hub</span></a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
