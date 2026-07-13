import React, { useState } from 'react';

const TransactionList = ({ transactions }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTransactions = transactions.filter(transaction => {
    if (filter === 'buys' && transaction.type !== 'buy') return false;
    if (filter === 'sells' && transaction.type !== 'sell') return false;
    if (filter === 'BTC' && transaction.coin !== 'BTC') return false;
    if (filter === 'ETH' && transaction.coin !== 'ETH') return false;
    if (filter === 'large' && parseFloat(transaction.value) <= 1) return false;
    
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!transaction.coin.toLowerCase().includes(searchLower) &&
          !transaction.exchange.toLowerCase().includes(searchLower)) {
        return false;
      }
    }
    
    return true;
  });

  return (
    <section id="live-alerts" className="transaction-section"> {/* ✅ ADDED ID HERE */}
      <div className="section-header">
        <h2 className="section-title">Live Whale Alerts</h2>
        <div className="filter-group">
          {['all', 'buys', 'sells', 'BTC', 'ETH', 'large'].map((filterType) => (
            <button
              key={filterType}
              className={`filter-btn ${filter === filterType ? 'active' : ''}`}
              onClick={() => setFilter(filterType)}
            >
              {filterType === 'all' ? 'All' : 
               filterType === 'buys' ? 'Buys' :
               filterType === 'sells' ? 'Sells' :
               filterType === 'large' ? '>$1M' : filterType}
            </button>
          ))}
        </div>
      </div>

      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search transactions..."
          className="search-input"
        />
      </div>

      <div className="transaction-grid">
        {filteredTransactions.map(transaction => (
          <div key={transaction.id} className="transaction-card animate-fadeInUp">
            <div className="transaction-info">
              <div className={`transaction-icon ${transaction.type}`}>
                {transaction.type === 'buy' ? '📈' : '📉'}
              </div>
              <div className="transaction-details">
                <h3>{transaction.coin} {transaction.type === 'buy' ? 'Purchase' : 'Sale'}</h3>
                <p>
                  {transaction.amount.toLocaleString()} {transaction.coin} • {transaction.exchange}
                  {transaction.buyer && ` • Buyer: ${transaction.buyer}`}
                  {transaction.seller && ` • Seller: ${transaction.seller}`}
                </p>
              </div>
            </div>
            <div className="transaction-amount">
              <div className="transaction-value">${transaction.value}M</div>
              <div className="transaction-time">{transaction.time}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TransactionList;