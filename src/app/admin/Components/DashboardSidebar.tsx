'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaEnvelope, FaNewspaper, FaTachometerAlt, FaCalendarCheck, FaBoxOpen, FaClipboardList, FaTimes } from 'react-icons/fa';

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function DashboardSidebar({ isOpen, onToggle }: DashboardSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      icon: FaTachometerAlt,
      path: '/admin/dashboard',
      section: 'main'
    },
    {
      title: 'Contact Enquiry',
      icon: FaEnvelope,
      path: '/admin/dashboard/contact-enquiry',
      section: 'enquiries'
    },
    {
      title: 'Newsletter Enquiry',
      icon: FaNewspaper,
      path: '/admin/dashboard/newsletter-enquiry',
      section: 'enquiries'
    },
    {
      title: 'Appointments',
      icon: FaCalendarCheck,
      path: '/admin/dashboard/appointments',
      section: 'enquiries'
    },
    {
      title: 'Manage Products',
      icon: FaBoxOpen,
      path: '/admin/dashboard/add-products',
      section: 'products'
    },
    {
      title: 'Product Enquiries',
      icon: FaClipboardList,
      path: '/admin/dashboard/product-enquiry',
      section: 'products'
    },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 sm:w-72 lg:w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isOpen ? 'lg:translate-x-0' : 'lg:-translate-x-full'}`}
      >
        <div className="p-4 sm:p-6">
          {/* Header with Close Button */}
          <div className="mb-6 sm:mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Admin Panel</h2>
              <p className="text-xs text-gray-600 mt-1">Tradition Ayurvedik</p>
            </div>
            <button
              onClick={onToggle}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Close Sidebar"
            >
              <FaTimes className="text-lg sm:text-xl text-gray-600" />
            </button>
          </div>

          <nav className="space-y-1 sm:space-y-2 pb-32">
            {/* Dashboard Section */}
            {menuItems.filter(item => item.section === 'main').map((item) => {
              const isActive = pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  href={item.path}
                  onClick={() => window.innerWidth < 1024 && onToggle()}
                  className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-linear-to-r from-green-500 to-blue-600 text-white border border-green-600 shadow-lg'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`text-base sm:text-lg ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span className="font-medium text-sm sm:text-base">{item.title}</span>
                </Link>
              );
            })}

            {/* Enquiry Management Section */}
            <div className="pt-4 sm:pt-6 mt-3 sm:mt-4">
              <div className="mb-2 sm:mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-4">
                  Enquiry Management
                </h3>
                <div className="mt-2 border-t border-gray-200"></div>
              </div>
              {menuItems.filter(item => item.section === 'enquiries').map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => window.innerWidth < 1024 && onToggle()}
                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 mb-1 sm:mb-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-linear-to-r from-green-500 to-blue-600 text-white border border-green-600 shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`text-base sm:text-lg ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="font-medium text-sm sm:text-base">{item.title}</span>
                  </Link>
                );
              })}
            </div>

            {/* Product Management Section */}
            <div className="pt-4 sm:pt-6 mt-3 sm:mt-4">
              <div className="mb-2 sm:mb-3">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 sm:px-4">
                  Product Management
                </h3>
                <div className="mt-2 border-t border-gray-200"></div>
              </div>
              {menuItems.filter(item => item.section === 'products').map((item) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;

                return (
                  <Link
                    key={item.path}
                    href={item.path}
                    onClick={() => window.innerWidth < 1024 && onToggle()}
                    className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 mb-1 sm:mb-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-linear-to-r from-green-500 to-blue-600 text-white border border-green-600 shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <Icon className={`text-base sm:text-lg ${isActive ? 'text-white' : 'text-gray-500'}`} />
                    <span className="font-medium text-sm sm:text-base">{item.title}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Version Info - Fixed at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 border-t border-gray-200 bg-white">
          <div className="bg-linear-to-r from-green-50 to-blue-50 rounded-lg p-3 sm:p-4 border border-green-200">
            <p className="text-xs text-gray-600 mb-1">Version</p>
            <p className="text-sm font-semibold text-gray-800">1.0.0</p>
          </div>
        </div>
      </aside>
    </>
  );
}
