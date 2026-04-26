const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  student_id:  { type: String, required: true, unique: true },
  first_name:  { type: String, required: true },
  last_name:   { type: String, required: true },
  email:       { type: String, required: true },
  password:    { type: String, required: true },
  role:        { type: String, enum: ['student', 'admin'], default: 'student' },
}, { timestamps: true });

// Auto-hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model('User', UserSchema);