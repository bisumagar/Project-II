import { useEffect, useMemo, useState } from "react";
import { api } from "../Config/apiConfig";

const formatCurrency = (value) => {
  const amount = Number(value || 0);
  return `Rs${amount.toLocaleString()}`;
};

const StatCard = ({ title, value, subtitle }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{title}</p>
    <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
    {subtitle ? <p className="mt-1 text-sm text-gray-500">{subtitle}</p> : null}
  </div>
);

const MiniTable = ({ title, rows, leftKey, rightKey, emptyLabel }) => (
  <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
    <h3 className="text-sm font-semibold text-gray-900">{title}</h3>
    {rows.length === 0 ? (
      <p className="mt-3 text-sm text-gray-500">{emptyLabel}</p>
    ) : (
      <div className="mt-3 space-y-2">
        {rows.map((row, idx) => (
          <div
            key={`${row[leftKey] || "row"}-${idx}`}
            className="flex items-center justify-between rounded-md bg-gray-50 px-3 py-2 text-sm"
          >
            <span className="truncate pr-3 text-gray-700">{row[leftKey]}</span>
            <span className="font-medium text-gray-900">{row[rightKey]}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

const AnalyticsPanel = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError("");
        const { data } = await api.get("/admin/orders/analytics");
        if (!cancelled) setAnalytics(data);
      } catch (e) {
        if (!cancelled) {
          setError(e?.response?.data?.error || e?.message || "Failed to load analytics.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const period = analytics?.salesByPeriod || {};
  const metrics = analytics?.orderConversionMetrics || {};
  const topSelling = analytics?.topSellingProducts || [];
  const lowPerforming = analytics?.lowPerformingProducts || [];
  const byCategory = analytics?.revenueByCategory || [];
  const byBrand = analytics?.revenueByBrand || [];

  const topRows = useMemo(
    () =>
      topSelling.map((item) => ({
        name: item.title,
        value: `${item.soldQty} sold`,
      })),
    [topSelling]
  );

  const lowRows = useMemo(
    () =>
      lowPerforming.map((item) => ({
        name: item.title,
        value: `${item.soldQty} sold`,
      })),
    [lowPerforming]
  );

  const categoryRows = useMemo(
    () =>
      byCategory.map((item) => ({
        name: item.category,
        value: formatCurrency(item.revenue),
      })),
    [byCategory]
  );

  const brandRows = useMemo(
    () =>
      byBrand.map((item) => ({
        name: item.brand,
        value: formatCurrency(item.revenue),
      })),
    [byBrand]
  );

  return (
    <div className="space-y-4 rounded-xl bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Reports & Analytics</h2>
        {loading ? <span className="text-sm text-gray-500">Loading...</span> : null}
      </div>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StatCard
          title="Sales Today"
          value={formatCurrency(period?.day?.revenue)}
          subtitle={`${period?.day?.orders || 0} delivered orders`}
        />
        <StatCard
          title="Sales Last 7 Days"
          value={formatCurrency(period?.week?.revenue)}
          subtitle={`${period?.week?.orders || 0} delivered orders`}
        />
        <StatCard
          title="Sales Last 30 Days"
          value={formatCurrency(period?.month?.revenue)}
          subtitle={`${period?.month?.orders || 0} delivered orders`}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <StatCard title="Total Orders" value={metrics.totalOrders || 0} />
        <StatCard title="Delivered" value={metrics.deliveredOrders || 0} />
        <StatCard title="Confirmed" value={metrics.confirmedOrders || 0} />
        <StatCard title="Placed" value={metrics.placedOrders || 0} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MiniTable
          title="Top-Selling Products"
          rows={topRows}
          leftKey="name"
          rightKey="value"
          emptyLabel="No delivered sales yet."
        />
        <MiniTable
          title="Low Performing Products"
          rows={lowRows}
          leftKey="name"
          rightKey="value"
          emptyLabel="No delivered sales yet."
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MiniTable
          title="Revenue by Category"
          rows={categoryRows}
          leftKey="name"
          rightKey="value"
          emptyLabel="No category revenue data."
        />
        <MiniTable
          title="Revenue by Brand"
          rows={brandRows}
          leftKey="name"
          rightKey="value"
          emptyLabel="No brand revenue data."
        />
      </div>
    </div>
  );
};

export default AnalyticsPanel;
