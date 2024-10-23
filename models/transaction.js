const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: [true, "type must have field"],
    enum: ["income", "expense"],
  },
  category: {
    type: String,
    required: [true, "must have category"],
  },
  amount: {
    type: Number,
    required: [true, "amount must have value"],
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  description: {
    type: String,
    required: [true, "transaction must have discription"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "USER",
    required: [true, "categorie must belog to user"],
  },
});

const Transaction = mongoose.model("TRANSACTIONS", transactionSchema);

module.exports = Transaction;
