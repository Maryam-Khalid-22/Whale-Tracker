import React, { useState, useEffect } from 'react';

const TransactionList = ({ transactions: propTransactions }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch real transaction data from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/transactions');
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setTransactions(data);
        setLoading(false);
      } catch (error) {
        console.log('Using simulated data');
        // Use prop data as fallback
        if (propTransactions && propTransactions.length > 0) {
          setTransactions(propTransactions);
        }
        setLoading(false);
      }
    };

    fetchTransactions();

    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchTransactions, 10000);
    return () => clearInterval(interval);
  }, [propTransactions]);

  // Apply filters
  const filteredTransactions = transactions.filter(transaction => {
    // Type filter
    if (filter === 'buys' && transaction.type !== 'buy') return false;
    if (filter === 'sells' && transaction.type !== 'sell') return false;
    if (filter === 'BTC' && transaction.coin !== 'BTC') return false;
    if (filter === 'ETH' && transaction.coin !== 'ETH') return false;
    if (filter === 'large' && parseFloat(transaction.value) <= 1) return false;

    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      if (!transaction.coin?.toLowerCase().includes(searchLower) &&
          !transaction.exchange?.toLowerCase().includes(searchLower)) {
        return false;
      }
    }

    return true;
  });

  if (loading) {
    return (
      <div className="transaction-section">
        <p style={{ color: '#94a3b8', textAlign: 'center' }}>Loading transactions...</p>
      </div>
    );
  }

  return (
    <section className="transaction-section">
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
        {filteredTransactions.length === 0 ? (
          <p style={{ color: '#94a3b8', textAlign: 'center' }}>No transactions found</p>
        ) : (
          filteredTransactions.map(transaction => (
            <div key={transaction.id} className="transaction-card animate-fadeInUp">
              <div className="transaction-info">
                <div className={`transaction-icon ${transaction.type}`}>
                  {transaction.type === 'buy' ? '📈' : '📉'}
                </div>
                <div className="transaction-details">
                  <h3>{transaction.coin} {transaction.type === 'buy' ? 'Purchase' : 'Sale'}</h3>
                  <p>
                    {transaction.amount?.toLocaleString() || 'N/A'} {transaction.coin} • {transaction.exchange || 'Unknown'}
                    {transaction.buyer && ` • Buyer: ${transaction.buyer}`}
                    {transaction.seller && ` • Seller: ${transaction.seller}`}
                  </p>
                </div>
              </div>
              <div className="transaction-amount">
                <div className="transaction-value">${transaction.value || '0'}M</div>
                <div className="transaction-time">{transaction.time || 'Just now'}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default TransactionList;