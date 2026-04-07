import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderHistory } from "../../../State/Order/Action";
import OrderCard from "./OrderCard";

const orderStatus = [
  { Label: "On The Way", value: "one_the_way" },
  { Label: "Delivered", value: "delivered" },
  { Label: "Cancelled", value: "cancelled" },
  { Label: "Returned", value: "returned" },
];

const Order = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  return (
    <div className="w-full bg-gray-50 px-5 lg:px-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex gap-6 items-start">
          <aside className="w-64 shrink-0">
            <div className="shadow-lg bg-white p-5 rounded-md sticky top-24">
              <h1 className="font-bold text-lg">Filter</h1>
              <div className="space-y-4 mt-8">
                <h2 className="font-semibold text-sm tracking-wide text-gray-800">
                  ORDER STATUS
                </h2>
                {orderStatus.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center cursor-pointer text-sm text-gray-600"
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 border-gray-400 rounded-sm text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="ml-3">{option.Label}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="flex-1 space-y-4">
            {loading && <div className="p-4">Loading...</div>}
            {error && <div className="p-4 text-red-600">{String(error)}</div>}
            {!loading && (!orders || orders.length === 0) && (
              <div className="p-4 text-gray-600">No orders yet.</div>
            )}
            {(orders || []).map((order) => (
              <OrderCard key={order._id || order.id} order={order} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Order;
