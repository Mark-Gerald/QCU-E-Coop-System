import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/login'); };

  return (
    <nav style={{ background: '#1a2e5a', padding: '12px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Link to="/" style={{ color: '#f5c518', fontWeight: 'bold', fontSize: '1.2rem', textDecoration: 'none' }}>
        QCU Cooperative
      </Link>
      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <Link to="/shop" style={{ color: 'white', textDecoration: 'none' }}>Shop</Link>
        <Link to="/cart" style={{ color: 'white', textDecoration: 'none' }}>🛒 Cart {cartCount > 0 && `(${cartCount})`}</Link>
        {user ? (
          <>
            <Link to="/orders" style={{ color: 'white', textDecoration: 'none' }}>My Orders</Link>
            {user.role === 'admin' && <Link to="/admin" style={{ color: '#f5c518', textDecoration: 'none' }}>Admin</Link>}
            <button onClick={handleLogout} style={{ background: 'transparent', border: '1px solid white', color: 'white', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}>
              Logout ({user.first_name})
            </button>
          </>
        ) : (
          <Link to="/login" style={{ background: '#f5c518', color: '#1a2e5a', padding: '6px 16px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>Login</Link>
        )}
      </div>
    </nav>
  );
}