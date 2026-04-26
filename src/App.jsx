import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';

export default function App() {
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem('cart') || '[]'); } catch { return []; }
  });

  const sharedProps = { cart, setCart };

  return (
    <Router>
      <Routes>
        <Route path="/"                element={<Home {...sharedProps} />} />
        <Route path="/shop"            element={<Shop {...sharedProps} />} />
        <Route path="/cart"            element={<Cart {...sharedProps} />} />
        <Route path="/orders"          element={<Orders />} />
        <Route path="/login"           element={<Login />} />
        <Route path="/register"        element={<Register />} />
        <Route path="/admin"           element={<AdminDashboard />} />
        <Route path="/admin/products"  element={<AdminProducts />} />
        <Route path="/admin/orders"    element={<AdminOrders />} />
      </Routes>
    </Router>
  );
}