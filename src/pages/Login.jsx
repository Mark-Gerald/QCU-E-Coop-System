import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
    const [form, setForm] = useState({ student_id: '', password: '' })
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const res = await loginUser(form);
            login(res.data.token, res.data.user);
            navigate('/shop');
        } catch (err) {
            setError(err.response?.data?.error || 'Login Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a2e5a', marginBottom: '24px', textAlign: 'center' }}>QCU Coop Login</h2>
        {error && <p style={{ color: 'red', marginBottom: '12px' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Student ID (e.g. 25-0169)"
            value={form.student_id}
            onChange={e => setForm({ ...form, student_id: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{ width: '100%', padding: '10px', marginBottom: '16px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
          />
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          No account? <Link to="/register" style={{ color: '#1a2e5a', fontWeight: 'bold' }}>Register here</Link>
        </p>
      </div>
    </div>
  );
}