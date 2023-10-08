const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  account: {
    accountNumber: { type: String },
    balance: { type: Number, default: 0 }
  },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  // Hash the password before saving
  try {
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
  // Pre-save hook to generate the account number
  if (!this.account.accountNumber) {
    this.account.accountNumber = generateAccountNumber();
  }
  next();
});

// Genarate Account Number Function
function generateAccountNumber() {
  const uuidInt = parseInt(uuidv4(), 16);
  const accountNumber = uuidInt.toString().slice(0, 6);
  return accountNumber;
}

const User = mongoose.model('User', userSchema);

module.exports = User;
