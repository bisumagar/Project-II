import Achievement from "./components/Achievement";
import MonthlyOverview from "./MonthlyOverview";
import OrdersTableView from "./View/OrderTableView";
import ProductsTableView from "./View/ProductTableVIew";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Top row: Performance summary + KPIs */}
      <div className="flex flex-wrap gap-6 mb-6">
        <div className="w-full md:w-[calc(25%-12px)] min-w-0">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <Achievement />
          </div>
        </div>
        <div className="w-full md:flex-1 min-w-0 md:min-w-[50%]">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <MonthlyOverview />
          </div>
        </div>
      </div>

      {/* Bottom row: All Orders + All Products */}
      <div className="flex flex-wrap gap-6">
        <div className="w-full lg:w-[calc(50%-12px)] min-w-0">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <OrdersTableView />
          </div>
        </div>
        <div className="w-full lg:w-[calc(50%-12px)] min-w-0">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <ProductsTableView />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
