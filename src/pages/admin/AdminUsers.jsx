import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Shield, GraduationCap } from 'lucide-react';
import API from '../../api';
import { useAuth } from '../../context/AuthContext';

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') { navigate('/admin/login'); return; }
    API.get('/users').then(res => setUsers(res.data)).finally(() => setLoading(false));
  }, [user]);

  const filtered = users.filter(u =>
    u.student_id?.toLowerCase().includes(search.toLowerCase()) ||
    u.first_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.last_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9' }}>
      <div style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '16px 32px', display: 'flex', alignItems: 'center', gap: '16px' }}>
        <Link to="/admin" style={{ color: '#64748b', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.875rem' }}>
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <h1 style={{ color: '#1a2e5a', fontWeight: '800', fontSize: '1.25rem', margin: 0 }}>User Management</h1>
      </div>

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ position: 'relative', marginBottom: '24px', maxWidth: '400px' }}>
          <input placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '10px 14px 10px 36px', borderRadius: '10px', border: '1.5px solid #e2e8f0', outline: 'none', boxSizing: 'border-box', background: 'white' }} />
        </div>

        <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: '700', color: '#1a2e5a' }}>All Users ({filtered.length})</span>
            <span style={{ fontSize: '0.8rem', color: '#64748b' }}>Admin accounts are managed via database</span>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>Loading users...</p>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px' }}>
              <Users size={40} style={{ color: '#d1d5db', margin: '0 auto 12px' }} />
              <p style={{ color: '#94a3b8' }}>No users found.</p>
            </div>
          ) : filtered.map((u, i) => (
            <div key={u._id} style={{ display: 'flex', alignItems: 'center', padding: '16px 20px', borderBottom: i < filtered.length - 1 ? '1px solid #f1f5f9' : 'none', gap: '16px' }}>
              <div style={{
                width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem', flexShrink: 0,
                background: u.role === 'admin' ? '#fef3c7' : '#e8edf5',
                color: u.role === 'admin' ? '#d97706' : '#1a2e5a',
              }}>
                {u.first_name?.[0]?.toUpperCase()}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: '700', color: '#0f172a', fontSize: '0.9rem' }}>{u.first_name} {u.last_name}</p>
                <p style={{ margin: 0, color: '#64748b', fontSize: '0.8rem' }}>{u.email} · {u.student_id}</p>
              </div>
              <span style={{
                display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700',
                background: u.role === 'admin' ? '#fef3c7' : '#e8edf5',
                color: u.role === 'admin' ? '#d97706' : '#1a2e5a',
              }}>
                {u.role === 'admin' ? <><Shield size={12} /> Admin</> : <><GraduationCap size={12} /> Student</>}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}