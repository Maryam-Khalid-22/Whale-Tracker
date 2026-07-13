import React from 'react';
import './Header.css';

const Header = ({ onSignupClick, user, onLogout, onNavigate, onToggleNotifications, notificationsEnabled }) => {
  
  const handleLogoutClick = () => {
    console.log('Logout button clicked in Header component');
    if (onLogout && typeof onLogout === 'function') {
      onLogout(); // Call the logout function passed from App.js
    } else {
      console.error('onLogout is not a function or is undefined');
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h2>WhaleTrackr</h2>
        </div>
        
        <nav className="nav">
          <a href="#live-alerts" onClick={() => onNavigate('live-alerts')}>
            Live Alerts
          </a>
          <a href="#pricing" onClick={() => onNavigate('pricing')}>
            Pricing
          </a>
          <a href="#api" onClick={() => onNavigate('api')}>
            API
          </a>
          <a href="#about" onClick={() => onNavigate('about')}>
            About
          </a>
        </nav>

        <div className="header-actions">
          {/* Notification Toggle Button */}
          <button 
            onClick={onToggleNotifications}
            className={notificationsEnabled ? 'notifications-on' : 'notifications-off'}
          >
            {notificationsEnabled ? '🔔 Notifications ON' : '🔕 Enable Alerts'}
          </button>

          {/* Logout Button with Debugging */}
          <button onClick={handleLogoutClick} className="logout-btn">
            Logout
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;