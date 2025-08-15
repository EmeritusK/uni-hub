import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout: React.FC = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Desktop Sidebar */}
      <div className="block">
        <Sidebar isCollapsed={isSidebarCollapsed} />
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div 
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleMobileMenu}
          />
          <div className="fixed left-0 top-0 h-full z-50">
            <Sidebar isCollapsed={false} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <button
                onClick={toggleMobileMenu}
                className="md:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <i className="pi pi-bars text-sm" />
              </button>
              <button
                onClick={toggleSidebar}
                className="hidden md:block p-1.5 rounded-md hover:bg-gray-100 transition-colors"
              >
                <i className="pi pi-bars text-sm" />
              </button>
              <h1 className="text-base font-semibold text-gray-800">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* User Profile */}
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-xs">U</span>
                </div>
                <span className="hidden sm:block text-xs font-medium text-gray-700">
                  Usuario
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
