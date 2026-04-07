const Product = require("../models/Product");
const { validationResult } = require("express-validator");

const createProduct = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        msg: "Validation Failed",
        errors: errors.array(),
      });
    }

    const { name, price, description } = req.body;

    const product = new Product({
      name,
      price,
      description,
    });

    const saved = await product.save();

    res.status(201).json({
      msg: "Product created successfully",
      product: saved,
    });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json(updated);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.json({ msg: "Product deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};