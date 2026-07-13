// whaletrackr-backend/security-config.js
const rateLimit = require('express-rate-limit');
const validator = require('validator');

// Rate limiting configuration
exports.signupLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000, // 24 hours
  max: 3, // Maximum 3 signups per IP per day
  message: 'Too many accounts created from this IP, please try again after 24 hours',
  handler: (req, res) => {
    res.status(429).json({
      error: 'Account creation limit exceeded',
      message: 'You can only create 3 accounts per day from this device'
    });
  }
});

exports.loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // 5 login attempts
  message: 'Too many login attempts, please try again after 15 minutes',
  handler: (req, res) => {
    res.status(429).json({
      error: 'Too many failed attempts',
      message: 'Please wait 15 minutes before trying again'
    });
  }
});

// Email validation
exports.validateEmail = (email) => {
  if (!validator.isEmail(email)) {
    throw new Error('Invalid email address format');
  }
  
  // Block disposable emails
  const disposableDomains = [
    'tempmail.com', 'guerrillamail.com', 'mailinator.com',
    '10minutemail.com', 'throwawaymail.com', 'fakeinbox.com'
  ];
  
  const domain = email.split('@')[1];
  if (disposableDomains.includes(domain)) {
    throw new Error('Disposable email addresses are not allowed');
  }
  
  return true;
};

// Password validation
exports.validatePassword = (password) => {
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters long');
  }
  
  if (!/[A-Z]/.test(password)) {
    throw new Error('Password must contain at least one uppercase letter');
  }
  
  if (!/[0-9]/.test(password)) {
    throw new Error('Password must contain at least one number');
  }
  
  if (!/[^A-Za-z0-9]/.test(password)) {
    throw new Error('Password must contain at least one special character');
  }
  
  return true;
};