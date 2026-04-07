import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useNavigate } from "react-router-dom";

const statusColor = (status) => {
  switch ((status || "").toUpperCase()) {
    case "DELIVERED":
      return "text-green-600";
    case "CANCELLED":
      return "text-red-600";
    case "SHIPPED":
    case "CONFIRMED":
      return "text-yellow-600";
    default:
      return "text-gray-600";
  }
};

const OrderCard = ({ order }) => {
  const navigate = useNavigate();
  const firstItem = order?.orderItems?.[0];
  const product = firstItem?.product;
  const title = product?.title || "Order";
  const imageUrl = product?.imageUrl;
  const size = firstItem?.size;
  const qty = firstItem?.quantity ?? 1;
  const status = order?.orderStatus || "PENDING";
  const total = order?.totalDiscountedPrice ?? order?.totalPrice;

  return (
    <div
      className="w-full bg-white shadow-md shadow-black rounded-md p-5 mb-4 hover:shadow-2xl cursor-pointer"
      onClick={() => navigate(`/account/order/${order?._id || order?.id}`)}
    >
      <div className="flex items-center justify-between gap-6">
        <div className="flex flex-[0.6] items-center">
          <img
            className="h-24 w-24 object-cover object-top rounded"
            src={imageUrl}
            alt=""
          />
          <div className="ml-5 space-y-1">
            <p className="font-semibold">{title}</p>
            {size && (
              <p className="text-xs font-semibold text-black/55">Size: {String(size)}</p>
            )}
            <p className="text-xs font-semibold text-black/55">Qty: {String(qty)}</p>
            <p className="text-xs font-semibold text-black/55">
              Items: {String(order?.orderItems?.length ?? 0)}
            </p>
          </div>
        </div>

        <div className="flex-[0.15] text-center font-semibold">
          {total != null ? `Npr ${String(total)}` : "—"}
        </div>

        <div className="flex-[0.25] text-right">
          <p className={`text-sm font-medium flex items-center justify-end ${statusColor(status)}`}>
            <FiberManualRecordIcon sx={{ width: "15px", height: "15px" }} className={`mr-2 ${statusColor(status)}`} />
            <span>{String(status)}</span>
          </p>
          <p className={`text-xs font-semibold ${statusColor(status)}`}>
            {status === "DELIVERED"
              ? "Delivered"
              : status === "CANCELLED"
                ? "Cancelled"
                : "In progress"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
