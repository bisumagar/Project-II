import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

const ProductCard = ({ product, productId }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/product/${productId}`)}
      className="product-card w-64 mt-3 cursor-pointer transition-all hover:shadow-lg"
    >
      {/* IMAGE */}
      <div className="w-full h-80 overflow-hidden">
        <img
          src={product.imageUrl}
          alt="girl image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* TEXT */}
      <div className="bg-white p-3">
        <p className="font-bold opacity-60">{product.brand}</p>
        <p className="text-sm mt-1">{product.title}</p>

        <div className="flex items-center space-x-2 mt-2">
          <p className="font-semibold">{product.discountedPrice}</p>
          <p className="line-through opacity-50">{product.price}</p>
          <p className="text-green-500 font-semibold">
            {product.discountPersent}% off
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
