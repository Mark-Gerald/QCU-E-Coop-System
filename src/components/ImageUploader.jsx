import { useState, useRef } from 'react';
import { Upload, X, Image } from 'lucide-react';
import { uploadImage } from '../api';

export default function ImageUploader({ value, onChange }) {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const fileRef = useRef();

  const handleFile = async (file) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.');
      return;
    }
    setUploading(true);
    setError('');
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadImage(formData);
      onChange(res.data.url);
    } catch {
      setError('Upload failed. Please try again or use a URL.');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        onClick={() => fileRef.current.click()}
        onDragOver={e => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        style={{
          border: `2px dashed ${dragging ? '#1a2e5a' : '#e2e8f0'}`,
          borderRadius: '12px', padding: '24px', textAlign: 'center',
          cursor: 'pointer', transition: 'all 0.2s',
          background: dragging ? '#f0f4ff' : '#f8fafc',
          marginBottom: '12px',
        }}
      >
        {uploading ? (
          <div>
            <div style={{ width: '32px', height: '32px', border: '3px solid #e5e7eb', borderTopColor: '#1a2e5a', borderRadius: '50%', margin: '0 auto 8px', animation: 'spin 0.8s linear infinite' }} />
            <p style={{ color: '#64748b', margin: 0, fontSize: '0.875rem' }}>Uploading...</p>
          </div>
        ) : value ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={value} alt="Preview" style={{ maxHeight: '120px', maxWidth: '100%', borderRadius: '8px', objectFit: 'cover' }} />
            <button
              onClick={e => { e.stopPropagation(); onChange(''); }}
              style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', border: 'none', borderRadius: '50%', width: '24px', height: '24px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <>
            <Upload size={28} style={{ color: '#94a3b8', margin: '0 auto 8px' }} />
            <p style={{ color: '#374151', fontWeight: '600', margin: '0 0 4px', fontSize: '0.875rem' }}>
              Click to upload or drag & drop
            </p>
            <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.75rem' }}>PNG, JPG, WebP up to 5MB</p>
          </>
        )}
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
          onChange={e => handleFile(e.target.files[0])} />
      </div>

      {/* URL Input fallback */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
        <span style={{ color: '#94a3b8', fontSize: '0.75rem' }}>or paste URL</span>
        <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
      </div>
      <input
        placeholder="https://example.com/image.jpg"
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '0.875rem', outline: 'none', boxSizing: 'border-box' }}
        onFocus={e => e.target.style.borderColor = '#1a2e5a'}
        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
      />
      {error && <p style={{ color: '#ef4444', fontSize: '0.75rem', marginTop: '4px' }}>{error}</p>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}