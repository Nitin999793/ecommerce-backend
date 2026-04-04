const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  productId: String,
  quantity: Number,

  isPaid: {
    type: Boolean,
    default: false,
  },
  paidAt: Date,
});

module.exports = mongoose.model("Order", orderSchema);