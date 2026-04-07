const orderService=require("../service/orderService.js");

const createOrder = async(req,res)=>{
    const user=req.user;
    try {
        const raw =
            req.body?.shippingAddress ??
            req.body?.address ??
            req.body;

        if (!raw || typeof raw !== "object") {
            return res.status(400).send({ error: "shippingAddress is required" });
        }

        const zipVal = raw.zipCode ?? raw.zip;
        const zipCode = zipVal != null ? Number(zipVal) : undefined;
        const shippingAddress = {
            firstName: raw.firstName,
            lasttName: raw.lasttName ?? raw.lastName,
            streetAddress: raw.streetAddress ?? raw.address,
            city: raw.city ?? raw.cityName,
            state: raw.state,
            zipCode: (zipCode != null && !Number.isNaN(zipCode)) ? zipCode : zipVal,
            mobile: raw.mobile ?? raw.mobileNumber ?? raw.phoneNumber,
            _id: raw._id,
        };

        const createdOrder=await orderService.createOrder(user,shippingAddress);
        return res.status(201).send(createdOrder);
    } catch (error) {
        if (error?.name === "ValidationError") {
            return res.status(400).send({
                error: error.message,
                details: error.errors,
            });
        }
        return res.status(500).send({error:error.message})
        
    }
}
const findOrderById = async(req,res)=>{
    try {
        const order=await orderService.findOrderById(req.params.id);
        return res.status(200).send(order);
    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}

const orderHistory = async(req,res)=>{
    const user=req.user;
    try {
        const orders=await orderService.userOrderHistory(user._id);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({error:error.message})
        
    }
}

module.exports={createOrder,findOrderById,orderHistory};