import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Home({ cart }) {
  const navigate = useNavigate();
  const cartCount = cart?.reduce((s, i) => s + i.quantity, 0) || 0;

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <div style={{ background: 'linear-gradient(135deg, #1a2e5a 0%, #2d4a8a 100%)', color: 'white', textAlign: 'center', padding: '80px 20px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>QCU Cooperative Store</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.85, marginBottom: '32px' }}>
          Your one-stop shop for uniforms, school supplies, and IDs
        </p>
        <button onClick={() => navigate('/shop')}
          style={{ padding: '14px 36px', background: '#f5c518', color: '#1a2e5a', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
          Shop Now
        </button>
      </div>

      <div style={{ maxWidth: '1000px', margin: '60px auto', padding: '0 16px' }}>
        <h2 style={{ textAlign: 'center', color: '#1a2e5a', marginBottom: '32px' }}>What We Offer</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { title: 'Uniforms', icon: '👕', desc: 'Official QCU uniforms for all departments' },
            { title: 'School Supplies', icon: '📚', desc: 'Everything you need for your classes' },
            { title: 'ID & Lanyards', icon: '🪪', desc: 'Official student IDs and accessories' },
          ].map(cat => (
            <div key={cat.title} onClick={() => navigate('/shop')}
              style={{ background: 'white', borderRadius: '12px', padding: '28px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', cursor: 'pointer' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>{cat.icon}</div>
              <h3 style={{ color: '#1a2e5a', marginBottom: '8px' }}>{cat.title}</h3>
              <p style={{ color: '#666', fontSize: '14px' }}>{cat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}