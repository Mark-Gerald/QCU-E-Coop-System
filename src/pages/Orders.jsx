import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Package, Clock, CheckCircle, XCircle, ShoppingBag } from 'lucide-react';

const STATUS_CONFIG = {
  Pending:   { color: '#d97706', bg: '#fef3c7', icon: <Clock size={14} />,        label: 'Pending' },
  Approved:  { color: '#059669', bg: '#d1fae5', icon: <CheckCircle size={14} />,  label: 'Approved' },
  Declined:  { color: '#dc2626', bg: '#fee2e2', icon: <XCircle size={14} />,      label: 'Declined' },
  Accepted:  { color: '#059669', bg: '#d1fae5', icon: <CheckCircle size={14} />,  label: 'Accepted' },
  Cancelled: { color: '#dc2626', bg: '#fee2e2', icon: <XCircle size={14} />,      label: 'Cancelled' },
  Completed: { color: '#1a2e5a', bg: '#e8edf5', icon: <CheckCircle size={14} />,  label: 'Completed' },
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    getMyOrders().then(res => setOrders(res.data)).finally(() => setLoading(false));
  }, [user]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#f8f9fa' }}>
      <Navbar />

      <div style={{ background: '#1a2e5a', padding: '32px 20px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ color: 'white', fontWeight: '800', fontSize: 'clamp(1.25rem, 3vw, 1.75rem)', margin: 0 }}>My Orders</h1>
          <p style={{ color: '#94a3b8', margin: '4px 0 0', fontSize: '0.9rem' }}>Track your order history and status</p>
        </div>
      </div>

      <main style={{ flex: 1, maxWidth: '800px', margin: '32px auto', padding: '0 20px', width: '100%', boxSizing: 'border-box' }}>
        {loading ? (
          <p style={{ textAlign: 'center', color: '#64748b', padding: '60px' }}>Loading orders...</p>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px', background: 'white', borderRadius: '20px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
            <div style={{ width: '72px', height: '72px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
              <ShoppingBag size={32} style={{ color: '#94a3b8' }} />
            </div>
            <h3 style={{ color: '#1a2e5a', fontWeight: '700', marginBottom: '8px' }}>No orders yet</h3>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>Start shopping to see your orders here</p>
            <button onClick={() => navigate('/shop')}
              style={{ padding: '12px 32px', background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }}>
              Browse Products
            </button>
          </div>
        ) : orders.map(order => {
          const s = STATUS_CONFIG[order.status] || STATUS_CONFIG.Pending;
          return (
            <div key={order._id} style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                <div>
                  <p style={{ margin: '0 0 4px', fontWeight: '700', color: '#1a2e5a', fontSize: '0.95rem' }}>
                    Order #{order._id.slice(-6).toUpperCase()}
                  </p>
                  <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.8rem' }}>
                    {new Date(order.createdAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </p>
                </div>
                <span style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  padding: '5px 12px', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700',
                  background: s.bg, color: s.color,
                }}>
                  {s.icon} {s.label}
                </span>
              </div>

              <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 16px', marginBottom: '12px' }}>
                {order.items.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 0', borderBottom: i < order.items.length - 1 ? '1px solid #e2e8f0' : 'none', fontSize: '0.875rem' }}>
                    <span style={{ color: '#374151' }}>{item.product_name} <span style={{ color: '#94a3b8' }}>×{item.quantity}</span></span>
                    <span style={{ fontWeight: '600', color: '#1a2e5a' }}>₱{item.subtotal}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', marginTop: '4px', borderTop: '2px solid #e2e8f0', fontWeight: '800' }}>
                  <span style={{ color: '#374151' }}>Total</span>
                  <span style={{ color: '#1a2e5a' }}>₱{order.total_amount}</span>
                </div>
              </div>

              {order.admin_note && (
                <p style={{ color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic', margin: 0 }}>
                  📝 {order.admin_note}
                </p>
              )}
            </div>
          );
        })}
      </main>
      <Footer />
    </div>
  );
}