const express = require("express");
const router=express.Router();

const productController=require("../controller/productController.js");

// Public routes - anyone can browse products
router.get("/", productController.getAllProducts);
router.get("/id/:id", productController.findProductById);

module.exports=router;