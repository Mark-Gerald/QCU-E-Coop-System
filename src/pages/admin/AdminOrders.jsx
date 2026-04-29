import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllOrders, updateOrder } from '../../api';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, CheckCircle, XCircle, Clock, Package } from 'lucide-react';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/admin/login'); return; }
    getAllOrders().then(res => setOrders(res.data)).finally(() => setLoading(false));
  }, [user]);

  const handleUpdate = async (id, status, note) => {
    const res = await updateOrder(id, { status, admin_note: note });
    setOrders(prev => prev.map(o => o._id === id ? res.data : o));
  };

  const STATUS = {
    Pending: { color: '#d97706', bg: '#fef3c7', icon: <Clock size={14} /> },
    Approved: { color: '#059669', bg: '#d1fae5', icon: <CheckCircle size={14} /> },
    Declined: { color: '#dc2626', bg: '#fee2e2', icon: <XCircle size={14} /> },
  };

  const filtered = filter === 'All' ? orders : orders.filter(o => o.status === filter);

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Header */}
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/admin" style={{ color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <h1 style={{ color: '#1a2e5a', fontWeight: '800', fontSize: '1.25rem', margin: 0 }}>Order Management</h1>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', background: 'white', padding: '6px', borderRadius: '12px', width: 'fit-content', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
          {['All', 'Pending', 'Approved', 'Declined'].map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '8px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                fontWeight: '600', fontSize: '0.875rem', transition: 'all 0.2s',
                background: filter === f ? '#1a2e5a' : 'transparent',
                color: filter === f ? 'white' : '#64748b',
              }}>
              {f} {f !== 'All' && `(${orders.filter(o => o.status === f).length})`}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: '#64748b', textAlign: 'center', padding: '40px' }}>Loading orders...</p>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '16px' }}>
            <Package size={48} style={{ color: '#d1d5db', margin: '0 auto 16px' }} />
            <p style={{ color: '#94a3b8' }}>No {filter !== 'All' ? filter.toLowerCase() : ''} orders found.</p>
          </div>
        ) : filtered.map(order => (
          <div key={order._id} style={{ background: 'white', borderRadius: '16px', padding: '24px', marginBottom: '16px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: '0 0 4px', color: '#1a2e5a', fontWeight: '700' }}>{order.student_name}</h3>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.875rem' }}>
                  ID: {order.student_id} · {order.student_email}
                </p>
                <p style={{ margin: '4px 0 0', color: '#94a3b8', fontSize: '0.8rem' }}>
                  {new Date(order.createdAt).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <span style={{
                display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 14px',
                borderRadius: '20px', fontWeight: '700', fontSize: '0.8rem',
                background: STATUS[order.status]?.bg, color: STATUS[order.status]?.color,
              }}>
                {STATUS[order.status]?.icon} {order.status}
              </span>
            </div>

            {/* Items */}
            <div style={{ background: '#f8fafc', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px' }}>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: i < order.items.length - 1 ? '1px solid #e2e8f0' : 'none', fontSize: '0.875rem' }}>
                  <span style={{ color: '#374151' }}>{item.product_name} <span style={{ color: '#94a3b8' }}>×{item.quantity}</span></span>
                  <span style={{ fontWeight: '600', color: '#1a2e5a' }}>₱{item.subtotal}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', marginTop: '4px', borderTop: '2px solid #e2e8f0', fontWeight: '700' }}>
                <span style={{ color: '#374151' }}>Total</span>
                <span style={{ color: '#1a2e5a', fontSize: '1.05rem' }}>₱{order.total_amount}</span>
              </div>
            </div>

            {order.admin_note && (
              <p style={{ color: '#64748b', fontSize: '0.8rem', marginBottom: '12px', fontStyle: 'italic' }}>
                Note: {order.admin_note}
              </p>
            )}

            {order.status === 'Pending' && (
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => handleUpdate(order._id, 'Approved', 'Your order has been approved. Please pick up at the QCU Cooperative.')}
                  style={{ flex: 1, padding: '10px', background: '#059669', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <CheckCircle size={16} /> Approve Order
                </button>
                <button onClick={() => handleUpdate(order._id, 'Declined', 'Sorry, your order has been declined. Please contact the cooperative for more information.')}
                  style={{ flex: 1, padding: '10px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <XCircle size={16} /> Decline Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}