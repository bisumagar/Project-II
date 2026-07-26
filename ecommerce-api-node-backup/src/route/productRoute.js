const express = require("express");
const router=express.Router();

const productController=require("../controller/productController.js");
const { authenticate } = require("../middleware/authenticate.js");

// Public routes - anyone can browse products
router.get("/", productController.getAllProducts);
// Search is available only after sign-in
router.get("/search", authenticate, productController.searchProducts);
router.get("/id/:id", productController.findProductById);

module.exports=router;
