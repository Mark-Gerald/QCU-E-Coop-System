import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ShoppingBag, Users, Star, ArrowRight } from 'lucide-react';

export default function Home({ cart }) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const cartCount = cart?.reduce((s, i) => s + i.quantity, 0) || 0;

  const categories = [
    { title: 'Uniforms', desc: 'Official QCU uniforms & PE attire', icon: '👕', color: '#eff6ff', border: '#bfdbfe' },
    { title: 'School Supplies', desc: 'Notebooks, pens, folders & more', icon: '📚', color: '#f0fdf4', border: '#bbf7d0' },
    { title: 'ID & Lanyards', desc: 'ID holders, lanyards & accessories', icon: '🪪', color: '#fffbeb', border: '#fde68a' },
  ];

  const stats = [
    { icon: <ShoppingBag size={28} style={{ color: '#f5c518' }} />, value: '50+', label: 'Products' },
    { icon: <Users size={28} style={{ color: '#f5c518' }} />, value: '1,000+', label: 'Students Served' },
    { icon: <Star size={28} style={{ color: '#f5c518' }} />, value: '98%', label: 'Satisfaction' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar cartCount={cartCount} />

      {/* Hero Section */}
      <section style={{
        position: 'relative', minHeight: '520px', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #0f1e3d 0%, #1a2e5a 50%, #2d4a8a 100%)',
        overflow: 'hidden',
      }}>
        {/* Background image overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/QCU_shots_1.png)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15,
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: '640px' }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ background: 'rgba(245,197,24,0.15)', border: '1px solid rgba(245,197,24,0.3)', color: '#f5c518', fontSize: '0.875rem', fontWeight: '500' }}>
              🎓 Official QCU Cooperative Store
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', color: 'white', lineHeight: 1.15, marginBottom: '20px' }}>
              Everything You Need for{' '}
              <span style={{ color: '#f5c518' }}>School Life</span>
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '32px' }}>
              Shop uniforms, supplies, and ID accessories from the QCU Cooperative — fast, easy, and picked up right on campus.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/shop')}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-transform hover:scale-105"
                style={{ background: '#f5c518', color: '#1a2e5a', border: 'none', cursor: 'pointer', fontSize: '1rem' }}>
                <ShoppingBag size={18} /> Shop Now
              </button>
              {!user && (
                <button onClick={() => navigate('/register')}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-colors"
                  style={{ background: 'transparent', color: 'white', border: '2px solid rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '1rem' }}>
                  Create Account
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: '#1a2e5a' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 divide-x" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            {stats.map(s => (
              <div key={s.label} className="flex flex-col items-center py-6 gap-1">
                {s.icon}
                <span style={{ color: 'white', fontWeight: '800', fontSize: '1.75rem' }}>{s.value}</span>
                <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ color: '#1a2e5a', fontWeight: '800', fontSize: '1.875rem', marginBottom: '8px' }}>Shop by Category</h2>
          <p style={{ color: '#6b7280', fontSize: '1rem' }}>Find exactly what you need for your QCU journey</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(cat => (
            <div key={cat.title} onClick={() => navigate(`/shop?category=${cat.title}`)}
              className="flex items-center gap-4 p-6 rounded-2xl cursor-pointer transition-all hover:shadow-md hover:-translate-y-1"
              style={{ background: cat.color, border: `1px solid ${cat.border}` }}>
              <div style={{ fontSize: '2rem' }}>{cat.icon}</div>
              <div style={{ flex: 1 }}>
                <h3 style={{ color: '#1a2e5a', fontWeight: '700', marginBottom: '4px' }}>{cat.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>{cat.desc}</p>
              </div>
              <ArrowRight size={18} style={{ color: '#9ca3af' }} />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}