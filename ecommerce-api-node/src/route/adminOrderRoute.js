const express = require("express");
const router=express.Router();

const orderController=require("../controller/adminController.js");
const { authenticate, requireAdmin }=require("../middleware/authenticate.js")

router.get("/", authenticate, requireAdmin, orderController.getAllOrders);
router.put("/:orderId/confirmed", authenticate, requireAdmin, orderController.confirmedOrders);
router.put("/:orderId/ship", authenticate, requireAdmin, orderController.shippOrders);
router.put("/:orderId/deliver", authenticate, requireAdmin, orderController.deliverOrders);
router.put("/:orderId/cancel", authenticate, requireAdmin, orderController.cancelledOrders);
router.put("/:orderId/delete", authenticate, requireAdmin, orderController.deleteOrders);

module.exports=router;


