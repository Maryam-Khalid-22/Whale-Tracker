import React, { useState, useEffect } from 'react';
import './Features.css';

const Features = ({ user, onSavePreferences, onExportData, onSaveTriggers, onFetchAnalytics }) => {
  const [activeFeature, setActiveFeature] = useState(null);
  const [alertPreferences, setAlertPreferences] = useState({
    push: false,
    email: false,
    sms: false
  });
  const [analyticsData, setAnalyticsData] = useState(null);
  const [selectedChart, setSelectedChart] = useState('Transaction Volume');
  const [selectedTimeframe, setSelectedTimeframe] = useState('24h');
  const [triggerSettings, setTriggerSettings] = useState({
    currency: 'BTC',
    minAmount: 100000,
    minValue: 1.0,
    exchanges: ['Binance', 'Coinbase', 'Kraken']
  });

  const features = [
    {
      id: 'alerts',
      title: 'Real-Time Alerts',
      icon: '🔔',
      description: 'Receive instant notifications when whales make large moves across major exchanges.'
    },
    {
      id: 'analytics',
      title: 'Advanced Analytics',
      icon: '📊',
      description: 'Deep dive into whale transaction patterns with comprehensive analytics.'
    },
    {
      id: 'triggers',
      title: 'Customizable Triggers',
      icon: '⚙️',
      description: 'Set custom thresholds for different cryptocurrencies.'
    }
  ];

  const toggleFeature = async (featureId) => {
    if (featureId === 'analytics' && activeFeature !== 'analytics') {
      // Load analytics data when opening analytics panel
      const data = await onFetchAnalytics(selectedChart, selectedTimeframe);
      setAnalyticsData(data);
    }
    setActiveFeature(activeFeature === featureId ? null : featureId);
  };

  const handleAlertToggle = (type) => {
    const updatedPreferences = {
      ...alertPreferences,
      [type]: !alertPreferences[type]
    };
    setAlertPreferences(updatedPreferences);
  };

  const saveAlertPrefs = async () => {
    await onSavePreferences(alertPreferences);
  };

  const handleExport = async () => {
    await onExportData('csv');
  };

  const handleTriggerSave = async () => {
    await onSaveTriggers(triggerSettings);
  };

  const handleTimeframeChange = async (timeframe) => {
    setSelectedTimeframe(timeframe);
    const data = await onFetchAnalytics(selectedChart, timeframe);
    setAnalyticsData(data);
  };

  const handleChartChange = async (chart) => {
    setSelectedChart(chart);
    const data = await onFetchAnalytics(chart, selectedTimeframe);
    setAnalyticsData(data);
  };

  return (
    <section id="features" className="features">
      <div className="container">
        <h2>Powerful Features</h2>
        <div className="features-grid">
          {features.map((feature) => (
            <div key={feature.id} className={`feature-card ${activeFeature === feature.id ? 'active' : ''}`}>
              <div 
                className="feature-header" 
                onClick={() => toggleFeature(feature.id)}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <span className="feature-toggle">
                  {activeFeature === feature.id ? '▲' : '▼'}
                </span>
              </div>
              
              <p className="feature-description">{feature.description}</p>

              {activeFeature === feature.id && (
                <div className="feature-details">
                  {feature.id === 'alerts' && (
                    <div className="alert-options">
                      <h4>Choose Alert Methods:</h4>
                      {[
                        { type: 'push', label: 'Push Notifications' },
                        { type: 'email', label: 'Email Alerts' },
                        { type: 'sms', label: 'SMS Alerts' }
                      ].map((option) => (
                        <label key={option.type} className="option-toggle">
                          <input 
                            type="checkbox" 
                            checked={alertPreferences[option.type]}
                            onChange={() => handleAlertToggle(option.type)}
                          />
                          <span className="toggle-slider"></span>
                          {option.label}
                        </label>
                      ))}
                      <button className="save-btn" onClick={saveAlertPrefs}>
                        Save Preferences
                      </button>
                    </div>
                  )}

                  {feature.id === 'analytics' && (
                    <div className="analytics-dashboard">
                      <h4>Analytics Dashboard</h4>
                      <div className="chart-options">
                        <select 
                          value={selectedChart} 
                          onChange={(e) => handleChartChange(e.target.value)}
                        >
                          <option value="Transaction Volume">Transaction Volume</option>
                          <option value="Price Impact">Price Impact</option>
                          <option value="Whale Patterns">Whale Patterns</option>
                        </select>
                        <select 
                          value={selectedTimeframe} 
                          onChange={(e) => handleTimeframeChange(e.target.value)}
                        >
                          <option value="24h">24h</option>
                          <option value="7d">7d</option>
                          <option value="30d">30d</option>
                          <option value="All Time">All Time</option>
                        </select>
                      </div>
                      <div className="chart-placeholder">
                        {analyticsData ? (
                          <div className="chart-container">
                            <h5>{selectedChart} ({selectedTimeframe})</h5>
                            <div className="chart-bars">
                              {analyticsData.data.map((value, index) => (
                                <div 
                                  key={index} 
                                  className="chart-bar"
                                  style={{ height: `${value / 10}px` }}
                                  title={`${analyticsData.labels[index]}: ${value}`}
                                >
                                  <span>{analyticsData.labels[index]}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          'Loading chart data...'
                        )}
                      </div>
                      <button className="export-btn" onClick={handleExport}>
                        Export Data
                      </button>
                    </div>
                  )}

                  {feature.id === 'triggers' && (
                    <div className="trigger-settings">
                      <h4>Set Custom Triggers</h4>
                      <div className="currency-select">
                        <label>Select Cryptocurrency:</label>
                        <select 
                          value={triggerSettings.currency}
                          onChange={(e) => setTriggerSettings({
                            ...triggerSettings,
                            currency: e.target.value
                          })}
                        >
                          <option value="BTC">BTC</option>
                          <option value="ETH">ETH</option>
                          <option value="ADA">ADA</option>
                          <option value="SOL">SOL</option>
                          <option value="XRP">XRP</option>
                          <option value="DOT">DOT</option>
                        </select>
                      </div>
                      <div className="threshold-settings">
                        <label>
                          Minimum Amount: 
                          <input 
                            type="number" 
                            value={triggerSettings.minAmount}
                            onChange={(e) => setTriggerSettings({
                              ...triggerSettings,
                              minAmount: parseInt(e.target.value)
                            })}
                          />
                        </label>
                        <label>
                          Minimum Value ($M): 
                          <input 
                            type="number" 
                            step="0.1"
                            value={triggerSettings.minValue}
                            onChange={(e) => setTriggerSettings({
                              ...triggerSettings,
                              minValue: parseFloat(e.target.value)
                            })}
                          />
                        </label>
                      </div>
                      <div className="exchange-select">
                        <label>Monitor Exchanges:</label>
                        {['Binance', 'Coinbase', 'Kraken', 'FTX', 'KuCoin', 'Bybit'].map(exchange => (
                          <label key={exchange} className="exchange-checkbox">
                            <input 
                              type="checkbox" 
                              checked={triggerSettings.exchanges.includes(exchange)}
                              onChange={(e) => {
                                const updatedExchanges = e.target.checked
                                  ? [...triggerSettings.exchanges, exchange]
                                  : triggerSettings.exchanges.filter(ex => ex !== exchange);
                                setTriggerSettings({
                                  ...triggerSettings,
                                  exchanges: updatedExchanges
                                });
                              }}
                            />
                            {exchange}
                          </label>
                        ))}
                      </div>
                      <button className="save-triggers" onClick={handleTriggerSave}>
                        Save Triggers
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;