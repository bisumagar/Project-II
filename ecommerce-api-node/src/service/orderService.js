const Address = require("../models/addressModel.js");
const OrderItem = require("../models/orderItems.js");
const Order = require("../models/orderModel.js");
const cartService=require("../service/cartService.js");


async function createOrder(user, shippAddress){
    let address;
    
    if(shippAddress._id){
        let existAddress=await Address.findById(shippAddress._id);
        if (existAddress) {
            address=existAddress;
        }

    }
    if(!address){
        address=new Address({
            ...shippAddress,
            user: user?._id,
        });
        await address.save();
        user.address.push(address._id);
        await user.save();
    }

    const cart=await cartService.findUserCart(user._id);
    if (!cart?.cartItems?.length) {
        throw new Error("Cart is empty. Add items before checkout.");
    }
    const orderItems=[];

    for (const item of cart.cartItems){
        const orderItem=new OrderItem({
            price:item.price,
            product:item.product,
            quantity:item.quantity,
            size:item.size,
            userId:item.userId,
            discountedPrice:item.discountedPrice 
        })
        const createdOrderItem=await orderItem.save();
        orderItems.push(createdOrderItem )
    }

    const createdOrder=new Order({
        user,
        orderItems,
        totalPrice:cart.totalPrice,
        totalDiscountedPrice:cart.totalDiscountedPrice,
        discount:cart.discount,
        totalItem:cart.totalItem,
        shippingAddress:address,
    })

    const savedOrder=await createdOrder.save();
    await cartService.clearUserCart(user._id);
    return await findOrderById(savedOrder._id);
}

async function confirmedOrder(orderId){
    const order=await findOrderById(orderId);

    order.orderStatus="CONFIRMED";

    return await order.save();

}
async function shipedOrder(orderId){
    const order=await findOrderById(orderId);

    order.orderStatus="SHIPPED";

    return await order.save();

}

async function deliverOrder(orderId){
    const order=await findOrderById(orderId);

    order.orderStatus="DELIVERED";

    return await order.save();

}
async function cancelledOrder(orderId){
    const order=await findOrderById(orderId);

    order.orderStatus="CANCELLED";

    return await order.save();

}
async function findOrderById(orderId){

    const order=await Order.findById(orderId)
    .populate("user")
    .populate({path:"orderItems",populate:{path:"product"}})
    .populate("shippingAddress")

    if (!order) {
        throw new Error("Order not found with id " + orderId);
    }
    return order;
}

async function userOrderHistory(userId){
    try {
        const orders=await Order.find({user:userId})
        .populate("user")
        .populate({path:"orderItems", populate:{path:"product"}})
        .populate("shippingAddress")
        .sort({ createdAt: -1 })
        .lean()

        return orders;
    } catch (error) {
        throw new Error (error.message)
        
    }
}

async function getAllOrders(){
    return await Order.find()
        .populate("user")
        .populate({path:"orderItems", populate:{path:"product"}})
        .populate("shippingAddress")
        .sort({ createdAt: -1 })
        .lean()

}

async function  deleteOrder(orderId){
    const order=await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports={ createOrder,confirmedOrder,shipedOrder,deliverOrder,cancelledOrder,findOrderById,userOrderHistory,getAllOrders,deleteOrder };