import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-column">
          <h3>Products</h3>
          <ul>
            <li><a href="#">Web Platform</a></li>
            <li><a href="#">Module Apps</a></li>
            <li><a href="#">API Access</a></li>
            <li><a href="#">Enterprise Solutions</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>Resources</h3>
          <ul>
            <li><a href="#">Help Center Documentation</a></li>
            <li><a href="#">Gypsio Guides</a></li>
            <li><a href="#">Market Analysis</a></li>
          </ul>
        </div>
        
        <div className="footer-column">
          <h3>Legal</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Security Compliance</a></li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>© 2023 WholeTracer. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;