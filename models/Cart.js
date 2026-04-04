const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: String,   // ✅ SIMPLE (no Product model error)
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
