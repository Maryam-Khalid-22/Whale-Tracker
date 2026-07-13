# 🐋 WhaleTrackr – Real-Time Crypto Whale Tracker

A full-stack web application that monitors and displays large cryptocurrency transactions (whale movements) in real-time across major exchanges.

## ✨ Features

- 📊 **Real-Time Whale Alerts** – Live updates of large crypto transactions
- 🔍 **Advanced Filtering** – Filter by Buy/Sell, BTC/ETH, Large transactions (>$1M)
- 🔐 **Secure Authentication** – OTP verification, strong password enforcement, rate limiting
- 🌐 **Multi-Exchange Support** – Binance, Coinbase, Kraken, KuCoin
- 📱 **Responsive Design** – Works on desktop, tablet, and mobile
- ⚡ **WebSocket Integration** – Real-time data streaming with Socket.io

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React.js, CSS3,JavaScript |
| Backend | Node.js, Express.js,JavaScript |
| Database | MongoDB Atlas |
| Real-Time | Socket.io |
| Security | JWT, Bcrypt, Rate Limiting |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Maryam-Khalid-22/Whale-Tracker.git
   cd Whale-Tracker
   2. Install backend dependencies
   ```bash
   cd whaletrackr-backend
   npm install
   ```
3. Install frontend dependencies
   ```bash
   cd ../whaletrackr-frontend
   npm install
   ```
4. Set up environment variables
   Create a .env file in the backend folder:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   JWT_SECRET=your_secret_key
   ```
5. Start the backend server
   ```bash
   cd whaletrackr-backend
   npm run dev
   ```
6. Start the frontend server (in a new terminal)
   ```bash
   cd whaletrackr-frontend
   npm start
   ```
7. Open your browser
   ```
   http://localhost:3000
   ```

🔐 Security Features

· ✅ Password strength enforcement (8+ chars, uppercase, lowercase, number, special char)
· ✅ Login attempt limiting (max 4 attempts, 15-min block)
· ✅ OTP verification for signup
· ✅ JWT-based authentication
· ✅ Rate limiting for API endpoints
· ✅ Environment variables for sensitive data

📸 Screenshots

Login Page Dashboard
(Add your screenshot here) (Add your screenshot here)

👩‍💻 Author

Maryam Khalid
GitHub

📄 License

This project is for educational purposes only as a final year project.
