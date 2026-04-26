const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { verifyToken } = require('./auth');

// POST place an order (student)
router.post('/', verifyToken, async (req, res) => {
  const order = new Order(req.body);
  await order.save();
  res.json(order);
});

// GET my orders (student - filtered by student_id)
router.get('/my', verifyToken, async (req, res) => {
  const orders = await Order.find({ student_id: req.user.student_id }).sort({ createdAt: -1 });
  res.json(orders);
});

// GET all orders (admin only)
router.get('/', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// PUT approve or decline order (admin only)
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const { status, admin_note } = req.body;

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status, admin_note },
    { new: true }
  );

  // If approved, reduce stock for each item
  if (status === 'Approved') {
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product_id, {
        $inc: { stock: -item.quantity }
      });
    }
  }

  res.json(order);
});

module.exports = router;