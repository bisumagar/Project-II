import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Button, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { removeCartItem, updateCartItem } from "../../../State/Cart/Action";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const product = item?.product || item;
  const title = product?.title || product?.name || 'Product';
  const imageUrl = product?.imageUrl || product?.image_url || product?.images?.[0]?.src || product?.images?.[0] || "https://via.placeholder.com/150?text=No+Image";
  const size = item?.size || product?.size;
  const price = product?.discountedPrice ?? product?.discounted_price ?? product?.price ?? product?.original_price ?? 0;
  const originalPrice = product?.price ?? product?.original_price ?? price;
  const quantity = item?.quantity ?? 1;
  const discount = originalPrice > 0 ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;
  const cartItemId = item?.id || item?._id;

  const handleRemove = () => {
    if (cartItemId) {
      console.log("Removing cart item:", cartItemId);
      dispatch(removeCartItem({ cartItemId }));
    } else {
      console.error("Cannot remove: cartItemId is missing", item);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItemId && quantity > 1) {
      const newQuantity = quantity - 1;
      console.log(`Decreasing quantity from ${quantity} to ${newQuantity}`);
      dispatch(updateCartItem({ cartItemId, data: { quantity: newQuantity } }));
    }
  };

  const handleIncreaseQuantity = () => {
    if (cartItemId) {
      const newQuantity = quantity + 1;
      console.log(`Increasing quantity from ${quantity} to ${newQuantity}`);
      dispatch(updateCartItem({ cartItemId, data: { quantity: newQuantity } }));
    }
  };

  return (
    <div className='p-5 shadow-lg border border-gray-400 rounded-md'>
        <div className='flex items-center'>
            <div className='w-20 h-20 lg:w-36 lg:h-36'>
                <img 
                    className='w-full h-full object-cover object-top' 
                    src={typeof imageUrl === 'string' ? imageUrl : imageUrl?.src} 
                    alt={title} 
                    onError={(e) => { 
                        e.target.onerror = null; // Prevent infinite loop
                        e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='150' height='150'%3E%3Crect fill='%23ddd' width='150' height='150'/%3E%3Ctext fill='%23999' font-family='sans-serif' font-size='14' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }} 
                />

            </div>

            <div className="ml-5 space-y-1 ">
                <p className="font-semibold ">
                    {title}
                </p>
                {size && (
                <p className="opacity-70 "> 
                    Size: {size}
                </p>
                )}
                {product?.brand && <p className="opacity-70 mt-2">Seller: {product.brand}</p>}

                <div className='flex space-x-5 items-center text-gray-900 mt-6'>
                                <p className='font-semibold'>
                                    Npr {price}
                                </p>

                                {originalPrice > price && (
                                <>
                                <p className='opacity-50 line-through'>
                                    Npr {originalPrice}
                                </p>
                                <p className='text-green-600 font-semibold'>
                                    {discount}% Off
                                </p>
                                </>
                                )}
                            </div>
            </div>

           

        </div>
         <div className="lg:flex items-center lg:space-x-10 pt-4">
                <div className=" flex items-center space-x-2">
                    <IconButton onClick={handleDecreaseQuantity} disabled={quantity <= 1}>
                    <RemoveCircleOutlineIcon/>
                    </IconButton>

                    <span className='py-1 px-7 border rounded-sm'>{quantity}</span>
                       <IconButton onClick={handleIncreaseQuantity} sx={{color:"RGB(145 65 253)"}}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                    

                </div>
                <div>
                    <Button onClick={handleRemove} sx={{color:"RGB(145 65 253)"}}>Remove</Button>
                </div>

            </div>
      
    </div>
  )
}

export default CartItem
