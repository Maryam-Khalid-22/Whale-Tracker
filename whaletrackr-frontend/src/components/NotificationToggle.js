import React, { useState } from 'react';

const NotificationToggle = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = async () => {
    if (!notificationsEnabled) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        alert('🔔 Notifications enabled! You will receive whale alerts.');
      } else {
        alert('Please enable notifications in your browser settings.');
      }
    } else {
      setNotificationsEnabled(false);
      alert('Notifications disabled.');
    }
  };

  return (
    <button 
      onClick={toggleNotifications}
      className={notificationsEnabled ? 'notifications-on' : 'notifications-off'}
    >
      {notificationsEnabled ? '🔔 Notifications ON' : '🔕 Enable Alerts'}
    </button>
  );
};

export default NotificationToggle;