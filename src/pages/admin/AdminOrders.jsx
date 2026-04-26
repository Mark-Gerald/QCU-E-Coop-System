import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllOrders, updateOrder } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    getAllOrders().then(res => setOrders(res.data));
  }, [user]);

  const handleUpdate = async (id, status, note) => {
    const res = await updateOrder(id, { status, admin_note: note });
    setOrders(prev => prev.map(o => o._id === id ? res.data : o));
  };

  const STATUS_COLOR = { Pending: '#f5c518', Approved: 'green', Declined: 'red' };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ color: '#1a2e5a' }}>Manage Orders</h1>
      {orders.map(order => (
        <div key={order._id} style={{ background: 'white', borderRadius: '10px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <strong>{order.student_name}</strong> — {order.student_id}
              <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{order.student_email}</p>
            </div>
            <span style={{ fontWeight: 'bold', color: STATUS_COLOR[order.status] }}>{order.status}</span>
          </div>
          {order.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#555' }}>
              <span>{item.product_name} × {item.quantity}</span>
              <span>₱{item.subtotal}</span>
            </div>
          ))}
          <p style={{ fontWeight: 'bold', textAlign: 'right', marginTop: '8px' }}>Total: ₱{order.total_amount}</p>
          {order.status === 'Pending' && (
            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button onClick={() => handleUpdate(order._id, 'Approved', 'Your order has been approved.')}
                style={{ padding: '8px 20px', background: 'green', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                ✅ Approve
              </button>
              <button onClick={() => handleUpdate(order._id, 'Declined', 'Sorry, your order has been declined.')}
                style={{ padding: '8px 20px', background: 'red', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                ❌ Decline
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}