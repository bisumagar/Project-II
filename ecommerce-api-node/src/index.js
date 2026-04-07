const express=require("express")

const cors=require("cors")

const app=express();

app.use(express.json())

app.use(cors())

app.get("/",(req,res)=>{
    return res.status(200).send({
        message: "Welcom to Ecommerce api-node",
        status:true
    })
})

const authRouters=require("./route/authRoute.js")
app.use("/auth",authRouters);
app.use("/api/auth",authRouters);

const userRouters=require("./route/userRoute.js")
app.use("/api/users",userRouters);

const productRouter=require("./route/productRoute.js")
app.use("/api/products",productRouter);

const adminProductRouter=require("./route/adminProductRoute.js")
app.use("/api/admin/products",adminProductRouter);

const cartRouter=require("./route/cartRoute.js")
app.use("/api/cart",cartRouter);

const cartItemRouter=require("./route/cartItemRoute.js")
app.use("/api/cart_items",cartItemRouter);

const orderRouter=require("./route/orderRoute.js")
app.use("/api/orders",orderRouter);

const adminOrderRouter=require("./route/adminOrderRoute.js")
app.use("/api/admin/orders",adminOrderRouter);

const reviewRouter=require("./route/reviewRoute.js")
app.use("/api/reviews",reviewRouter);

const ratingRouter=require("./route/ratingRoute.js")
app.use("/api/ratings",ratingRouter);


module.exports=app;