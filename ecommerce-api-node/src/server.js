const express = require("express");
const path = require("path");
const { connectDB } = require("./config/db");
require("dotenv").config();

const authRoute = require("./route/authRoute");
const userRoute = require("./route/userRoute");
const productRoute = require("./route/productRoute");
const cartRoute = require("./route/cartRoute");
const cartItemRoute = require("./route/cartItemRoute");
const orderRoute = require("./route/orderRoute");
const adminOrderRoute = require("./route/adminOrderRoute");
const adminProductRoute = require("./route/adminProductRoute");
const ratingRoute = require("./route/ratingRoute");
const reviewRoute = require("./route/reviewRoute");

const app = express();

app.use(express.json());
const Port = process.env.PORT || 5454;
// Mount all API routes BEFORE the catch-all
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/cartItems", cartItemRoute);
app.use("/api/orders", orderRoute);
app.use("/api/admin/orders", adminOrderRoute);
app.use("/api/admin/products", adminProductRoute);
app.use("/api/ratings", ratingRoute);
app.use("/api/reviews", reviewRoute);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "../../E-commerce/dist")));

// Catch-all: send index.html for any non-API route (so React Router works)
app.get(/^(?!\/api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, "../../E-commerce/dist/index.html"));
});

const PORT = 5454;
app.listen(PORT, async () => {
  await connectDB();
  console.log("E-commerce api listening on PORT", Port);
});