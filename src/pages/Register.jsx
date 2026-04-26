import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api";

export default function Register() {
    const [form, setForm] = useState({ student_id: '', first_name: '', last_name: '', email: '', password: ''});
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await registerUser(form);
            setSuccess('Registered successfully! Redirecting to login...');
            setTimeout(() => navigate('/login'), 2000);
        } catch (err){
            setError(err.response?.data?.error || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const field = (key, placeholder, type = 'text') => (
    <input
      type={type}
      placeholder={placeholder}
      value={form[key]}
      onChange={e => setForm({ ...form, [key]: e.target.value })}
      style={{ width: '100%', padding: '10px', marginBottom: '12px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }}
    />
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f0f4ff' }}>
      <div style={{ background: 'white', padding: '40px', borderRadius: '12px', width: '100%', maxWidth: '400px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
        <h2 style={{ color: '#1a2e5a', marginBottom: '24px', textAlign: 'center' }}>Student Registration</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <form onSubmit={handleSubmit}>
          {field('student_id', 'Student ID (e.g. 25-0169)')}
          {field('first_name', 'First Name')}
          {field('last_name', 'Last Name')}
          {field('email', 'Gmail Address', 'email')}
          {field('password', 'Password', 'password')}
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '6px', fontSize: '1rem', cursor: 'pointer' }}>
            {loading ? 'Registering...' : 'Create Account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px' }}>
          Already have an account? <Link to="/login" style={{ color: '#1a2e5a', fontWeight: 'bold' }}>Login</Link>
        </p>
      </div>
    </div>
  );
}