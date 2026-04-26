import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getMyOrders } from '../api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const STATUS_COLOR = { Pending: '#f5c518', Approved: 'green', Declined: 'red' };

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
    <div>
      <Navbar />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ color: '#1a2e5a' }}>My Orders</h1>
        {loading ? <p>Loading...</p> : orders.length === 0 ? <p>No orders yet.</p> : (
          orders.map(order => (
            <div key={order._id} style={{ background: 'white', borderRadius: '10px', padding: '20px', marginBottom: '16px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: '#888' }}>{new Date(order.createdAt).toLocaleDateString()}</span>
                <span style={{ fontWeight: 'bold', color: STATUS_COLOR[order.status] }}>{order.status}</span>
              </div>
              {order.items.map((item, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #f0f0f0' }}>
                  <span>{item.product_name} × {item.quantity}</span>
                  <span>₱{item.subtotal}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontWeight: 'bold' }}>
                <span>Total</span><span>₱{order.total_amount}</span>
              </div>
              {order.admin_note && <p style={{ color: '#666', fontSize: '13px', marginTop: '8px' }}>Note: {order.admin_note}</p>}
            </div>
          ))
        )}
      </div>
    </div>
  );
}