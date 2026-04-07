const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrders,
  getSingleOrder,
  deleteOrder,
  payOrder,
} = require("../controllers/orderController");


router.post("/", createOrder);


router.get("/", getOrders);


router.get("/:id", getSingleOrder);


router.delete("/:id", deleteOrder);


router.put("/:id/pay", payOrder);

module.exports = router;