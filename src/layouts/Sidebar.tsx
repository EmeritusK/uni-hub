import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import 'primeicons/primeicons.css';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

interface SidebarProps {
  isCollapsed?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isCollapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['manage-table']));

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <i className="pi pi-home" />,
      path: '/dashboard'
    },
    {
      id: 'menu-order',
      label: 'Menu Order',
      icon: <i className="pi pi-bars" />,
      path: '/menu-order'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: <i className="pi pi-chart-bar" />,
      path: '/analytics'
    },
    {
      id: 'withdrawal',
      label: 'Withdrawal',
      icon: <i className="pi pi-coins" />,
      path: '/withdrawal'
    },
    {
      id: 'manage-table',
      label: 'Manage Table',
      icon: <i className="pi pi-table" />,
      children: [
        { id: 'booked', label: 'Booked', path: '/tables/booked', icon: <i className="pi pi-table" /> },
        { id: 'active', label: 'Active', path: '/tables/active', icon: <i className="pi pi-table" /> },
        { id: 'running-order', label: 'Running Order', path: '/tables/running-order', icon: <i className="pi pi-table" /> }
      ]
    },
    {
      id: 'manage-dish',
      label: 'Manage Dish',
      icon: <i className="pi pi-shopping-cart" />,
      children: [
        { id: 'dishes', label: 'Dishes', path: '/dishes', icon: <i className="pi pi-shopping-cart" /> },
        { id: 'categories', label: 'Categories', path: '/dishes/categories', icon: <i className="pi pi-shopping-cart" /> },
        { id: 'ingredients', label: 'Ingredients', path: '/dishes/ingredients', icon: <i className="pi pi-shopping-cart" /> }
      ]
    },
    {
      id: 'manage-payment',
      label: 'Manage Payment',
      icon: <i className="pi pi-credit-card" />,
      children: [
        { id: 'transactions', label: 'Transactions', path: '/payments/transactions', icon: <i className="pi pi-credit-card" /> },
        { id: 'methods', label: 'Payment Methods', path: '/payments/methods', icon: <i className="pi pi-credit-card" /> },
        { id: 'reports', label: 'Reports', path: '/payments/reports', icon: <i className="pi pi-credit-card" /> }
      ]
    }
  ];

  const utilityItems: MenuItem[] = [
    {
      id: 'settings',
      label: 'Settings',
      icon: <i className="pi pi-cog" />,
      path: '/settings'
    },
    {
      id: 'logout',
      label: 'Logout',
      icon: <i className="pi pi-sign-out" />,
      path: '/logout'
    }
  ];

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const isActive = (path?: string) => {
    if (!path) return false;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleItemClick = (item: MenuItem) => {
    if (item.path) {
      if (item.path === '/logout') {
        console.log('Logging out...');
        navigate('/login');
      } else {
        navigate(item.path);
      }
    }
  };

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedSections.has(item.id);
    const isItemActive = isActive(item.path);

    return (
      <div key={item.id}>
        <div
          className={`
            flex items-center justify-between px-4 py-3 cursor-pointer transition-all duration-200
            ${level === 0 ? 'mx-2 mb-1' : 'ml-6 mr-2 mb-1'}
            ${isItemActive 
              ? 'bg-blue-600 text-white rounded-lg shadow-md' 
              : 'text-gray-700 hover:bg-gray-100 rounded-lg'
            }
            ${isCollapsed ? 'justify-center' : ''}
          `}
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id);
            } else {
              handleItemClick(item);
            }
          }}
        >
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
            <span className={`${isItemActive ? 'text-white' : 'text-gray-600'}`}>
              {item.icon}
            </span>
            {!isCollapsed && (
              <span className={`ml-3 font-medium ${isItemActive ? 'text-white' : 'text-gray-700'}`}>
                {item.label}
              </span>
            )}
          </div>
          {!isCollapsed && hasChildren && (
            <span className={`${isItemActive ? 'text-white' : 'text-gray-500'}`}>
              {isExpanded ? <i className="pi pi-chevron-down" /> : <i className="pi pi-chevron-right" />}
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && !isCollapsed && (
          <div className="transition-all duration-200">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`
        sidebar bg-white h-screen shadow-lg transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-16' : 'w-64'}
        border-r border-gray-200
      `}
      style={{
        backgroundColor: 'white',
        borderRight: '1px solid #e5e7eb',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        minWidth: isCollapsed ? '64px' : '256px',
        width: isCollapsed ? '64px' : '256px'
      }}
    >
      {/* Header/Branding */}
      <div className="p-4 border-b border-gray-200">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          {!isCollapsed && (
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-800">Pospay</h1>
              <p className="text-sm text-gray-500">Cashier Daily Assistant</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="space-y-1">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>

      {/* Utility Links */}
      <div className="border-t border-gray-200 pt-4 pb-6">
        <nav className="space-y-1">
          {utilityItems.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
