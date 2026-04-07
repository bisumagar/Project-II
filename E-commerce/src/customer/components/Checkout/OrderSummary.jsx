import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import AddressCard from "../AddressCard/AddressCard";
import CartItem from "../cart/CartItem";
import { get } from "../../../State/Cart/Action";
import { createOrder } from "../../../State/Order/Action";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { cartItems } = useSelector((state) => state.cart);
  const [placingOrder, setPlacingOrder] = useState(false);
  const submitGuardRef = useRef(false);

  const deliveryAddress = location.state?.deliveryAddress || null;

  useEffect(() => {
    dispatch(get());
  }, [dispatch]);

  const items = Array.isArray(cartItems) ? cartItems : [];

  // Calculate dynamic prices based on user's cart
  const calculatePrices = () => {
    let totalOriginalPrice = 0;
    let totalDiscountedPrice = 0;

    items.forEach((item) => {
      const product = item?.product || item;
      const discountedPrice = product?.discountedPrice ?? product?.discounted_price ?? product?.price ?? 0;
      const originalPrice = product?.price ?? product?.original_price ?? discountedPrice;
      const quantity = item?.quantity ?? 1;

      totalOriginalPrice += originalPrice * quantity;
      totalDiscountedPrice += discountedPrice * quantity;
    });

    const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
    const deliveryCharge = 0;
    const totalAmount = totalDiscountedPrice + deliveryCharge;

    return {
      totalPrice: totalOriginalPrice,
      totalDiscount,
      deliveryCharge,
      totalAmount,
    };
  };

  const { totalPrice, totalDiscount, deliveryCharge, totalAmount } = calculatePrices();

  const handleCheckout = async () => {
    if (submitGuardRef.current) return;
    if (!deliveryAddress) {
      alert("Please fill delivery address first.");
      navigate("/checkout?step=2");
      return;
    }
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    submitGuardRef.current = true;
    setPlacingOrder(true);
    try {
      const created = await dispatch(createOrder({ address: deliveryAddress }));
      dispatch(get());
      const orderId = created?._id ?? created?.id;
      if (orderId) navigate(`/account/order/${orderId}`);
      else navigate("/account/order");
    } catch (e) {
      submitGuardRef.current = false;
      alert(e?.response?.data?.error || e?.message || "Failed to place order.");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div>
      <div className="p-5 shadow-lg rounded-s-md border-gray-950">
        <AddressCard deliveryAddress={deliveryAddress} />
      </div>

      <div>
        <div className="lg:grid grid-cols-3 relative">
          <div className="col-span-2 space-y-4">
            {items.length > 0 ? (
              items.map((item) => (
                <CartItem
                  key={item.id || item._id || item.productId}
                  item={item}
                />
              ))
            ) : (
              <p className="text-gray-500 py-8">Your cart is empty. Add items to proceed.</p>
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
                  <span className="text-green-600">
                    {deliveryCharge === 0 ? "Free" : `Npr ${deliveryCharge}`}
                  </span>
                </div>

                <div className="flex justify-between pt-3 font-bold ">
                  <span>Total Amount</span>
                  <span className="text-green-600">Npr {totalAmount.toFixed(0)}</span>
                </div>
              </div>

              <Button
                variant="contained"
                className="w-full mt-5"
                sx={{ px: "2.5rem", py: ".7rem", bgcolor: "#9155fd" }}
                onClick={handleCheckout}
                disabled={items.length === 0 || placingOrder}
              >
                {placingOrder ? "Placing order..." : "CheckOut"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
