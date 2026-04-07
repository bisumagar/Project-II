import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { get } from "../../../State/Cart/Action";
import CartItem from "./CartItem";

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    useEffect(() => {
        dispatch(get());
    }, [dispatch]);

    const handleCheckOut = () => {
        navigate("/checkout?step=2");
    };

    const items = Array.isArray(cartItems) ? cartItems : [];

    // Calculate dynamic prices based on cart items
    const calculatePrices = () => {
        let totalOriginalPrice = 0; // Sum of original prices
        let totalDiscountedPrice = 0; // Sum of discounted prices

        items.forEach((item) => {
            const product = item?.product || item;
            const discountedPrice = product?.discountedPrice ?? product?.discounted_price ?? product?.price ?? 0;
            const originalPrice = product?.price ?? product?.original_price ?? discountedPrice;
            const quantity = item?.quantity ?? 1;
            
            totalOriginalPrice += originalPrice * quantity;
            totalDiscountedPrice += discountedPrice * quantity;
        });

        const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
        const deliveryCharge = 0; // Free delivery
        const totalAmount = totalDiscountedPrice + deliveryCharge;

        return {
            totalPrice: totalOriginalPrice,
            totalDiscount,
            deliveryCharge,
            totalAmount
        };
    };

    const { totalPrice, totalDiscount, deliveryCharge, totalAmount } = calculatePrices();

    return (
        <div>

            <div className="lg:grid grid-cols-3 lg: px-16 relative">
                <div className="col-span-2 space-y-4"> 
                    {items.length > 0 ? items.map((item) => <CartItem key={item.id || item._id || item.productId} item={item} />) : (
                        <p className="text-gray-500 py-8">Your cart is empty.</p>
                    )}

                </div>
                    <div className="px-5 sticky top-0 h-screen mt-5 lg:mt-0 ">
                        <div className="border border-gray-400 ">
                            <p className="uppercase font-bold opacity-60 pb-4">Price Detail</p>
                            <hr />
                            <div className="space-y-3 font-semibold mb-10 ">
                                <div className="flex justify-between pt-3 text-black">
                                    <span>Price</span>
                                    <span>Npr {totalPrice.toFixed(0)}</span>

                                </div>

                                 <div className="flex justify-between pt-3 ">
                                    <span>Discount</span>
                                    <span className="text-green-600">-Npr {totalDiscount.toFixed(0)}</span>

                                </div>

                                 <div className="flex justify-between pt-3 ">
                                    <span>Delivery Charge</span>
                                    <span className="text-green-600">{deliveryCharge === 0 ? 'Free' : `Npr ${deliveryCharge}`}</span>

                                </div>

                                 <div className="flex justify-between pt-3 font-bold ">
                                    <span>Total Amount</span>
                                    <span className="text-green-600">Npr {totalAmount.toFixed(0)}</span>

                                </div>

                            </div>
                            
                            <Button onClick={handleCheckOut} variant='contained' className="w-full mt-5" sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}>
                                CheckOut
                            </Button>
                        </div>

                    </div>

            </div>



        </div>
    )
}

export default Cart
