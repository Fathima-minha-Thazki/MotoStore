// import { useNavigate } from 'react-router-dom';
// import { useEffect, useState } from 'react';
// import { supabase } from '@/lib/supabase';

// export default function Reports() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [lowStockThreshold] = useState(10);

//   const fetchItems = async () => {
//     setLoading(true);
//     const { data, error } = await supabase
//       .from('items')
//       .select('*')
//       .order('name');

//     if (error) {
//       alert(error.message);
//     } else {
//       setItems(data || []);
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchItems();
//   }, []);

//   // Quick analytics for dashboard
//   const analytics = {
//     totalItems: items.length,
//     totalStock: items.reduce((sum, item) => sum + (item.qty || 0), 0),
//     totalValue: items.reduce((sum, item) => sum + ((item.qty || 0) * (item.price || 0)), 0),
//     lowStockItems: items.filter(item => (item.qty || 0) <= lowStockThreshold && (item.qty || 0) > 0),
//     outOfStockItems: items.filter(item => (item.qty || 0) === 0),
//   };

//   const reportCards = [
//     {
//       title: "📊 Stock Overview",
//       description: "Complete inventory overview with stock levels and values",
//       route: "/dashboard/reports/overview",
//       color: "#3b82f6",
//       stats: `${analytics.totalItems} items, $${analytics.totalValue.toFixed(2)} value`
//     },
//     {
//       title: "📦 Stock Details",
//       description: "Detailed view of all items with stock status and values",
//       route: "/dashboard/reports/stock-details",
//       color: "#059669",
//       stats: `${analytics.totalStock} total units in stock`
//     },
//     {
//       title: "⚠️ Low Stock Alert",
//       description: "Items that need immediate restocking attention",
//       route: "/dashboard/reports/low-stock",
//       color: "#dc2626",
//       stats: `${analytics.lowStockItems.length + analytics.outOfStockItems.length} items need attention`,
//       urgent: (analytics.lowStockItems.length + analytics.outOfStockItems.length) > 0
//     },
//     {
//       title: "💰 Sales Report",
//       description: "Sales analytics and top performing items",
//       route: "/dashboard/reports/sales",
//       color: "#7c3aed",
//       stats: "Track sales performance and trends"
//     },
//     {
//       title: "📈 Analytics",
//       description: "Advanced analytics and business insights",
//       route: "/dashboard/reports/analytics",
//       color: "#059669",
//       stats: "Get insights and recommendations"
//     },
//     {
//       title: "⚙️ Settings",
//       description: "Configure alerts, thresholds and export options",
//       route: "/dashboard/reports/settings",
//       color: "#6b7280",
//       stats: "Customize your reporting preferences"
//     }
//   ];

//   if (loading) {
//     return <div style={{ padding: 20, textAlign: 'center' }}>Loading reports...</div>;
//   }

//   return (
//     <div style={{ maxWidth: 1200, margin: '24px auto', padding: 16 }}>
//       <div style={{ marginBottom: 32 }}>
//         <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: 8 }}>
//           📊 Reports Dashboard
//         </h1>
//         <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
//           Comprehensive inventory reporting and analytics
//         </p>
//       </div>

//       {/* Quick Alerts */}
//       {(analytics.lowStockItems.length > 0 || analytics.outOfStockItems.length > 0) && (
//         <div style={{ 
//           background: 'linear-gradient(135deg, #fee2e2 0%, #fef3c7 100%)', 
//           border: '1px solid #fecaca', 
//           borderRadius: 12, 
//           padding: 20, 
//           marginBottom: 32,
//           borderLeft: '6px solid #ef4444',
//           boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
//         }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
//             <span style={{ fontSize: '2rem' }}>🚨</span>
//             <h3 style={{ color: '#dc2626', margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>
//               Inventory Alert
//             </h3>
//           </div>
//           <p style={{ margin: '0 0 16px 0', color: '#b91c1c', fontSize: '1rem' }}>
//             You have {analytics.lowStockItems.length} low stock items and {analytics.outOfStockItems.length} out of stock items that need immediate attention.
//           </p>
//           <button
//             onClick={() => navigate('/dashboard/reports/low-stock')}
//             style={{ 
//               background: '#dc2626', 
//               color: 'white', 
//               border: 'none', 
//               padding: '10px 20px', 
//               borderRadius: 6, 
//               cursor: 'pointer',
//               fontWeight: 'bold',
//               fontSize: '0.875rem',
//               transition: 'background 0.2s'
//             }}
//             onMouseOver={(e) => e.target.style.background = '#b91c1c'}
//             onMouseOut={(e) => e.target.style.background = '#dc2626'}
//           >
//             View Alert Details →
//           </button>
//         </div>
//       )}

//       {/* Quick Stats */}
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
//         gap: 20, 
//         marginBottom: 32 
//       }}>
//         <div style={{ 
//           background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)', 
//           padding: 24, 
//           borderRadius: 12, 
//           border: '1px solid #bfdbfe',
//           textAlign: 'center'
//         }}>
//           <h3 style={{ color: '#1e40af', margin: '0 0 8px 0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//             Total Items
//           </h3>
//           <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#1e3a8a' }}>
//             {analytics.totalItems}
//           </p>
//         </div>
        
//         <div style={{ 
//           background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', 
//           padding: 24, 
//           borderRadius: 12, 
//           border: '1px solid #bbf7d0',
//           textAlign: 'center'
//         }}>
//           <h3 style={{ color: '#166534', margin: '0 0 8px 0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//             Total Stock
//           </h3>
//           <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#14532d' }}>
//             {analytics.totalStock}
//           </p>
//         </div>
        
//         <div style={{ 
//           background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', 
//           padding: 24, 
//           borderRadius: 12, 
//           border: '1px solid #d8b4fe',
//           textAlign: 'center'
//         }}>
//           <h3 style={{ color: '#7c2d12', margin: '0 0 8px 0', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
//             Stock Value
//           </h3>
//           <p style={{ margin: 0, fontSize: '2.5rem', fontWeight: 'bold', color: '#581c87' }}>
//             ${analytics.totalValue.toFixed(0)}
//           </p>
//         </div>
//       </div>

//       {/* Report Cards Grid */}
//       <div style={{ 
//         display: 'grid', 
//         gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
//         gap: 24 
//       }}>
//         {reportCards.map((card, index) => (
//           <div
//             key={index}
//             onClick={() => navigate(card.route)}
//             style={{
//               background: 'white',
//               borderRadius: 12,
//               padding: 24,
//               boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)',
//               border: '1px solid #e5e7eb',
//               cursor: 'pointer',
//               transition: 'all 0.3s ease',
//               position: 'relative',
//               overflow: 'hidden'
//             }}
//             onMouseEnter={(e) => {
//               e.currentTarget.style.transform = 'translateY(-4px)';
//               e.currentTarget.style.boxShadow = '0 12px 25px rgba(0, 0, 0, 0.15)';
//             }}
//             onMouseLeave={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05), 0 1px 3px rgba(0, 0, 0, 0.1)';
//             }}
//           >
//             {/* Decorative accent */}
//             <div style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: 4,
//               background: `linear-gradient(90deg, ${card.color}, ${card.color}aa)`
//             }} />
            
//             {card.urgent && (
//               <div style={{
//                 position: 'absolute',
//                 top: 16,
//                 right: 16,
//                 background: '#dc2626',
//                 color: 'white',
//                 fontSize: '0.75rem',
//                 padding: '4px 8px',
//                 borderRadius: 12,
//                 fontWeight: 'bold',
//                 animation: 'pulse 2s infinite'
//               }}>
//                 URGENT
//               </div>
//             )}

//             <div style={{ marginBottom: 16 }}>
//               <h3 style={{ 
//                 color: '#1f2937', 
//                 margin: '0 0 8px 0', 
//                 fontSize: '1.25rem', 
//                 fontWeight: 'bold',
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 8
//               }}>
//                 {card.title}
//               </h3>
//               <p style={{ 
//                 color: '#6b7280', 
//                 margin: '0 0 12px 0', 
//                 fontSize: '0.95rem', 
//                 lineHeight: 1.5 
//               }}>
//                 {card.description}
//               </p>
//               <div style={{
//                 padding: '8px 12px',
//                 background: '#f9fafb',
//                 borderRadius: 6,
//                 fontSize: '0.875rem',
//                 color: card.color,
//                 fontWeight: 'bold',
//                 border: `1px solid ${card.color}33`
//               }}>
//                 {card.stats}
//               </div>
//             </div>

//             <div style={{
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'space-between',
//               paddingTop: 16,
//               borderTop: '1px solid #f3f4f6'
//             }}>
//               <span style={{ 
//                 color: card.color, 
//                 fontSize: '0.875rem', 
//                 fontWeight: 'bold'
//               }}>
//                 View Report
//               </span>
//               <span style={{ 
//                 color: card.color, 
//                 fontSize: '1.25rem',
//                 transform: 'translateX(0)',
//                 transition: 'transform 0.2s'
//               }}>
//                 →
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Additional Info */}
//       <div style={{ 
//         marginTop: 40, 
//         padding: 24, 
//         background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)', 
//         borderRadius: 12, 
//         border: '1px solid #cbd5e1',
//         textAlign: 'center'
//       }}>
//         <h3 style={{ color: '#475569', margin: '0 0 8px 0' }}>Need Help?</h3>
//         <p style={{ color: '#64748b', margin: '0 0 16px 0', fontSize: '0.95rem' }}>
//           Click on any report card above to view detailed analytics and insights for your inventory.
//         </p>
//         <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
//           <span style={{ color: '#475569', fontSize: '0.875rem' }}>📊 Real-time data</span>
//           <span style={{ color: '#475569', fontSize: '0.875rem' }}>📄 Export options</span>
//           <span style={{ color: '#475569', fontSize: '0.875rem' }}>⚡ Instant alerts</span>
//         </div>
//       </div>
//     </div>
//   );
// }



import React from 'react';

const Reports = () => {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Reports Dashboard - Test Version</h1>
      <p>If you can see this, the component is working!</p>
    </div>
  );
};

export default Reports;