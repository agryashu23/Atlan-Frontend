import React from 'react';
import logo from '../../assets/img/logo.svg'; 
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="logo-footer">
          <img src={logo} alt="Logo" />
        </div>
        <div className="text-center text-end">
          <p className="footer-p">Copyright © 2024. All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};