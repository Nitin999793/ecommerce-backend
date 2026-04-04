const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getSingleOrder,
  deleteOrder,
  payOrder,
} = require("../controllers/orderController");

// ➕ CREATE ORDER
// POST /api/orders
router.post("/", createOrder);

// 📥 GET ALL ORDERS
// GET /api/orders
router.get("/", getOrders);

// 📥 GET SINGLE ORDER
// GET /api/orders/:id
router.get("/:id", getSingleOrder);

// ❌ DELETE ORDER
// DELETE /api/orders/:id
router.delete("/:id", deleteOrder);

// 💰 MARK ORDER AS PAID
// PUT /api/orders/:id/pay
router.put("/:id/pay", payOrder);

module.exports = router;