import React from "react";
import {
  FaTachometerAlt,
  FaLayerGroup,
  FaInbox,
  FaCogs,
  FaFileInvoiceDollar,
  FaUserCircle,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0  bg-opacity-50 z-20 lg:hidden transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Sidebar Container */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Area */}
        <div className="flex items-center gap-3 px-6 h-16 bg-white border-b border-gray-100">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
            <span className="text-white font-bold text-lg">V</span>
          </div>
          <span className="text-gray-800 text-xl font-bold tracking-tight">
            Vault
          </span>
        </div>

        {/* User Profile Area */}
        <div className="px-6 py-6 border-b border-gray-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <FaUserCircle className="text-gray-400 text-3xl" />
            <div>
              <h4 className="text-gray-800 font-semibold text-sm">
                Khan
              </h4>
              <p className="text-gray-500 text-xs font-medium">Admin</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4">
          <nav className="space-y-1">
            <SidebarLink icon={<FaTachometerAlt />} text="Dashboard" />
            <SidebarLink icon={<FaLayerGroup />} text="Nexus" />
            <SidebarLink icon={<FaInbox />} text="Intake" />

            {/* Services Group */}
            <div className="pt-4 pb-2">
              <div className="flex items-center px-3 text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">
                <FaCogs className="mr-2" /> Services
              </div>
              <div className="space-y-1 ml-3 pl-3 border-l-2 border-gray-100">
                <SidebarLink text="Pre-active" small />
                <SidebarLink text="Active" active small />
                <SidebarLink text="Blocked" small />
                <SidebarLink text="Closed" small />
              </div>
            </div>

            {/* Invoices Group */}
            <div className="pt-2">
              <div className="flex items-center px-3 text-gray-400 uppercase text-xs font-bold tracking-wider mb-2">
                <FaFileInvoiceDollar className="mr-2" /> Invoices
              </div>
              <div className="space-y-1 ml-3 pl-3 border-l-2 border-gray-100">
                <SidebarLink text="Proforma Invoices" small />
                <SidebarLink text="Final Invoices" small />
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

const SidebarLink = ({ icon, text, active, small }) => {
  return (
    <a
      href="#"
      className={`flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 group ${
        active
          ? "bg-blue-50 text-blue-600 font-semibold"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon && (
        <span
          className={`mr-3 text-lg ${
            active ? "text-blue-600" : "text-gray-400 group-hover:text-gray-600"
          }`}
        >
          {icon}
        </span>
      )}
      <span className={`${small ? "text-sm" : "font-medium"}`}>{text}</span>
    </a>
  );
};

export default Sidebar;
