import { Link } from 'react-router-dom';
import { MapPin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{ background: '#1a2e5a', color: 'white', marginTop: 'auto' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/qcu_logo.png" alt="QCU Logo"
                className="h-10 w-10 rounded-full object-cover"
                onError={e => { e.target.style.display = 'none'; }} />
              <div>
                <div style={{ fontWeight: '700', fontSize: '1rem' }}>QCU Cooperative</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Quezon City University</div>
              </div>
            </div>
            <p style={{ color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6' }}>
              Serving the QCU community with quality school supplies, uniforms, and accessories.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ color: '#f5c518', fontWeight: '600', marginBottom: '16px', fontSize: '0.95rem' }}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { to: '/shop', label: 'Shop' },
                { to: '/about', label: 'About Us' },
                { to: '/contact', label: 'Contact Us' },
                { to: '/orders', label: 'My Orders' },
              ].map(link => (
                <Link key={link.to} to={link.to}
                  style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.875rem', transition: 'color 0.2s' }}
                  className="hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ color: '#f5c518', fontWeight: '600', marginBottom: '16px', fontSize: '0.95rem' }}>Contact Us</h4>
            <div className="flex flex-col gap-3">
              <div className="flex items-start gap-2" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                <MapPin size={15} className="mt-0.5 flex-shrink-0" style={{ color: '#f5c518' }} />
                <span>Quezon City University, Batasan Hills, Quezon City</span>
              </div>
              <div className="flex items-center gap-2" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>
                <Mail size={15} style={{ color: '#f5c518' }} />
                <span>coop@qcu.edu.ph</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)', color: '#64748b', fontSize: '0.8rem' }}>
          <span>© 2026 QCU Cooperative. All rights reserved.</span>
          <span>Quezon City University — Est. 1994</span>
        </div>
      </div>
    </footer>
  );
}