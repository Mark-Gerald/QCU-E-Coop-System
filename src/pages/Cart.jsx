import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { placeOrder } from '../api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

export default function Cart({ cart, setCart }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const updateQty = (id, qty) => {
    const updated = qty < 1
      ? cart.filter(i => i._id !== id)
      : cart.map(i => i._id === id ? { ...i, quantity: qty } : i);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handleOrder = async () => {
    if (!user) { navigate('/login'); return; }
    setLoading(true);
    await placeOrder({
      student_id: user.student_id,
      student_name: `${user.first_name} ${user.last_name}`,
      student_email: user.email,
      items: cart.map(i => ({ product_id: i._id, product_name: i.name, price: i.price, quantity: i.quantity, subtotal: i.price * i.quantity })),
      total_amount: total,
    });
    setCart([]);
    localStorage.removeItem('cart');
    setSuccess(true);
    setLoading(false);
  };

  if (success) return (
    <div>
      <Navbar />
      <div style={{ textAlign: 'center', padding: '80px 20px' }}>
        <h2 style={{ color: 'green' }}>✅ Order Placed Successfully!</h2>
        <p>Your order is now pending admin approval.</p>
        <button onClick={() => navigate('/orders')} style={{ marginTop: '16px', padding: '10px 24px', background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
          View My Orders
        </button>
      </div>
    </div>
  );

  return (
    <div>
      <Navbar cartCount={cart.reduce((s, i) => s + i.quantity, 0)} />
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ color: '#1a2e5a' }}>Shopping Cart</h1>
        {cart.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px' }}>
            <p>Your cart is empty.</p>
            <button onClick={() => navigate('/shop')} style={{ padding: '10px 24px', background: '#1a2e5a', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
              Go to Shop
            </button>
          </div>
        ) : (
          <>
            {cart.map(item => (
              <div key={item._id} style={{ display: 'flex', gap: '16px', alignItems: 'center', padding: '16px', background: 'white', borderRadius: '10px', marginBottom: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <img src={item.image_url || 'https://via.placeholder.com/80'} alt={item.name} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: 0, color: '#1a2e5a' }}>{item.name}</h3>
                  <p style={{ margin: '4px 0', color: '#888' }}>₱{item.price} each</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button onClick={() => updateQty(item._id, item.quantity - 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer', background: 'white' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item._id, item.quantity + 1)} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1px solid #ccc', cursor: 'pointer', background: 'white' }}>+</button>
                </div>
                <span style={{ fontWeight: 'bold', minWidth: '70px', textAlign: 'right' }}>₱{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div style={{ background: 'white', padding: '20px', borderRadius: '10px', marginTop: '16px', textAlign: 'right' }}>
              <h3>Total: ₱{total.toFixed(2)}</h3>
              <button onClick={handleOrder} disabled={loading}
                style={{ padding: '12px 32px', background: '#f5c518', color: '#1a2e5a', border: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}