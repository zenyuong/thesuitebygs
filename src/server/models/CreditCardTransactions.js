const mongoose = require("mongoose");

const creditCardTransactionsSchema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  transactionAmount: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

module.exports = mongoose.model(
  "CreditCardTransactions",
  creditCardTransactionsSchema
);
