import React from "react";
import { FaSyncAlt } from "react-icons/fa";

const FilterBar = ({ filterOptions, onFilterChange, onSort }) => {
  const FilterSelect = ({ label, options, fieldKey }) => (
    <div className="relative">
      <select
        className="appearance-none bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 pl-3 pr-8 rounded-md border border-transparent focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer transition-colors"
        onChange={(e) => onFilterChange(fieldKey, e.target.value)}
      >
        <option value="">{label}</option>
        {options?.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
        <svg
          className="fill-current h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
        </svg>
      </div>
    </div>
  );

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      {/* Left Side: Reset & Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => window.location.reload()} // Simple reload for reset, or pass a handler
          className="p-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md transition-colors"
        >
          <FaSyncAlt className="text-sm" />
        </button>

        <FilterSelect
          label="Customer Region"
          options={filterOptions.regions}
          fieldKey="region"
        />
        <FilterSelect
          label="Gender"
          options={["Male", "Female"]}
          fieldKey="gender"
        />
        <FilterSelect
          label="Age Range"
          options={["18-25", "26-35", "36-50", "50+"]}
          fieldKey="age"
        />
        <FilterSelect
          label="Product Category"
          options={filterOptions.categories}
          fieldKey="category"
        />
        <FilterSelect label="Tags" options={[]} fieldKey="tags" />
        <FilterSelect
          label="Payment Method"
          options={filterOptions.paymentMethods}
          fieldKey="paymentMethod"
        />
        <FilterSelect label="Date" options={[]} fieldKey="date" />
      </div>

      {/* Right Side: Sort */}
      <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
        <span className="text-gray-500 text-sm mr-2">Sort by:</span>
        <select
          className="bg-transparent text-gray-800 text-sm font-semibold outline-none cursor-pointer"
          onChange={(e) => onSort(e.target.value)}
        >
          <option value="name_asc">Customer Name (A-Z)</option>
          <option value="name_desc">Customer Name (Z-A)</option>
          <option value="date_desc">Newest First</option>
          <option value="date_asc">Oldest First</option>
        </select>
      </div>
    </div>
  );
};

export default FilterBar;
