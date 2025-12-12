import React, { useEffect, useState } from "react";
import { FaSearch, FaBars } from "react-icons/fa";
import Sidebar from "./components/Sidebar";
import SummaryCards from "./components/SummaryCards";
import DataTable from "./components/DataTable";
import FilterBar from "./components/FilterBar";
import { fetchSales, fetchFilters } from "./services/api";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({ total: 0, totalPages: 1, currentPage: 1 });
  const [loading, setLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    regions: [],
    categories: [],
    paymentMethods: [],
  });

  const [query, setQuery] = useState({
    page: 1,
    limit: 10,
    search: "",
    sort: "",
    category: "",
    region: "",
    paymentMethod: "",
  });

  useEffect(() => {
    fetchFilters().then(setFilterOptions).catch(console.error);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const response = await fetchSales(query);
        setData(response.data);
        setMeta({
          total: response.total,
          totalPages: response.totalPages,
          currentPage: response.currentPage,
        });
      } catch (error) {
        console.error("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };
    const timeoutId = setTimeout(() => loadData(), 300);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleSearch = (e) =>
    setQuery((prev) => ({ ...prev, search: e.target.value, page: 1 }));
  const handleFilterChange = (key, value) =>
    setQuery((prev) => ({ ...prev, [key]: value, page: 1 }));
  const handleSort = (sortKey) =>
    setQuery((prev) => ({ ...prev, sort: sortKey }));
  const handlePageChange = (newPage) =>
    setQuery((prev) => ({ ...prev, page: newPage }));

  return (
    <div className="flex h-screen overflow-hidden bg-main-bg">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content Scrollable Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-8">
          <div className="container mx-auto">
            {/* 1. Header Row: Title and Search */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <button
                  className="lg:hidden text-gray-500"
                  onClick={() => setIsSidebarOpen(true)}
                >
                  <FaBars className="text-xl" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800">
                  Sales Management System
                </h1>
              </div>

              <div className="relative w-full md:w-96">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaSearch className="text-gray-400" />
                </span>
                <input
                  className="block w-full pl-10 pr-3 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="text"
                  placeholder="Name, Phone no."
                  value={query.search}
                  onChange={handleSearch}
                />
              </div>
            </div>

            {/* 2. Filter Bar */}
            <FilterBar
              filterOptions={filterOptions}
              onFilterChange={handleFilterChange}
              onSort={handleSort}
            />

            {/* 3. Stats Cards */}
            <SummaryCards />

            {/* 4. Data Table */}
            <DataTable
              data={data}
              loading={loading}
              meta={meta}
              onPageChange={handlePageChange}
            />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
