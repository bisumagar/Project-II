const express = require("express");
const router=express.Router();

const cartController=require("../controller/cartController.js");
const { authenticate }=require("../middleware/authenticate.js")

router.get("/",authenticate,cartController.findUserCart);
router.put("/",authenticate, cartController.addItemToCart);
router.put("/add",authenticate, cartController.addItemToCart);

module.exports=router;