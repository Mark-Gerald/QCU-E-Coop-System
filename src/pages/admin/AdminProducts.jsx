import { useState, useEffect } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../../api';

const empty = { name: '', price: '', description: '', image_url: '', category: 'Uniforms', stock: '' };

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(empty);
  const [editing, setEditing] = useState(null);

  useEffect(() => { getProducts().then(res => setProducts(res.data)); }, []);

  const handleSave = async () => {
    if (editing) {
      const res = await updateProduct(editing, form);
      setProducts(prev => prev.map(p => p._id === editing ? res.data : p));
    } else {
      const res = await createProduct(form);
      setProducts(prev => [...prev, res.data]);
    }
    setForm(empty); setEditing(null);
  };

  const handleEdit = (p) => { setForm(p); setEditing(p._id); };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    setProducts(prev => prev.filter(p => p._id !== id));
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 16px' }}>
      <h1 style={{ color: '#1a2e5a' }}>Manage Products</h1>

      {/* Form */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginBottom: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <h3>{editing ? 'Edit Product' : 'Add New Product'}</h3>
        {['name','price','description','image_url','stock'].map(key => (
          <input key={key} placeholder={key.replace('_',' ')} value={form[key]}
            onChange={e => setForm({ ...form, [key]: e.target.value })}
            style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc', boxSizing: 'border-box' }} />
        ))}
        <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
          style={{ width: '100%', padding: '8px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #ccc' }}>
          <option>Uniforms</option>
          <option>School Supplies</option>
          <option>ID & Lanyards</option>
        </select>
        <button onClick={handleSave}
          style={{ padding: '10px 24px', background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          {editing ? 'Update Product' : 'Add Product'}
        </button>
      </div>

      {/* Product List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
        {products.map(p => (
          <div key={p._id} style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <img src={p.image_url || 'https://via.placeholder.com/220x140'} alt={p.name} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
            <div style={{ padding: '12px' }}>
              <h4 style={{ margin: '0 0 4px', color: '#1a2e5a' }}>{p.name}</h4>
              <p style={{ margin: 0, color: '#888', fontSize: '13px' }}>₱{p.price} | Stock: {p.stock}</p>
              <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                <button onClick={() => handleEdit(p)} style={{ flex: 1, padding: '6px', background: '#e8eaf0', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Edit</button>
                <button onClick={() => handleDelete(p._id)} style={{ flex: 1, padding: '6px', background: '#fee', color: 'red', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}