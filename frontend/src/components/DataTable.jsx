import React from "react";
import { FaRegCopy, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Loader from "./Loader"; // Import the new Loader

const DataTable = ({ data = [], loading, meta, onPageChange }) => {
  const headers = [
    "Transaction ID",
    "Date",
    "Customer ID",
    "Customer Name",
    "Phone Number",
    "Gender",
    "Age",
    "Product Category",
    "Quantity",
    "Total Amount",
    "Customer Region",
    "Product ID",
    "Employee Name",
  ];

  return (
    <div className="bg-white shadow-sm rounded-xl border border-gray-200 overflow-hidden relative min-h-[400px]">
      {/* LOADING STATE OVERLAY */}
      {loading && (
        <div className="absolute inset-0 z-10 bg-white/80 backdrop-blur-[1px] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {/* Empty State (Only show if NOT loading and NO data) */}
            {!loading && data?.length === 0 ? (
              <tr>
                <td colSpan="13" className="p-10 text-center text-gray-500">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row) => (
                <tr
                  key={row._id}
                  className="hover:bg-gray-50 transition-colors duration-150 group"
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                    PROD-{row._id.substring(row._id.length - 4).toUpperCase()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {new Date(row.operation.date).toLocaleDateString("en-CA")}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    CUST-{row.customer.id.substring(0, 5)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                    {row.customer.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center gap-2">
                    {row.customer.phone}
                    <FaRegCopy
                      className="text-gray-400 hover:text-blue-500 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy"
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.customer.gender}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.customer.age}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.product.category}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 pl-8">
                    {row.sale.quantity}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{row.sale.finalAmount.toLocaleString("en-IN")}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.customer.region}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.product.id || `PROD-${row._id.substring(0, 4)}`}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                    {row.operation.employeeName || "Ankit Tiwari"}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center px-6 py-4 bg-white border-t border-gray-200">
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
          <button
            onClick={() => onPageChange(meta.currentPage - 1)}
            disabled={meta.currentPage === 1 || loading}
            className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronLeft className="h-4 w-4" />
          </button>

          {[...Array(Math.min(5, meta?.totalPages || 1))].map((_, i) => {
            const pageNum = i + 1;
            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                disabled={loading}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                  meta.currentPage === pageNum
                    ? "z-10 bg-gray-900 text-white border-gray-900"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => onPageChange(meta.currentPage + 1)}
            disabled={meta.currentPage === meta.totalPages || loading}
            className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50"
          >
            <FaChevronRight className="h-4 w-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DataTable;
