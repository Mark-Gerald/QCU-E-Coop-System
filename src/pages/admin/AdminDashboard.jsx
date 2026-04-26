import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllOrders, getProducts } from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, pending: 0, products: 0 });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/login'); return; }
    Promise.all([getAllOrders(), getProducts()]).then(([ordersRes, productsRes]) => {
      const orders = ordersRes.data;
      setStats({ orders: orders.length, pending: orders.filter(o => o.status === 'Pending').length, products: productsRes.data.length });
    });
  }, [user]);

  const cards = [
    { label: 'Total Orders', value: stats.orders, color: '#1a2e5a' },
    { label: 'Pending Orders', value: stats.pending, color: '#f5c518' },
    { label: 'Total Products', value: stats.products, color: '#2ecc71' },
  ];

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ color: '#1a2e5a' }}>Admin Dashboard</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {cards.map(c => (
          <div key={c.label} style={{ background: c.color, color: 'white', borderRadius: '12px', padding: '24px', textAlign: 'center' }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>{c.value}</div>
            <div style={{ marginTop: '8px', opacity: 0.85 }}>{c.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: '12px' }}>
        <Link to="/admin/orders" style={{ padding: '12px 24px', background: '#1a2e5a', color: 'white', borderRadius: '6px', textDecoration: 'none' }}>Manage Orders</Link>
        <Link to="/admin/products" style={{ padding: '12px 24px', background: '#f5c518', color: '#1a2e5a', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>Manage Products</Link>
      </div>
    </div>
  );
}