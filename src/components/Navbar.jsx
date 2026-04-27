import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Menu, X, User, ChevronDown, LogOut, Package } from 'lucide-react';

export default function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img
              src="/qcu_logo.png"
              alt="QCU Logo"
              className="h-10 w-10 rounded-full object-cover"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div>
              <div style={{ color: '#1a2e5a', fontWeight: '700', fontSize: '1rem', lineHeight: 1.2 }}>
                QCU Cooperative
              </div>
              <div style={{ color: '#888', fontSize: '0.7rem' }}>Quezon City University</div>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/shop" style={{ color: '#555', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}
              className="hover:text-blue-900 transition-colors">Shop</Link>
            <Link to="/about" style={{ color: '#555', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}
              className="hover:text-blue-900 transition-colors">About Us</Link>
            <Link to="/contact" style={{ color: '#555', textDecoration: 'none', fontWeight: '500', fontSize: '0.95rem' }}
              className="hover:text-blue-900 transition-colors">Contact</Link>
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative" style={{ color: '#1a2e5a', textDecoration: 'none' }}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ background: '#f5c518', color: '#1a2e5a', fontWeight: 'bold', fontSize: '0.65rem' }}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
            {user ? (
              <div className="relative">
                <button onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full px-3 py-1.5 transition-colors"
                  style={{ background: '#1a2e5a', color: 'white', border: 'none', cursor: 'pointer', fontSize: '0.85rem' }}>
                  <div className="w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs"
                    style={{ background: '#f5c518', color: '#1a2e5a' }}>
                    {user.first_name?.[0]?.toUpperCase()}
                  </div>
                  <span>{user.first_name}</span>
                  <ChevronDown size={14} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg py-2 z-50"
                    style={{ border: '1px solid #e5e7eb' }}>
                    <Link to="/orders" onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                      style={{ color: '#333', textDecoration: 'none' }}>
                      <Package size={15} /> My Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link to="/admin" onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50"
                        style={{ color: '#f5c518', textDecoration: 'none', fontWeight: '600' }}>
                        ⚙️ Admin Panel
                      </Link>
                    )}
                    <hr style={{ margin: '4px 0', borderColor: '#f0f0f0' }} />
                    <button onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-50 w-full text-left"
                      style={{ color: '#e53e3e', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <LogOut size={15} /> Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login"
                className="px-5 py-2 rounded-lg font-semibold text-sm transition-colors"
                style={{ background: '#1a2e5a', color: 'white', textDecoration: 'none' }}>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <Link to="/cart" className="relative" style={{ color: '#1a2e5a', textDecoration: 'none' }}>
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  style={{ background: '#f5c518', color: '#1a2e5a', fontWeight: 'bold' }}>
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#1a2e5a' }}>
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-3" style={{ borderColor: '#e5e7eb' }}>
          <Link to="/shop" onClick={() => setMenuOpen(false)} style={{ color: '#333', textDecoration: 'none', padding: '8px 0', fontWeight: '500' }}>Shop</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)} style={{ color: '#333', textDecoration: 'none', padding: '8px 0', fontWeight: '500' }}>About Us</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)} style={{ color: '#333', textDecoration: 'none', padding: '8px 0', fontWeight: '500' }}>Contact</Link>
          {user ? (
            <>
              <Link to="/orders" onClick={() => setMenuOpen(false)} style={{ color: '#333', textDecoration: 'none', padding: '8px 0' }}>My Orders</Link>
              {user.role === 'admin' && <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ color: '#f5c518', textDecoration: 'none', padding: '8px 0', fontWeight: '600' }}>Admin Panel</Link>}
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#e53e3e', textAlign: 'left', padding: '8px 0', cursor: 'pointer', fontWeight: '500' }}>Logout</button>
            </>
          ) : (
            <Link to="/login" onClick={() => setMenuOpen(false)}
              style={{ background: '#1a2e5a', color: 'white', textDecoration: 'none', padding: '10px 16px', borderRadius: '8px', textAlign: 'center', fontWeight: '600' }}>
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}