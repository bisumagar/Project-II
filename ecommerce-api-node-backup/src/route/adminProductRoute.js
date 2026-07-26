const express = require("express");
const router=express.Router();


const productController=require("../controller/productController.js")
const { authenticate, requireAdmin }=require("../middleware/authenticate.js")

router.post("/", authenticate, requireAdmin, productController.createProduct);
router.post("/creates", authenticate, requireAdmin, productController.createMultipleProduct);
router.delete("/:id", authenticate, requireAdmin, productController.deleteProduct);
router.put("/:id", authenticate, requireAdmin, productController.updateProduct);

module.exports=router;