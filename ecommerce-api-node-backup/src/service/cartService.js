const CartItem = require("../models/cartItemModel");
const Cart = require("../models/cartModel");
const Product = require("../models/productModel");

async function createCart(user) {
    try {
        const cart = new Cart({ user });
        const createdCart = await cart.save();
        return createdCart;


    } catch (error) {
        throw new Error(error.message);

    }

}

async function findUserCart(userId) {
    try {
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            // Create empty cart if doesn't exist
            cart = new Cart({ user: userId });
            await cart.save();
        }
        let cartItems = await CartItem.find({ cart: cart._id }).populate("product");
        cart.cartItems = cartItems;
        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;

        for (let cartItem of cart.cartItems) {
            totalPrice += cartItem.price;
            totalDiscountedPrice += cartItem.discountedPrice;
            totalItem += cartItem.quantity;
        }

        cart.totalPrice = totalPrice;
        cart.totalDiscountedPrice = totalDiscountedPrice;
        cart.totalItem = totalItem;
        cart.discount = totalPrice - totalDiscountedPrice;

        return cart;



    } catch (error) {
        throw new Error(error.message)

    }
}

async function addCartItem(userId, req) {
    try {
        // Find or create cart
        let cart = await Cart.findOne({ user: userId });
        if (!cart) {
            cart = new Cart({ user: userId });
            await cart.save();
        }

        // Validate product exists
        if (!req.productId) {
            throw new Error("productId is required");
        }
        const product = await Product.findById(req.productId);
        if (!product) {
            throw new Error("Product not found");
        }

        // Check if item already exists in cart
        const isPresent = await CartItem.findOne({ 
            cart: cart._id, 
            product: product._id, 
            userId 
        });

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice,
            });

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return "Item added to cart!";
        } else {
            // Item already exists - increment quantity
            isPresent.quantity += 1;
            isPresent.price = isPresent.quantity * product.price;
            isPresent.discountedPrice = isPresent.quantity * product.discountedPrice;
            await isPresent.save();
            return "Item quantity updated in cart!";
        }
    } catch (error) {
        throw new Error(error.message);
    }
}

async function clearUserCart(userId) {
    try {
        const cart = await Cart.findOne({ user: userId });
        if (!cart) return;
        await CartItem.deleteMany({ cart: cart._id });
        cart.cartItems = [];
        cart.totalPrice = 0;
        cart.totalDiscountedPrice = 0;
        cart.totalItem = 0;
        cart.discount = 0;
        await cart.save();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = { createCart, findUserCart, addCartItem, clearUserCart };