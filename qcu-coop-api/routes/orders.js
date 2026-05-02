const router = require('express').Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { verifyToken } = require('./auth');

const { sendOrderApprovalEmail } = require('../config/mailer');
const crypto = require('crypto');

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

// Update the PUT /:id route:
router.put('/:id', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const { status, admin_note } = req.body;

  try {
    let updateData = { status, admin_note };

    // Generate action token when approving
    if (status === 'Approved') {
      updateData.actionToken = crypto.randomBytes(32).toString('hex');
    }

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true });

    // Reduce stock if approved
    if (status === 'Approved') {
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product_id, { $inc: { stock: -item.quantity } });
      }
      // Send email notification
      try {
        await sendOrderApprovalEmail(order, order.actionToken);
        console.log('Email sent to:', order.student_email);
      } catch (emailErr) {
        console.error('Email failed (order still approved):', emailErr.message);
      }
    }

    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// NEW: Handle email action clicks (Accept/Decline from email)
router.get('/action', async (req, res) => {
  const { token, action } = req.query;
  try {
    const order = await Order.findOne({ actionToken: token });
    if (!order) return res.redirect(`${process.env.FRONTEND_URL}/order-action?error=invalid`);

    if (order.status !== 'Approved') {
      return res.redirect(`${process.env.FRONTEND_URL}/order-action?error=already_processed`);
    }

    const newStatus = action === 'accept' ? 'Accepted' : 'Cancelled';
    await Order.findByIdAndUpdate(order._id, { status: newStatus, actionToken: '' });

    res.redirect(`${process.env.FRONTEND_URL}/order-action?status=${newStatus}&orderId=${order._id}`);
  } catch (err) {
    res.redirect(`${process.env.FRONTEND_URL}/order-action?error=server_error`);
  }
});

// NEW: Admin mark as completed or cancel
router.put('/:id/complete', verifyToken, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Admin only' });
  const order = await Order.findByIdAndUpdate(req.params.id, { status: 'Completed' }, { new: true });
  res.json(order);
});

module.exports = router;