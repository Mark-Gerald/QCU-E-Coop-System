import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAllOrders, getProducts } from '../../api';
import { useAuth } from '../../context/AuthContext';
import {
  Package, ShoppingBag, Clock, Users,
  CheckCircle, XCircle, LayoutDashboard, LogOut
} from 'lucide-react';
import API from '../../api';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, pending: 0, products: 0, users: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/admin/login'); return; }
    Promise.all([getAllOrders(), getProducts(), API.get('/users')])
      .then(([ordersRes, productsRes, usersRes]) => {
        const orders = ordersRes.data;
        setStats({
          orders: orders.length,
          pending: orders.filter(o => o.status === 'Pending').length,
          products: productsRes.data.length,
          users: usersRes.data?.length || 0,
        });
        setRecentOrders(orders.slice(0, 5));
      })
      .catch(() => {
        getAllOrders().then(r => {
          const orders = r.data;
          setStats(s => ({ ...s, orders: orders.length, pending: orders.filter(o => o.status === 'Pending').length }));
          setRecentOrders(orders.slice(0, 5));
        });
        getProducts().then(r => setStats(s => ({ ...s, products: r.data.length })));
      });
  }, [user]);

  const handleLogout = () => { logout(); navigate('/'); };

  const statCards = [
    { label: 'Total Orders', value: stats.orders, icon: <ShoppingBag size={24} />, bg: '#1a2e5a', light: '#e8edf5' },
    { label: 'Pending Orders', value: stats.pending, icon: <Clock size={24} />, bg: '#d97706', light: '#fef3c7' },
    { label: 'Total Products', value: stats.products, icon: <Package size={24} />, bg: '#059669', light: '#d1fae5' },
    { label: 'Registered Users', value: stats.users, icon: <Users size={24} />, bg: '#7c3aed', light: '#ede9fe' },
  ];

  const STATUS = {
    Pending: { color: '#d97706', bg: '#fef3c7' },
    Approved: { color: '#059669', bg: '#d1fae5' },
    Declined: { color: '#dc2626', bg: '#fee2e2' },
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex' }}>
      {/* Sidebar */}
      <aside style={{ width: '240px', background: '#1a2e5a', minHeight: '100vh', padding: '0', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img src="/qcu_logo.png" alt="QCU" style={{ width: '36px', height: '36px', borderRadius: '50%' }} onError={e => { e.target.style.display = 'none'; }} />
            <div>
              <div style={{ color: 'white', fontWeight: '700', fontSize: '0.9rem' }}>QCU Cooperative</div>
              <div style={{ color: '#94a3b8', fontSize: '0.7rem' }}>Admin Panel</div>
            </div>
          </div>
        </div>

        <nav style={{ padding: '16px 12px', flex: 1 }}>
          {[
            { to: '/admin', icon: <LayoutDashboard size={18} />, label: 'Dashboard', active: true },
            { to: '/admin/orders', icon: <ShoppingBag size={18} />, label: 'Orders' },
            { to: '/admin/products', icon: <Package size={18} />, label: 'Products' },
            { to: '/admin/users', icon: <Users size={18} />, label: 'Users' },
          ].map(item => (
            <Link key={item.to} to={item.to} style={{
              display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px',
              borderRadius: '8px', textDecoration: 'none', marginBottom: '4px',
              background: item.active ? 'rgba(245,197,24,0.15)' : 'transparent',
              color: item.active ? '#f5c518' : '#94a3b8',
              fontWeight: item.active ? '600' : '400', fontSize: '0.9rem',
              transition: 'all 0.2s',
            }}>
              {item.icon} {item.label}
            </Link>
          ))}
        </nav>

        <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ padding: '10px 12px', marginBottom: '8px' }}>
            <div style={{ color: 'white', fontSize: '0.85rem', fontWeight: '600' }}>{user?.first_name} {user?.last_name}</div>
            <div style={{ color: '#94a3b8', fontSize: '0.72rem' }}>{user?.email}</div>
          </div>
          <button onClick={handleLogout} style={{
            width: '100%', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 12px',
            background: 'rgba(239,68,68,0.1)', border: 'none', borderRadius: '8px',
            color: '#f87171', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem',
          }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px', overflow: 'auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#1a2e5a', fontWeight: '800', fontSize: '1.75rem', margin: 0 }}>Dashboard</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Welcome back, {user?.first_name}!</p>
        </div>

        {/* Stat Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
          {statCards.map(card => (
            <div key={card.label} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ color: '#64748b', fontSize: '0.8rem', margin: '0 0 8px', fontWeight: '500' }}>{card.label}</p>
                  <p style={{ color: '#0f172a', fontSize: '2rem', fontWeight: '800', margin: 0 }}>{card.value}</p>
                </div>
                <div style={{ background: card.light, padding: '10px', borderRadius: '12px', color: card.bg }}>
                  {card.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
          <Link to="/admin/orders" style={{
            background: '#1a2e5a', color: 'white', borderRadius: '12px', padding: '20px',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <ShoppingBag size={24} />
            <div>
              <div style={{ fontWeight: '700' }}>Manage Orders</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{stats.pending} pending approval</div>
            </div>
          </Link>
          <Link to="/admin/products" style={{
            background: '#f5c518', color: '#1a2e5a', borderRadius: '12px', padding: '20px',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px',
          }}>
            <Package size={24} />
            <div>
              <div style={{ fontWeight: '700' }}>Manage Products</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.7 }}>{stats.products} products listed</div>
            </div>
          </Link>
        </div>

        {/* Recent Orders */}
        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ color: '#1a2e5a', fontWeight: '700', fontSize: '1.1rem', margin: 0 }}>Recent Orders</h2>
            <Link to="/admin/orders" style={{ color: '#1a2e5a', fontSize: '0.875rem', fontWeight: '600', textDecoration: 'none' }}>View all →</Link>
          </div>
          {recentOrders.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center', padding: '20px' }}>No orders yet.</p>
          ) : recentOrders.map(order => (
            <div key={order._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div>
                <p style={{ margin: 0, fontWeight: '600', color: '#0f172a', fontSize: '0.9rem' }}>{order.student_name}</p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>{order.student_id} · ₱{order.total_amount}</p>
              </div>
              <span style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '600',
                background: STATUS[order.status]?.bg, color: STATUS[order.status]?.color,
              }}>
                {order.status}
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}