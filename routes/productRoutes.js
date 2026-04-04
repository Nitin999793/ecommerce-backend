const express = require("express");
const router = express.Router();
const { body } = require("express-validator");

// ✅ Controllers
const {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// ✅ Auth Middleware
const protect = require("../Middleware/authMiddleware");

// ➕ CREATE PRODUCT (Protected + Validation)
router.post(
  "/",
  protect,
  [
    body("name")
      .notEmpty()
      .withMessage("Product name is required")
      .isLength({ min: 3 })
      .withMessage("Name must be at least 3 characters"),

    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number"),

    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ],
  createProduct
);

// 📥 GET ALL PRODUCTS (Public)
router.get("/", getProducts);

// ✏️ UPDATE PRODUCT (Protected)
router.put("/:id", protect, updateProduct);

// ❌ DELETE PRODUCT (Protected)
router.delete("/:id", protect, deleteProduct);

module.exports = router;