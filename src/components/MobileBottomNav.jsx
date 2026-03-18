import React from 'react';
import { Link } from 'react-router-dom';

const MobileBottomNav = ({ activePage = 'home' }) => (
  <div className="mobile-bottom-nav">
    <div className="mobile-bottom-nav-inner">
      <Link to="/" className={`mobile-nav-item ${activePage === 'home' ? 'active' : ''}`}>
        <span className="material-symbols-outlined">home</span>
        Home
      </Link>
      <Link to="/sell" className={`mobile-nav-item ${activePage === 'sell' ? 'active' : ''}`}>
        <span className="material-symbols-outlined">sell</span>
        Sell
      </Link>
      <Link to="/dashboard" className={`mobile-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}>
        <span className="material-symbols-outlined">person</span>
        Profile
      </Link>
      <Link to="/track" className={`mobile-nav-item ${activePage === 'track' ? 'active' : ''}`}>
        <span className="material-symbols-outlined">support</span>
        Help
      </Link>
    </div>
  </div>
);

export default MobileBottomNav;
