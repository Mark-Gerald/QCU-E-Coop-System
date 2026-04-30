import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ShoppingCart, Menu, X, ChevronDown, LogOut, Package, Shield } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

export default function Navbar({ cartCount = 0 }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate('/');
  };

  const handleAdminAccess = () => {
    setDropdownOpen(false);
    setMenuOpen(false);
    if (user) {
      setShowAdminModal(true); // show custom modal instead of window.confirm
    } else {
      navigate('/admin/login');
    }
  };

  const handleAdminConfirm = () => {
    setShowAdminModal(false);
    logout();
    navigate('/admin/login');
  };

  const navLinkStyle = (path) => ({
    color: location.pathname === path ? '#1a2e5a' : '#555',
    textDecoration: 'none',
    fontWeight: location.pathname === path ? '700' : '500',
    fontSize: '0.95rem',
    paddingBottom: '2px',
    borderBottom: location.pathname === path ? '2px solid #f5c518' : '2px solid transparent',
    transition: 'all 0.2s',
  });

  return (
    <>
      {/* Custom Confirm Modal */}
      <ConfirmModal
        isOpen={showAdminModal}
        title="Administration Access"
        message="Do you want to log out and proceed to the Administration page?"
        confirmText="Yes, Proceed"
        cancelText="Cancel"
        onConfirm={handleAdminConfirm}
        onCancel={() => setShowAdminModal(false)}
      />

      <nav style={{ background: 'white', boxShadow: '0 1px 8px rgba(0,0,0,0.08)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>

            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <img src="/qcu_logo.png" alt="QCU Logo"
                style={{ height: '40px', width: '40px', borderRadius: '50%', objectFit: 'cover' }}
                onError={e => { e.target.style.display = 'none'; }} />
              <div>
                <div style={{ color: '#1a2e5a', fontWeight: '700', fontSize: '1rem', lineHeight: 1.2 }}>QCU Cooperative</div>
                <div style={{ color: '#9ca3af', fontSize: '0.7rem' }}>Quezon City University</div>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center" style={{ gap: '32px' }}>
              <Link to="/shop" style={navLinkStyle('/shop')}>Shop</Link>
              <Link to="/about" style={navLinkStyle('/about')}>About Us</Link>
              <Link to="/contact" style={navLinkStyle('/contact')}>Contact</Link>
            </div>

            {/* Right Side */}
            <div className="hidden md:flex items-center" style={{ gap: '16px' }}>
              {/* Cart */}
              <Link to="/cart" style={{ position: 'relative', color: '#1a2e5a', textDecoration: 'none' }}>
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span style={{
                    position: 'absolute', top: '-8px', right: '-8px',
                    background: '#f5c518', color: '#1a2e5a', fontWeight: 'bold',
                    fontSize: '0.65rem', borderRadius: '50%', width: '18px', height: '18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {cartCount}
                  </span>
                )}
              </Link>

              {user ? (
                <div style={{ position: 'relative' }}>
                  <button onClick={() => setDropdownOpen(!dropdownOpen)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px',
                      background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '20px',
                      cursor: 'pointer', fontSize: '0.875rem',
                    }}>
                    <div style={{
                      width: '24px', height: '24px', borderRadius: '50%',
                      background: '#f5c518', color: '#1a2e5a',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: '800', fontSize: '0.75rem',
                    }}>
                      {user.first_name?.[0]?.toUpperCase()}
                    </div>
                    <span>{user.first_name}</span>
                    <ChevronDown size={14} />
                  </button>

                  {dropdownOpen && (
                    <>
                      <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setDropdownOpen(false)} />
                      <div style={{
                        position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                        width: '210px', background: 'white', borderRadius: '12px',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)', border: '1px solid #f0f0f0',
                        zIndex: 50, overflow: 'hidden',
                      }}>
                        {/* User Info Header */}
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid #f0f0f0' }}>
                          <p style={{ margin: 0, fontWeight: '700', color: '#1a2e5a', fontSize: '0.875rem' }}>
                            {user.first_name} {user.last_name}
                          </p>
                          <p style={{ margin: 0, color: '#9ca3af', fontSize: '0.72rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {user.email}
                          </p>
                        </div>

                        <Link to="/orders" onClick={() => setDropdownOpen(false)}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#374151', textDecoration: 'none', fontSize: '0.875rem' }}>
                          <Package size={15} /> My Orders
                        </Link>

                        {user.role === 'admin' && (
                          <Link to="/admin" onClick={() => setDropdownOpen(false)}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#d97706', textDecoration: 'none', fontSize: '0.875rem', fontWeight: '600' }}>
                            ⚙️ Admin Panel
                          </Link>
                        )}

                        <button onClick={handleAdminAccess}
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: '0.875rem' }}>
                          <Shield size={15} /> Administration
                        </button>

                        <div style={{ borderTop: '1px solid #f0f0f0' }}>
                          <button onClick={handleLogout}
                            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: '0.875rem' }}>
                            <LogOut size={15} /> Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={handleAdminAccess}
                    style={{ padding: '7px 14px', background: 'transparent', border: '1.5px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', color: '#6b7280', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={14} /> Admin
                  </button>
                  <Link to="/login"
                    style={{ padding: '8px 20px', background: '#1a2e5a', color: 'white', textDecoration: 'none', borderRadius: '8px', fontWeight: '600', fontSize: '0.875rem' }}>
                    Sign In
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile: Cart + Hamburger */}
            <div className="flex md:hidden items-center" style={{ gap: '16px' }}>
              <Link to="/cart" style={{ position: 'relative', color: '#1a2e5a', textDecoration: 'none' }}>
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#f5c518', color: '#1a2e5a', fontWeight: 'bold', fontSize: '0.65rem', borderRadius: '50%', width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
          <div className="md:hidden" style={{ background: 'white', borderTop: '1px solid #e5e7eb', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {[{ to: '/shop', label: 'Shop' }, { to: '/about', label: 'About Us' }, { to: '/contact', label: 'Contact' }].map(link => (
              <Link key={link.to} to={link.to} onClick={() => setMenuOpen(false)}
                style={{
                  padding: '10px 12px', borderRadius: '8px', textDecoration: 'none', fontWeight: '500',
                  background: location.pathname === link.to ? '#f0f4ff' : 'transparent',
                  color: location.pathname === link.to ? '#1a2e5a' : '#374151',
                }}>
                {link.label}
              </Link>
            ))}
            <div style={{ borderTop: '1px solid #f0f0f0', marginTop: '8px', paddingTop: '8px' }}>
              {user ? (
                <>
                  <p style={{ padding: '8px 12px', margin: 0, fontWeight: '700', color: '#1a2e5a', fontSize: '0.875rem' }}>
                    {user.first_name} {user.last_name}
                  </p>
                  <Link to="/orders" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 12px', color: '#374151', textDecoration: 'none', borderRadius: '8px' }}>My Orders</Link>
                  {user.role === 'admin' && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 12px', color: '#d97706', textDecoration: 'none', borderRadius: '8px', fontWeight: '600' }}>Admin Panel</Link>
                  )}
                  <button onClick={handleAdminAccess} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#6b7280', width: '100%', textAlign: 'left', borderRadius: '8px' }}>
                    <Shield size={14} /> Administration
                  </button>
                  <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 12px', background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444', width: '100%', textAlign: 'left', borderRadius: '8px' }}>
                    <LogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <>
                  <button onClick={handleAdminAccess} style={{ display: 'block', width: '100%', padding: '10px 12px', marginBottom: '8px', background: 'transparent', border: '1.5px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', color: '#6b7280', textAlign: 'left' }}>
                    ⚙️ Administration
                  </button>
                  <Link to="/login" onClick={() => setMenuOpen(false)} style={{ display: 'block', padding: '10px 16px', background: '#1a2e5a', color: 'white', textDecoration: 'none', borderRadius: '8px', textAlign: 'center', fontWeight: '600' }}>
                    Sign In
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  );
}