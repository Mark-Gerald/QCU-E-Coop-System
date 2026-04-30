export default function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Confirm', cancelText = 'Cancel', confirmColor = '#1a2e5a' }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop with blur */}
      <div
        onClick={onCancel}
        style={{
          position: 'fixed', inset: 0, zIndex: 998,
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal */}
      <div style={{
        position: 'fixed', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999, width: '100%', maxWidth: '400px', padding: '0 20px',
      }}>
        <div style={{
          background: 'white', borderRadius: '20px',
          boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
          overflow: 'hidden', animation: 'modalIn 0.2s ease',
        }}>
          {/* Icon Header */}
          <div style={{ background: '#1a2e5a', padding: '24px', textAlign: 'center' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              background: 'rgba(245,197,24,0.2)', border: '2px solid rgba(245,197,24,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 12px', fontSize: '1.5rem',
            }}>
              ⚙️
            </div>
            <h3 style={{ color: 'white', fontWeight: '800', margin: 0, fontSize: '1.1rem' }}>
              {title}
            </h3>
          </div>

          {/* Body */}
          <div style={{ padding: '24px 28px 28px' }}>
            <p style={{ color: '#374151', textAlign: 'center', lineHeight: '1.6', marginBottom: '24px', fontSize: '0.95rem' }}>
              {message}
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={onCancel}
                style={{
                  flex: 1, padding: '12px', borderRadius: '10px',
                  border: '1.5px solid #e5e7eb', background: 'white',
                  cursor: 'pointer', fontWeight: '600', color: '#6b7280',
                  fontSize: '0.9rem', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.target.style.background = '#f9fafb'}
                onMouseLeave={e => e.target.style.background = 'white'}
              >
                {cancelText}
              </button>
              <button
                onClick={onConfirm}
                style={{
                  flex: 1, padding: '12px', borderRadius: '10px',
                  border: 'none', background: confirmColor,
                  cursor: 'pointer', fontWeight: '700', color: 'white',
                  fontSize: '0.9rem', transition: 'all 0.2s',
                }}
                onMouseEnter={e => e.target.style.opacity = '0.9'}
                onMouseLeave={e => e.target.style.opacity = '1'}
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}