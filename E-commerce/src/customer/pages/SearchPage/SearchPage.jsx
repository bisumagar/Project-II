import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../../../Config/apiConfig";
import ProductCard from "../../components/product/ProductCard";

const SearchPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt");

  const qParam = new URLSearchParams(location.search).get("q") || "";

  useEffect(() => {
    // Hard guard: only signed-in users can access search
    if (!token) {
      navigate("/login");
    }
  }, [navigate, token]);

  useEffect(() => {
    setQuery(qParam);
  }, [qParam]);

  useEffect(() => {
    if (!token) return;
    const q = (qParam || "").trim();
    if (!q) {
      setResults([]);
      setError(null);
      return;
    }

    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get(`/products/search?q=${encodeURIComponent(q)}&limit=24`);
        if (!cancelled) setResults(data?.content || []);
      } catch (e) {
        if (!cancelled) setError(e?.response?.data?.error || e?.message || "Search failed");
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [qParam]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!token) {
      navigate("/login");
      return;
    }
    const next = query.trim();
    navigate(next ? `/search?q=${encodeURIComponent(next)}` : "/search");
  };

  if (!token) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <h1 className="text-2xl font-semibold text-gray-900">Search</h1>
        <p className="mt-3 text-sm text-gray-600">
          Please sign in to search products.
        </p>
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mt-4 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24 pb-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Search</h1>
        <form onSubmit={onSubmit} className="w-full max-w-xl">
          <div className="flex gap-2">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      <div className="mt-6">
        {error && <p className="text-sm text-red-600">{error}</p>}
        {/* {!qParam && (
          <p className="text-sm text-gray-500">Type something to search (fuzzy matching enabled).</p>
        )} */}
        {loading && <p className="text-sm text-gray-500">Searching...</p>}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {results.map((p) => (
          <ProductCard key={p?._id || p?.id} product={p} />
        ))}
      </div>
    </div>
  );
};

export default SearchPage;

