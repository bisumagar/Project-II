const Address = require("../models/addressModel.js");
const OrderItem = require("../models/orderItems.js");
const Order = require("../models/orderModel.js");
const Product = require("../models/productModel.js");
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

    // Prevent stock deduction from running multiple times.
    if (order.orderStatus === "DELIVERED") {
        return order;
    }

    for (const item of order.orderItems || []) {
        const productId = item?.product?._id || item?.product;
        if (!productId) continue;

        const product = await Product.findById(productId);
        if (!product) continue;

        const soldQty = Math.max(Number(item.quantity) || 0, 0);
        const sizeName = String(item.size || "").trim();

        // Decrease total stock safely.
        product.quantity = Math.max((Number(product.quantity) || 0) - soldQty, 0);

        // Decrease size-wise stock when that size exists.
        if (sizeName && Array.isArray(product.sizes)) {
            const idx = product.sizes.findIndex(
                (s) => String(s?.name || "").trim().toLowerCase() === sizeName.toLowerCase()
            );
            if (idx >= 0) {
                const current = Number(product.sizes[idx].quantity) || 0;
                product.sizes[idx].quantity = Math.max(current - soldQty, 0);
            }
        }

        await product.save();
    }

    order.orderStatus="DELIVERED";
    order.deliveryDate = new Date();

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

async function getOrderAnalytics() {
    const orders = await Order.find()
        .populate({
            path: "orderItems",
            populate: {
                path: "product",
                populate: { path: "category" },
            },
        })
        .sort({ createdAt: -1 })
        .lean();

    const now = new Date();
    const dayAgo = new Date(now);
    dayAgo.setDate(now.getDate() - 1);
    const weekAgo = new Date(now);
    weekAgo.setDate(now.getDate() - 7);
    const monthAgo = new Date(now);
    monthAgo.setDate(now.getDate() - 30);

    const productSales = new Map();
    const brandRevenue = new Map();
    const categoryRevenue = new Map();

    let dayRevenue = 0;
    let weekRevenue = 0;
    let monthRevenue = 0;
    let dayOrders = 0;
    let weekOrders = 0;
    let monthOrders = 0;

    let totalOrders = 0;
    let deliveredOrders = 0;
    let cancelledOrders = 0;
    let placedOrders = 0;
    let shippedOrders = 0;
    let confirmedOrders = 0;

    for (const order of orders) {
        const status = String(order?.orderStatus || "").toUpperCase();
        const createdAt = new Date(order?.createdAt || order?.orderDate || now);
        const orderRevenue = Number(order?.totalDiscountedPrice ?? order?.totalPrice ?? 0) || 0;
        const isDelivered = status === "DELIVERED";

        totalOrders += 1;
        if (status === "DELIVERED") deliveredOrders += 1;
        if (status === "CANCELLED") cancelledOrders += 1;
        if (status === "PLACED" || status === "PENDING") placedOrders += 1;
        if (status === "SHIPPED") shippedOrders += 1;
        if (status === "CONFIRMED") confirmedOrders += 1;

        if (isDelivered) {
            if (createdAt >= dayAgo) {
                dayRevenue += orderRevenue;
                dayOrders += 1;
            }
            if (createdAt >= weekAgo) {
                weekRevenue += orderRevenue;
                weekOrders += 1;
            }
            if (createdAt >= monthAgo) {
                monthRevenue += orderRevenue;
                monthOrders += 1;
            }
        }

        for (const orderItem of order?.orderItems || []) {
            const product = orderItem?.product;
            if (!product || !isDelivered) continue;

            const qty = Number(orderItem?.quantity || 0) || 0;
            const amount =
                (Number(orderItem?.discountedPrice ?? orderItem?.price ?? product?.discountedPrice ?? product?.price ?? 0) || 0) *
                qty;

            const productId = String(product?._id || "");
            const currentProduct = productSales.get(productId) || {
                productId,
                title: product?.title || "Untitled",
                soldQty: 0,
                revenue: 0,
            };
            currentProduct.soldQty += qty;
            currentProduct.revenue += amount;
            productSales.set(productId, currentProduct);

            const brandKey = product?.brand || "Unknown";
            brandRevenue.set(brandKey, (brandRevenue.get(brandKey) || 0) + amount);

            const categoryKey = product?.category?.name || "Uncategorized";
            categoryRevenue.set(categoryKey, (categoryRevenue.get(categoryKey) || 0) + amount);
        }
    }

    const topSellingProducts = Array.from(productSales.values())
        .sort((a, b) => (b.soldQty - a.soldQty) || (b.revenue - a.revenue))
        .slice(0, 5);

    const lowPerformingProducts = Array.from(productSales.values())
        .sort((a, b) => (a.soldQty - b.soldQty) || (a.revenue - b.revenue))
        .slice(0, 5);

    const revenueByBrand = Array.from(brandRevenue.entries())
        .map(([brand, revenue]) => ({ brand, revenue }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

    const revenueByCategory = Array.from(categoryRevenue.entries())
        .map(([category, revenue]) => ({ category, revenue }))
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 10);

    const conversionRate = totalOrders > 0 ? (deliveredOrders / totalOrders) * 100 : 0;
    const cancellationRate = totalOrders > 0 ? (cancelledOrders / totalOrders) * 100 : 0;

    return {
        salesByPeriod: {
            day: { revenue: dayRevenue, orders: dayOrders },
            week: { revenue: weekRevenue, orders: weekOrders },
            month: { revenue: monthRevenue, orders: monthOrders },
        },
        topSellingProducts,
        lowPerformingProducts,
        revenueByCategory,
        revenueByBrand,
        orderConversionMetrics: {
            totalOrders,
            deliveredOrders,
            cancelledOrders,
            confirmedOrders,
            shippedOrders,
            placedOrders,
            conversionRate,
            cancellationRate,
        },
    };
}

async function  deleteOrder(orderId){
    const order=await findOrderById(orderId);
    await Order.findByIdAndDelete(order._id);
}

module.exports={ createOrder,confirmedOrder,shipedOrder,deliverOrder,cancelledOrder,findOrderById,userOrderHistory,getAllOrders,getOrderAnalytics,deleteOrder };