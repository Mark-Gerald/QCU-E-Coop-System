import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Target, Heart, Award, Users, BookOpen, Tag } from 'lucide-react';

export default function About() {
  const values = [
    { icon: <Award size={24} style={{ color: '#3b82f6' }} />, label: 'Excellence', bg: '#eff6ff' },
    { icon: <Heart size={24} style={{ color: '#ef4444' }} />, label: 'Service', bg: '#fef2f2' },
    { icon: <Users size={24} style={{ color: '#22c55e' }} />, label: 'Community', bg: '#f0fdf4' },
    { icon: <Target size={24} style={{ color: '#f5c518' }} />, label: 'Integrity', bg: '#fffbeb' },
  ];

  const offerings = [
    { icon: <span style={{ fontSize: '2rem' }}>👕</span>, title: 'Uniforms', desc: 'Official QCU uniforms, PE attire, and department-specific clothing at competitive prices.' },
    { icon: <BookOpen size={32} style={{ color: '#22c55e' }} />, title: 'School Supplies', desc: 'Notebooks, pens, folders, art materials, and all academic essentials.' },
    { icon: <Tag size={32} style={{ color: '#f5c518' }} />, title: 'ID & Lanyards', desc: 'ID card holders, lanyards, and personalized accessories for QCU students.' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />

      {/* Hero */}
      <section style={{
        position: 'relative', padding: '80px 20px', textAlign: 'center',
        background: 'linear-gradient(135deg, #0f1e3d 0%, #1a2e5a 100%)', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/QCU_shots_2.png)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.12,
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ color: 'white', fontWeight: '800', fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', marginBottom: '12px' }}>
            About QCU Cooperative
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
            Serving the Quezon City University community since 1994
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              icon: <Target size={28} style={{ color: 'white' }} />,
              iconBg: '#1a2e5a',
              title: 'Our Mission',
              text: 'To provide quality, affordable school supplies, uniforms, and accessories to QCU students, faculty, and staff — promoting a cooperative spirit of service and community within the university.',
            },
            {
              icon: <Heart size={28} style={{ color: 'white' }} />,
              iconBg: '#f5c518',
              title: 'Our Vision',
              text: 'To be the leading student cooperative in Metro Manila, recognized for excellence in service, integrity in operations, and commitment to the welfare of the QCU academic community.',
            },
          ].map(card => (
            <div key={card.title} style={{
              background: 'white', borderRadius: '16px', padding: '32px',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)', border: '1px solid #f0f0f0',
            }}>
              <div style={{
                width: '52px', height: '52px', borderRadius: '12px',
                background: card.iconBg, display: 'flex', alignItems: 'center',
                justifyContent: 'center', marginBottom: '20px',
              }}>
                {card.icon}
              </div>
              <h3 style={{ color: '#1a2e5a', fontWeight: '700', fontSize: '1.25rem', marginBottom: '12px' }}>
                {card.title}
              </h3>
              <p style={{ color: '#6b7280', lineHeight: '1.7', fontSize: '0.95rem' }}>{card.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What We Offer */}
      <section style={{ background: '#f8f9fa', padding: '64px 20px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 style={{ textAlign: 'center', color: '#1a2e5a', fontWeight: '800', fontSize: '1.875rem', marginBottom: '40px' }}>
            What We Offer
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offerings.map(item => (
              <div key={item.title} style={{
                background: 'white', borderRadius: '16px', padding: '32px',
                textAlign: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
              }}>
                <div style={{ marginBottom: '16px' }}>{item.icon}</div>
                <h3 style={{ color: '#1a2e5a', fontWeight: '700', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campus Photo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div style={{ borderRadius: '20px', overflow: 'hidden', maxHeight: '300px' }}>
          <img src="/QCU_shots_2.png" alt="QCU Campus"
            style={{ width: '100%', height: '300px', objectFit: 'cover', objectPosition: 'center 60%' }}
            onError={e => { e.target.style.display = 'none'; }} />
        </div>
      </section>

      {/* Core Values */}
      <section style={{ background: '#f8f9fa', padding: '64px 20px' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <h2 style={{ textAlign: 'center', color: '#1a2e5a', fontWeight: '800', fontSize: '1.875rem', marginBottom: '40px' }}>
            Our Core Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map(v => (
              <div key={v.label} style={{
                background: v.bg, borderRadius: '16px', padding: '28px 16px',
                textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>{v.icon}</div>
                <p style={{ color: '#1a2e5a', fontWeight: '600', fontSize: '0.95rem' }}>{v.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}