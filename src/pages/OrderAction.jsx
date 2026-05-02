import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

export default function OrderAction() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const status = searchParams.get('status');
  const error = searchParams.get('error');

  const config = {
    Accepted: {
      icon: <CheckCircle size={56} style={{ color: '#059669' }} />,
      title: 'Order Accepted!',
      message: 'Thank you for confirming. Please pick up your order at the QCU Cooperative during operating hours.',
      color: '#059669', bg: '#d1fae5',
    },
    Cancelled: {
      icon: <XCircle size={56} style={{ color: '#dc2626' }} />,
      title: 'Order Cancelled',
      message: 'You have declined the order. If this was a mistake, please contact the QCU Cooperative.',
      color: '#dc2626', bg: '#fee2e2',
    },
    invalid: {
      icon: <AlertCircle size={56} style={{ color: '#d97706' }} />,
      title: 'Invalid Link',
      message: 'This action link is invalid or has already been used.',
      color: '#d97706', bg: '#fef3c7',
    },
    already_processed: {
      icon: <AlertCircle size={56} style={{ color: '#d97706' }} />,
      title: 'Already Processed',
      message: 'This order action has already been completed.',
      color: '#d97706', bg: '#fef3c7',
    },
  };

  const current = config[status || error] || config['invalid'];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0f1e3d, #1a2e5a)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <div style={{ background: 'white', borderRadius: '20px', padding: '48px 36px', maxWidth: '420px', width: '100%', textAlign: 'center', boxShadow: '0 24px 60px rgba(0,0,0,0.3)' }}>
        <div style={{ background: current.bg, width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
          {current.icon}
        </div>
        <h1 style={{ color: '#1a2e5a', fontWeight: '800', fontSize: '1.5rem', marginBottom: '12px' }}>{current.title}</h1>
        <p style={{ color: '#64748b', lineHeight: '1.6', marginBottom: '28px' }}>{current.message}</p>
        <button onClick={() => navigate('/')}
          style={{ width: '100%', padding: '13px', background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', fontSize: '1rem' }}>
          Back to Home
        </button>
      </div>
    </div>
  );
}