import React, { useState } from 'react';

const Hero = ({ onSignupClick }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      alert('Please enter your email address');
      return;
    }

    setIsLoading(true);

    try {
      // Send to backend
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: email, 
          password: 'defaultPassword123'
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('✅ Signup successful! Check your email.');
        setEmail(''); // Clear the input
        if (onSignupClick) onSignupClick();
      } else {
        alert('❌ ' + (data.message || 'Signup failed. Please try again.'));
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('❌ Cannot connect to server. Please make sure your backend is running on port 5000.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">
          Track Crypto Whales in Real-Time
        </h1>
        <p className="hero-subtitle">
          Get instant notifications when large transactions happen on major exchanges. 
          Never miss important market movements again with our advanced whale tracking technology.
        </p>
        
        <form onSubmit={handleSubmit} className="hero-form">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className="hero-input"
            required
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Signing Up...' : 'Get Started Free'}
          </button>
        </form>

        <p style={{ 
          marginTop: '1rem', 
          fontSize: '0.8rem', 
          color: '#94a3b8',
          opacity: 0.8 
        }}>
          By signing up, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </section>
  );
};

export default Hero;