import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../../../State/Cart/Action";

const HomeSectionCard = ({ product, enableAddToCart = false }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const productId = product?._id || product?.id;

  const getDefaultSize = () => {
    const rawSizes = product?.sizes || product?.size || [];
    if (Array.isArray(rawSizes) && rawSizes.length > 0) {
      const first = rawSizes[0];
      return first?.name || first?.size || first || "S";
    }
    if (typeof rawSizes === "string" && rawSizes.trim()) return rawSizes.trim();
    return "S";
  };

  const handleCardClick = () => {
    if (!productId) return;
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (event) => {
    event.stopPropagation();
    if (!productId) return;

    const token = localStorage.getItem("jwt");
    if (!auth?.user && !token) {
      navigate("/login");
      return;
    }

    dispatch(
      addItemToCart({
        data: { productId, size: getDefaultSize(), quantity: 1 },
      })
    );
    navigate("/cart");
  };

  return (
    <div
      onClick={handleCardClick}
      className='cursor-pointer
        flex flex-col
        items-center
        bg-white
        rounded-lg
        shadow-lg
        overflow-hidden
        w-56
        mx-3 '
    >
     
      <div className='h-52 w-40'>

        <img className='object-cover object-top w-full h-full' src={product.imageUrl} alt='product image'/>

      </div>
      <div className='p-4'> 
        <h3 className='text-lg font-medium text-gray-900 '>{product.title}</h3>
        <p className='mt-2 text-sm text-gray-500 '>{product.description}

        </p>
        {enableAddToCart && (
          <Button
            variant="contained"
            size="small"
            sx={{ mt: 2, bgcolor: "#9155fd" }}
            onClick={handleAddToCart}
          >
            Add To Cart
          </Button>
        )}
      </div> 
    </div>
  )
}

export default HomeSectionCard

