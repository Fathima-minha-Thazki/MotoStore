import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function Overview() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState(10);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('name');

    if (error) {
      alert(error.message);
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  // Calculate analytics
  const analytics = {
    totalItems: items.length,
    totalStock: items.reduce((sum, item) => sum + (item.qty || 0), 0),
    totalValue: items.reduce((sum, item) => sum + ((item.qty || 0) * (item.price || 0)), 0),
    lowStockItems: items.filter(item => (item.qty || 0) <= lowStockThreshold && (item.qty || 0) > 0),
    outOfStockItems: items.filter(item => (item.qty || 0) === 0),
    inStockItems: items.filter(item => (item.qty || 0) > lowStockThreshold),
  };

  const exportToCSV = () => {
    const csvData = [
      ['Report Generated', new Date().toLocaleString()],
      [''],
      ['SUMMARY'],
      ['Total Items', analytics.totalItems],
      ['Total Stock Units', analytics.totalStock],
      ['Total Stock Value', `$${analytics.totalValue.toFixed(2)}`],
      ['Items In Stock', analytics.inStockItems.length],
      ['Low Stock Items', analytics.lowStockItems.length],
      ['Out of Stock Items', analytics.outOfStockItems.length],
      [''],
      ['ITEM DETAILS'],
      ['ID', 'Name', 'Price', 'Stock Quantity', 'Stock Value', 'Status']
    ];

    items.forEach(item => {
      const stockValue = (item.qty || 0) * (item.price || 0);
      const status = item.qty === 0 ? 'Out of Stock' : item.qty <= lowStockThreshold ? 'Low Stock' : 'In Stock';
      csvData.push([
        item.id,
        item.name,
        `$${(item.price || 0).toFixed(2)}`,
        item.qty || 0,
        `$${stockValue.toFixed(2)}`,
        status
      ]);
    });

    const csv = csvData.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `stock-overview-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 1200, margin: '24px auto', padding: 16 }}>
        <div style={{ textAlign: 'center', padding: 40 }}>
          <div style={{ fontSize: '2rem', marginBottom: 16 }}>📊</div>
          <h2>Loading Stock Overview...</h2>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 1200, margin: '24px auto', padding: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div>
          <Link to="/dashboard/reports" style={{ color: '#6b7280', textDecoration: 'none', fontSize: '0.875rem' }}>
            ← Back to Reports
          </Link>
          <h1 style={{ fontSize: '2.25rem', fontWeight: 'bold', color: '#1f2937', margin: '8px 0' }}>
            📊 Stock Overview
          </h1>
          <p style={{ color: '#6b7280' }}>Complete inventory overview with stock levels and values</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button 
            onClick={exportToCSV}
            style={{ 
              padding: '10px 16px', 
              background: '#059669', 
              color: 'white', 
              border: 'none', 
              borderRadius: 8, 
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: 'bold',
              display: 'flex',
              alignItems: 'center',
              gap: 6
            }}
          >
            📄 Export CSV
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
        <div style={{ 
          background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
          padding: 24, 
          borderRadius: 12, 
          border: '1px solid #bfdbfe',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ color: '#1e40af', margin: '0 0 8px 0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Items
          </h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>
            {analytics.totalItems}
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', color: '#3b82f6' }}>
            Unique products
          </p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
          padding: 24, 
          borderRadius: 12, 
          border: '1px solid #bbf7d0',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ color: '#166534', margin: '0 0 8px 0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Total Stock
          </h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#14532d' }}>
            {analytics.totalStock.toLocaleString()}
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', color: '#059669' }}>
            Units in inventory
          </p>
        </div>
        
        <div style={{ 
          background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', 
          padding: 24, 
          borderRadius: 12, 
          border: '1px solid #d8b4fe',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ color: '#7c2d12', margin: '0 0 8px 0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Stock Value
          </h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#581c87' }}>
            ${analytics.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', color: '#7c3aed' }}>
            Total inventory worth
          </p>
        </div>

        <div style={{ 
          background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', 
          padding: 24, 
          borderRadius: 12, 
          border: '1px solid #fde68a',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
        }}>
          <h3 style={{ color: '#92400e', margin: '0 0 8px 0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Avg Item Value
          </h3>
          <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#78350f' }}>
            ${analytics.totalItems > 0 ? (analytics.totalValue / analytics.totalItems).toFixed(0) : '0'}
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '0.875rem', color: '#d97706' }}>
            Per item average
          </p>
        </div>
      </div>

      {/* Stock Status Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32, marginBottom: 32 }}>
        <div style={{ 
          background: 'white', 
          padding: 24, 
          borderRadius: 12, 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', 
          border: '1px solid #e5e7eb' 
        }}>
          <h3 style={{ marginTop: 0, color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 20 }}>
            📈 Stock Distribution
          </h3>
          
          <div style={{ display: 'grid', gap: 16 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: 16, 
              background: '#f0fdf4', 
              borderRadius: 8, 
              border: '1px solid #bbf7d0' 
            }}>
              <div style={{ 
                width: 12, 
                height: 12, 
                background: '#059669', 
                borderRadius: '50%', 
                marginRight: 12 
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#1f2937' }}>In Stock (Good)</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 'bold', color: '#059669', fontSize: '1.25rem' }}>
                      {analytics.inStockItems.length}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ({((analytics.inStockItems.length / analytics.totalItems) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <p style={{ color: '#16a34a', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
                  Stock levels above {lowStockThreshold} units
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: 16, 
              background: '#fffbeb', 
              borderRadius: 8, 
              border: '1px solid #fde68a' 
            }}>
              <div style={{ 
                width: 12, 
                height: 12, 
                background: '#d97706', 
                borderRadius: '50%', 
                marginRight: 12 
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#1f2937' }}>Low Stock</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 'bold', color: '#d97706', fontSize: '1.25rem' }}>
                      {analytics.lowStockItems.length}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ({((analytics.lowStockItems.length / analytics.totalItems) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <p style={{ color: '#d97706', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
                  Stock levels between 1-{lowStockThreshold} units
                </p>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              padding: 16, 
              background: '#fee2e2', 
              borderRadius: 8, 
              border: '1px solid #fecaca' 
            }}>
              <div style={{ 
                width: 12, 
                height: 12, 
                background: '#dc2626', 
                borderRadius: '50%', 
                marginRight: 12 
              }}></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 'bold', color: '#1f2937' }}>Out of Stock</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontWeight: 'bold', color: '#dc2626', fontSize: '1.25rem' }}>
                      {analytics.outOfStockItems.length}
                    </span>
                    <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                      ({((analytics.outOfStockItems.length / analytics.totalItems) * 100).toFixed(1)}%)
                    </span>
                  </div>
                </div>
                <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: '4px 0 0 0' }}>
                  No units in stock - requires restocking
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ 
          background: 'white', 
          padding: 24, 
          borderRadius: 12, 
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', 
          border: '1px solid #e5e7eb' 
        }}>
          <h3 style={{ marginTop: 0, color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 20 }}>
            ⚙️ Configuration
          </h3>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{ 
              display: 'block', 
              marginBottom: 8, 
              fontSize: '0.875rem', 
              fontWeight: 'bold', 
              color: '#374151' 
            }}>
              Low Stock Threshold
            </label>
            <input
              type="number"
              value={lowStockThreshold}
              onChange={(e) => setLowStockThreshold(parseInt(e.target.value) || 0)}
              style={{ 
                width: '100%', 
                padding: 10, 
                border: '1px solid #d1d5db', 
                borderRadius: 6,
                fontSize: '0.875rem'
              }}
              min="0"
            />
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '6px 0 0 0' }}>
              Items below this quantity are considered low stock
            </p>
          </div>

          <div style={{ 
            padding: 16, 
            background: '#f8fafc', 
            borderRadius: 8, 
            border: '1px solid #e2e8f0' 
          }}>
            <h4 style={{ margin: '0 0 12px 0', color: '#1f2937', fontSize: '1rem' }}>Quick Actions</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <Link 
                to="/dashboard/reports/low-stock" 
                style={{ 
                  color: '#dc2626', 
                  textDecoration: 'none', 
                  fontSize: '0.875rem',
                  padding: '6px 0',
                  borderBottom: '1px solid #f3f4f6'
                }}
              >
                → View Low Stock Items ({analytics.lowStockItems.length + analytics.outOfStockItems.length})
              </Link>
              <Link 
                to="/dashboard/reports/stock-details" 
                style={{ 
                  color: '#059669', 
                  textDecoration: 'none', 
                  fontSize: '0.875rem',
                  padding: '6px 0',
                  borderBottom: '1px solid #f3f4f6'
                }}
              >
                → Detailed Stock Report
              </Link>
              <Link 
                to="/dashboard/items/new" 
                style={{ 
                  color: '#3b82f6', 
                  textDecoration: 'none', 
                  fontSize: '0.875rem',
                  padding: '6px 0'
                }}
              >
                → Add New Item
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Top 10 Most Valuable Items */}
      <div style={{ 
        background: 'white', 
        padding: 24, 
        borderRadius: 12, 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)', 
        border: '1px solid #e5e7eb',
        marginBottom: 32
      }}>
        <h3 style={{ marginTop: 0, color: '#1f2937', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 20 }}>
          💎 Top 10 Most Valuable Stock Items
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table width="100%" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Rank
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'left', color: '#374151', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Item Name
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Unit Price
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Quantity
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'right', color: '#374151', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Total Value
                </th>
                <th style={{ padding: '12px 16px', textAlign: 'center', color: '#374151', fontWeight: 'bold', fontSize: '0.875rem' }}>
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {items
                .map(item => ({ ...item, totalValue: (item.qty || 0) * (item.price || 0) }))
                .sort((a, b) => b.totalValue - a.totalValue)
                .slice(0, 10)
                .map((item, index) => {
                  const stockStatus = item.qty === 0 ? 'out' : item.qty <= lowStockThreshold ? 'low' : 'good';
                  const statusConfig = {
                    good: { bg: '#dcfce7', color: '#166534', text: '✅ In Stock' },
                    low: { bg: '#fef3c7', color: '#92400e', text: '⚠️ Low Stock' },
                    out: { bg: '#fee2e2', color: '#991b1b', text: '❌ Out of Stock' }
                  };
                  
                  return (
                    <tr key={item.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          width: 28, 
                          height: 28, 
                          background: index < 3 ? '#fbbf24' : '#e5e7eb',
                          color: index < 3 ? '#78350f' : '#6b7280',
                          borderRadius: '50%', 
                          fontSize: '0.875rem', 
                          fontWeight: 'bold' 
                        }}>
                          {index + 1}
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 'bold', color: '#1f2937' }}>
                        {item.name}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', color: '#6b7280' }}>
                        ${(item.price || 0).toFixed(2)}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#1f2937' }}>
                        {(item.qty || 0).toLocaleString()}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold', color: '#059669', fontSize: '1rem' }}>
                        ${item.totalValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td style={{ padding: '12px 16px', textAlign: 'center' }}>
                        <span style={{
                          padding: '4px 8px',
                          borderRadius: 6,
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          background: statusConfig[stockStatus].bg,
                          color: statusConfig[stockStatus].color,
                          border: `1px solid ${statusConfig[stockStatus].color}33`
                        }}>
                          {statusConfig[stockStatus].text}
                        </span>
                      </td>
                    </tr>
                  );
                })
              }
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary Report */}
      <div style={{ 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
        padding: 24, 
        borderRadius: 12, 
        border: '1px solid #cbd5e1' 
      }}>
        <h3 style={{ marginTop: 0, color: '#475569', fontSize: '1.25rem', fontWeight: 'bold', marginBottom: 16 }}>
          📋 Executive Summary
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <div>
            <h4 style={{ color: '#1f2937', margin: '0 0 12px 0' }}>Inventory Health</h4>
            <ul style={{ color: '#4b5563', lineHeight: 1.6, paddingLeft: 20 }}>
              <li>
                <strong>{((analytics.inStockItems.length / analytics.totalItems) * 100).toFixed(1)}%</strong> of items have healthy stock levels
              </li>
              <li>
                <strong>{((analytics.lowStockItems.length / analytics.totalItems) * 100).toFixed(1)}%</strong> of items need restocking attention
              </li>
              <li>
                Total inventory value represents <strong>${analytics.totalValue.toLocaleString()}</strong> in assets
              </li>
              <li>
                Average value per item: <strong>${(analytics.totalValue / analytics.totalItems).toFixed(2)}</strong>
              </li>
            </ul>
          </div>
          <div>
            <h4 style={{ color: '#1f2937', margin: '0 0 12px 0' }}>Recommendations</h4>
            <ul style={{ color: '#4b5563', lineHeight: 1.6, paddingLeft: 20 }}>
              {analytics.outOfStockItems.length > 0 && (
                <li style={{ color: '#dc2626', fontWeight: 'bold' }}>
                  Immediately restock {analytics.outOfStockItems.length} out-of-stock items
                </li>
              )}
              {analytics.lowStockItems.length > 0 && (
                <li style={{ color: '#d97706' }}>
                  Plan restocking for {analytics.lowStockItems.length} low-stock items
                </li>
              )}
              <li>Monitor top-value items for demand patterns</li>
              <li>Consider bulk purchasing for frequently restocked items</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}