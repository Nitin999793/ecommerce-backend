const Order = require("../models/Order");

// ➕ CREATE ORDER
const createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    const order = new Order({
      productId,
      quantity,
    });

    const saved = await order.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📥 GET ALL ORDERS
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📥 GET SINGLE ORDER
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json(order);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ DELETE ORDER
const deleteOrder = async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.json({ msg: "Order deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 💰 MARK ORDER AS PAID
const payOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ msg: "Order not found" });
    }

    order.isPaid = true;
    order.paidAt = new Date();

    const updated = await order.save();

    res.json(updated);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createOrder,
  getOrders,
  getSingleOrder,
  deleteOrder,
  payOrder,
};