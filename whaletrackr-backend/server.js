const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');
require('dotenv').config(); // ← ADDED THIS LINE

const PORT = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

// Create HTTP server for Socket.io
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// ✅ MongoDB Connection - NOW READING FROM .env FILE
const MONGODB_URI = process.env.MONGODB_URI;

console.log('🔗 Trying to connect to database...');

mongoose.connect(MONGODB_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => {
    console.log('❌ Database connection failed, but no worries!');
    console.log('💡 Your app will still work without database');
  });

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: '✅ Server is running!', 
    message: 'Everything is working fine!',
    port: PORT
  });
});

// ===== SECURITY STUFF =====
const securityConfig = {
  maxSignupsPerIP: 3,
  maxLoginsPerIP: 5,
};

const securityData = {
  ipSignupCount: new Map(),
  ipLoginAttempts: new Map(),
  registeredEmails: new Set(),
};

// Security checks
const securityChecks = {
  checkSignupLimit: (req) => {
    const ip = req.ip || 'unknown';
    const count = securityData.ipSignupCount.get(ip) || 0;
    return count < securityConfig.maxSignupsPerIP;
  },
  
  checkDuplicateEmail: (email) => {
    return !securityData.registeredEmails.has(email);
  },
};

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const ip = req.ip || 'unknown';
    
    if (!securityChecks.checkSignupLimit(req)) {
      return res.status(429).json({ 
        success: false, 
        message: 'Too many signups from this device.' 
      });
    }
    
    if (!securityChecks.checkDuplicateEmail(email)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already registered.' 
      });
    }
    
    // Save user
    securityData.registeredEmails.add(email);
    securityData.ipSignupCount.set(ip, (securityData.ipSignupCount.get(ip) || 0) + 1);
    
    console.log('✅ New user:', email);
    
    res.json({ 
      success: true, 
      message: 'Signup successful!',
      user: { email }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Always successful for now
    res.json({ 
      success: true, 
      message: 'Login successful!',
      user: { email }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Server error. Please try again later.' 
    });
  }
});

// ===== USER PREFERENCES =====
const userPreferences = new Map();
const userTriggers = new Map();

app.post('/api/user/preferences', async (req, res) => {
  try {
    const { email, preferences } = req.body;
    userPreferences.set(email, preferences);
    
    res.json({ 
      success: true, 
      message: 'Preferences saved!',
      preferences 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error saving preferences' 
    });
  }
});

app.get('/api/user/settings', async (req, res) => {
  try {
    const { email } = req.query;
    
    const preferences = userPreferences.get(email) || { push: false, email: false, sms: false };
    const triggers = userTriggers.get(email) || {
      currency: 'BTC',
      minAmount: 100000,
      minValue: 1.0,
      exchanges: ['Binance', 'Coinbase', 'Kraken']
    };
    
    res.json({ 
      success: true, 
      preferences, 
      triggers 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Error getting settings' 
    });
  }
});

// ===== REAL-TIME WHALE TRACKING =====
let transactions = [];
const CRYPTO_COINS = ['BTC', 'ETH', 'BNB', 'XRP', 'ADA', 'SOL', 'DOGE'];

// Create starting transactions
for (let i = 0; i < 20; i++) {
  const types = ['buy', 'sell'];
  const exchanges = ['Binance', 'Coinbase', 'Kraken'];
  
  const newTransaction = {
    id: Date.now() + i,
    type: types[Math.floor(Math.random() * types.length)],
    coin: CRYPTO_COINS[Math.floor(Math.random() * CRYPTO_COINS.length)],
    amount: Math.floor(Math.random() * 500000) + 1000,
    value: (Math.random() * 50 + 1).toFixed(2),
    exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
    time: `${i + 1} min ago`
  };
  
  transactions.push(newTransaction);
}

// Add new whale every 5 seconds
setInterval(() => {
  const types = ['buy', 'sell'];
  const exchanges = ['Binance', 'Coinbase', 'Kraken'];
  
  const newTransaction = {
    id: Date.now(),
    type: types[Math.floor(Math.random() * types.length)],
    coin: CRYPTO_COINS[Math.floor(Math.random() * CRYPTO_COINS.length)],
    amount: Math.floor(Math.random() * 500000) + 1000,
    value: (Math.random() * 50 + 1).toFixed(2),
    exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
    time: 'Just now'
  };
  
  transactions.unshift(newTransaction);
  if (transactions.length > 50) transactions.pop();
  
  io.emit('new-transaction', newTransaction);
  console.log('🐋 WHALE ALERT:', newTransaction.type.toUpperCase(), newTransaction.coin, '-', newTransaction.value + 'M');
}, 5000);

// Get transactions
app.get('/api/transactions', (req, res) => {
  res.json(transactions.slice(0, 20));
});

// Socket.io connection
io.on('connection', (socket) => {
  console.log('🔗 Client connected:', socket.id);
  socket.emit('initial-transactions', transactions.slice(0, 10));
  
  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🔌 Socket.io ready for real-time connections`);
  console.log(`🌐 CORS enabled for: http://localhost:3000`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});