import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../api';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

export default function Shop({ cart, setCart }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(category).then(res => setProducts(res.data)).finally(() => setLoading(false));
  }, [category]);

  const addToCart = (product) => {
    if (!user) { navigate('/login'); return; }
    setCart(prev => {
      const exists = prev.find(i => i._id === product._id);
      const updated = exists
        ? prev.map(i => i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i)
        : [...prev, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updated));
      return updated;
    });
  };

  const categories = ['', 'Uniforms', 'School Supplies', 'ID & Lanyards'];

  return (
    <div>
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ color: '#1a2e5a', marginBottom: '24px' }}>QCU Coop Store</h1>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setCategory(cat)}
              style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                background: category === cat ? '#1a2e5a' : '#e8eaf0', color: category === cat ? 'white' : '#1a2e5a', fontWeight: '500' }}>
              {cat || 'All Products'}
            </button>
          ))}
        </div>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {products.map(product => (
              <div key={product._id} style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
                <img src={product.image_url || 'https://via.placeholder.com/240x180?text=No+Image'}
                  alt={product.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                <div style={{ padding: '16px' }}>
                  <span style={{ fontSize: '12px', background: '#e8eaf0', padding: '2px 8px', borderRadius: '10px', color: '#555' }}>{product.category}</span>
                  <h3 style={{ margin: '8px 0 4px', color: '#1a2e5a' }}>{product.name}</h3>
                  <p style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{product.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: '#1a2e5a', fontSize: '1.1rem' }}>₱{product.price}</span>
                    <span style={{ fontSize: '12px', color: product.stock > 0 ? 'green' : 'red' }}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </div>
                  <button onClick={() => addToCart(product)} disabled={product.stock === 0}
                    style={{ marginTop: '12px', width: '100%', padding: '10px', background: product.stock > 0 ? '#1a2e5a' : '#ccc',
                      color: 'white', border: 'none', borderRadius: '6px', cursor: product.stock > 0 ? 'pointer' : 'not-allowed', fontWeight: '500' }}>
                    {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}