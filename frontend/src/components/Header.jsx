import React from "react";
import { FaSearch, FaFilter, FaBars } from "react-icons/fa";

const Header = ({ onMenuClick, onSearch, searchTerm }) => {
  return (
    <header className="flex items-center justify-between bg-white py-4 px-6 border-b border-gray-200 shadow-sm">
      <div className="flex items-center flex-1">
        <button
          className="text-text-primary focus:outline-none lg:hidden mr-4"
          onClick={onMenuClick}
        >
          <FaBars className="h-6 w-6" />
        </button>

        {/* Search Input */}
        <div className="relative w-full max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <FaSearch className="h-5 w-5 text-text-secondary" />
          </span>
          <input
            className="block w-full pl-10 pr-3 py-2 rounded-md bg-gray-100 text-text-primary placeholder-text-secondary focus:outline-none focus:bg-white focus:ring-2 focus:ring-accent-blue focus:border-transparent sm:text-sm transition-all"
            type="text"
            placeholder="Search by Name or Phone..."
            value={searchTerm}
            onChange={onSearch}
          />
        </div>
      </div>

      <div className="flex items-center">
        <button className="flex items-center text-text-secondary hover:text-text-primary focus:outline-none mr-6">
          <FaFilter className="h-5 w-5 mr-2" />
          <span className="hidden sm:inline">Filter</span>
        </button>
        <div className="h-8 w-8 rounded-full bg-gray-300 overflow-hidden">
          {/* Placeholder Avatar */}
          <div className="w-full h-full bg-accent-blue flex items-center justify-center text-white font-bold text-xs">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
