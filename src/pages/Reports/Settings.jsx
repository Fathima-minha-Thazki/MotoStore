import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ReportsSettings = () => {
  const navigate = useNavigate();
  const [lowStockThreshold, setLowStockThreshold] = useState(10);
  const [outOfStockAlerts, setOutOfStockAlerts] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  const handleSaveSettings = () => {
    // Here you would typically save to your backend/localStorage
    alert('Settings saved successfully!');
  };

  return (
    <div style={{ maxWidth: 800, margin: '24px auto', padding: 16 }}>
      <div style={{ marginBottom: 32 }}>
        <button
          onClick={() => navigate('/dashboard/reports')}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '8px 16px',
            borderRadius: 6,
            cursor: 'pointer',
            marginBottom: 16
          }}
        >
          ← Back to Reports
        </button>
        
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: 8 }}>
          ⚙️ Reports Settings
        </h1>
        <p style={{ color: '#6b7280', fontSize: '1rem' }}>
          Configure your reporting preferences and alert thresholds
        </p>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: 12, 
        padding: 24, 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        marginBottom: 24
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>
          Stock Alert Settings
        </h2>

        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'block', 
            fontSize: '1rem', 
            fontWeight: 'bold', 
            color: '#374151', 
            marginBottom: 8 
          }}>
            Low Stock Threshold
          </label>
          <input
            type="number"
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(Number(e.target.value))}
            style={{
              width: '200px',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: 6,
              fontSize: '1rem'
            }}
            min="1"
            max="100"
          />
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: 4 }}>
            Alert when stock quantity falls below this number
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#374151'
          }}>
            <input
              type="checkbox"
              checked={outOfStockAlerts}
              onChange={(e) => setOutOfStockAlerts(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Enable Out of Stock Alerts
          </label>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: 4, marginLeft: 24 }}>
            Show urgent alerts when items are completely out of stock
          </p>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: '#374151'
          }}>
            <input
              type="checkbox"
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.target.checked)}
              style={{ marginRight: 8 }}
            />
            Email Notifications
          </label>
          <p style={{ color: '#6b7280', fontSize: '0.875rem', marginTop: 4, marginLeft: 24 }}>
            Receive email alerts for low stock and out of stock items
          </p>
        </div>
      </div>

      <div style={{ 
        background: 'white', 
        borderRadius: 12, 
        padding: 24, 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
        border: '1px solid #e5e7eb',
        marginBottom: 24
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: 16 }}>
          Export Settings
        </h2>
        
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button
            style={{
              background: '#059669',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}
          >
            📊 Export to Excel
          </button>
          
          <button
            style={{
              background: '#7c3aed',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}
          >
            📄 Export to PDF
          </button>
          
          <button
            style={{
              background: '#dc2626',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: 6,
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 'bold'
            }}
          >
            📋 Export to CSV
          </button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <button
          onClick={handleSaveSettings}
          style={{
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Save Settings
        </button>
        
        <button
          onClick={() => navigate('/dashboard/reports')}
          style={{
            background: '#6b7280',
            color: 'white',
            border: 'none',
            padding: '12px 24px',
            borderRadius: 6,
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ReportsSettings;