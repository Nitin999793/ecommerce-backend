const Cart = require("../models/Cart");


const addToCart = async (req, res) => {
  try {
    const { product, quantity } = req.body;

    const item = new Cart({
      product,
      quantity,
    });

    const saved = await item.save();
    res.status(201).json(saved);

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


const getCartItems = async (req, res) => {
  try {
    const items = await Cart.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


const deleteCartItem = async (req, res) => {
  try {
    const item = await Cart.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ msg: "Item not found" });
    }

    await item.deleteOne();
    res.json({ msg: "Deleted successfully" });

  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
};