const express = require("express");
const mongoose = require("mongoose");
const rateLimit = require("express-rate-limit");
require("dotenv").config(); // ✅ MUST BE AT TOP

const app = express();

// ✅ DEBUG (optional but helpful)
console.log("MONGO_URI:", process.env.MONGO_URI);

// ✅ MIDDLEWARE
app.use(express.json());

// ✅ RATE LIMITER
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100,
  message: {
    msg: "Too many requests, try again later",
  },
});
app.use(limiter);

// ✅ ROUTES
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/cart", require("./routes/cartRoutes"));

// ✅ HOME ROUTE
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ API DOCS
app.get("/api/docs", (req, res) => {
  res.json({
    message: "API Documentation",
    routes: {
      products: "/api/products",
      users: "/api/users",
      orders: "/api/orders",
      cart: "/api/cart",
    },
  });
});

// ✅ PORT (important for deployment)
const PORT = process.env.PORT || 5000;

// ✅ DATABASE CONNECTION + SERVER START
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Error:", err.message);
  });

