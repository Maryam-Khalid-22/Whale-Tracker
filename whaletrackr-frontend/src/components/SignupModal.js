import React, { useState } from 'react';

const SignupModal = ({ onClose, onSignup }) => {
  const [email, setEmail] = useState('');
  const [activeTab, setActiveTab] = useState('email');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      onSignup(email);
    }
  };

  const handleSocialLogin = (provider) => {
    // Simulate social login - in real app, this would redirect to OAuth
    const socialEmail = `${provider}_user@example.com`;
    onSignup(socialEmail);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md border border-gray-700">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Join WhaleTrackr</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white text-xl">
            ✕
          </button>
        </div>

        <div className="flex mb-6 border-b border-gray-700">
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'email' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('email')}
          >
            📧 Email
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === 'social' ? 'text-blue-400 border-b-2 border-blue-400' : 'text-gray-400'}`}
            onClick={() => setActiveTab('social')}
          >
            🔗 Social
          </button>
        </div>

        {activeTab === 'email' ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold mb-4"
            >
              Continue with Email
            </button>
          </form>
        ) : (
          <div className="space-y-3">
            <button
              onClick={() => handleSocialLogin('google')}
              className="w-full py-3 bg-white hover:bg-gray-100 rounded-lg text-gray-800 font-semibold flex items-center justify-center"
            >
              <span className="mr-3">🔴</span>
              Continue with Google
            </button>
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="w-full py-3 bg-blue-800 hover:bg-blue-900 rounded-lg text-white font-semibold flex items-center justify-center"
            >
              <span className="mr-3">🔵</span>
              Continue with Facebook
            </button>
            <button
              onClick={() => handleSocialLogin('telegram')}
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white font-semibold flex items-center justify-center"
            >
              <span className="mr-3">🔷</span>
              Continue with Telegram
            </button>
          </div>
        )}

        <p className="text-gray-400 text-sm text-center mt-4">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SignupModal;