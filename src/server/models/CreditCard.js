const mongoose = require("mongoose");

const creditCardSchema = new mongoose.Schema({
  interestRate: {
    type: Number,
    required: true,
  },
  annualFee: {
    type: Number,
    required: true,
  },
  balanceTransferFee: {
    type: Number,
    required: true,
  },
  signupBonus: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("CreditCard", creditCardSchema);
