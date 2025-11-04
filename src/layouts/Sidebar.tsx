import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tooltip } from 'primereact/tooltip';
import 'primeicons/primeicons.css';
import '../styles/variables.css';

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
  const [isHovered, setIsHovered] = useState(false);

  const menuItems: MenuItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <i className="pi pi-home" />,
      path: '/dashboard'
    },
    {
      id: 'inventory',
      label: 'Inventario',
      icon: <i className="pi pi-box" />,
      path: '/inventory'
    },
    {
      id: 'reports',
      label: 'Reportes',
      icon: <i className="pi pi-file-pdf" />,
      path: '/reports'
    },
    {
        id: 'sales',
        label: 'Ventas',
      icon: <i className="pi pi-shopping-cart" />,
        path: '/sales'
    },
    {
      id: 'chatbot',
      label: 'Chatbot',
      icon: <i className="pi pi-comments" />,
      path: '/chatbot'
    },
    // {
    //   id: 'manage-payment',
    //   label: 'Manage Payment',
    //   icon: <i className="pi pi-credit-card" />,
    //   children: [
    //     { id: 'transactions', label: 'Transactions', path: '/payments/transactions', icon: <i className="pi pi-credit-card" /> },
    //     { id: 'methods', label: 'Payment Methods', path: '/payments/methods', icon: <i className="pi pi-credit-card" /> },
    //     { id: 'reports', label: 'Reports', path: '/payments/reports', icon: <i className="pi pi-credit-card" /> }
    //   ]
    // }
  ];

  const utilityItems: MenuItem[] = [
    {
      id: 'settings',
      label: 'Configuración',
      icon: <i className="pi pi-cog" />,
      path: '/settings'
    },
    {
      id: 'logout',
      label: 'Cerrar sesión',
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
    const isPathActive = location.pathname === path || location.pathname.startsWith(path + '/');
    console.log(`Checking if ${path} is active:`, isPathActive, 'Current path:', location.pathname);
    return isPathActive;
  };

  const handleItemClick = (item: MenuItem) => {
    console.log('Clicking item:', item);
    console.log('Current location before navigation:', location.pathname);
    if (item.path) {
      if (item.path === '/logout') {
        console.log('Logging out...');
        navigate('/login');
      } else {
        console.log('Navigating to:', item.path);
        navigate(item.path);
        console.log('Navigation called, new location should be:', item.path);
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
            sidebar-menu-item sidebar-menu-container flex items-center justify-between cursor-pointer
            ${level === 0 ? 'mx-1 mb-0.5' : 'ml-3 mr-1 mb-0.5'}
            ${isItemActive 
              ? 'rounded-md shadow-sm' 
              : 'rounded-md hover:bg-opacity-10'
            }
            ${isCollapsed || !isHovered ? 'justify-center' : ''}
            ${isHovered ? 'expanded' : 'collapsed'}
          `}
          style={{
            backgroundColor: isItemActive ? 'var(--menu-active-bg)' : 'transparent',
            color: isItemActive ? 'var(--menu-active-text)' : 'var(--menu-text)',
            boxShadow: isItemActive ? 'var(--menu-active-shadow)' : 'none',
            padding: '0.375rem 0.75rem',
            height: '2.25rem',
            minHeight: '2.25rem',
            maxHeight: '2.25rem'
          }}
          onMouseEnter={(e) => {
            if (!isItemActive) {
              e.currentTarget.style.backgroundColor = 'var(--menu-hover-bg)';
              e.currentTarget.style.color = 'var(--menu-text)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isItemActive) {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'var(--menu-text)';
            }
          }}
          onClick={() => {
            if (hasChildren) {
              toggleSection(item.id);
            } else {
              handleItemClick(item);
            }
          }}
        >
          <div className={`sidebar-content flex items-center ${isCollapsed || !isHovered ? 'justify-center' : ''}`}>
            {(isCollapsed || !isHovered) ? (
              <>
                <Tooltip target={`.menu-tooltip-${item.id}`} position="right" />
                <div className={`menu-tooltip-${item.id}`} data-pr-tooltip={item.label}>
                  <span 
                    className="sidebar-icon text-base"
                    style={{ color: isItemActive ? 'var(--menu-active-text)' : 'var(--menu-text)' }}
                  >
                    {item.icon}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span 
                  className="sidebar-icon text-base"
                  style={{ color: isItemActive ? 'var(--menu-active-text)' : 'var(--menu-text)' }}
                >
              {item.icon}
            </span>
                <span 
                  className="sidebar-text ml-1.5 text-xs font-medium" 
                  style={{ color: isItemActive ? 'var(--menu-active-text)' : 'var(--menu-text)' }}
                >
                {item.label}
              </span>
              </>
            )}
          </div>
          {!isCollapsed && isHovered && hasChildren && (
            <span 
              className="text-xs"
              style={{ color: isItemActive ? 'var(--menu-active-text)' : 'var(--menu-text)' }}
            >
              {isExpanded ? <i className="pi pi-chevron-down" /> : <i className="pi pi-chevron-right" />}
            </span>
          )}
        </div>
        
        {hasChildren && isExpanded && !isCollapsed && isHovered && (
          <div className="sidebar-menu-item expanded">
            {item.children!.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      className={`
        sidebar h-screen shadow-lg
        ${isCollapsed ? 'w-16' : isHovered ? 'w-56' : 'w-16'}
      `}
      style={{
        backgroundColor: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--sidebar-border)',
        boxShadow: 'var(--sidebar-shadow)',
        minWidth: isCollapsed ? '64px' : isHovered ? '224px' : '64px',
        width: isCollapsed ? '64px' : isHovered ? '224px' : '64px'
      }}
      onMouseEnter={() => !isCollapsed && setIsHovered(true)}
      onMouseLeave={() => !isCollapsed && setIsHovered(false)}
    >
      {/* Header/Branding */}
      <div className={`sidebar-header py-1.5 px-1.5 ${isHovered ? 'expanded' : ''}`} style={{ borderBottom: '1px solid var(--border-light)' }}>
        <div className={`flex items-center ${isCollapsed || !isHovered ? 'justify-center' : ''}`}>
          {(isCollapsed || !isHovered) ? (
            <>
              <Tooltip target=".brand-tooltip" position="right" />
              <div className="brand-tooltip" data-pr-tooltip="UniHub ASO Manager">
                <div className="w-6 h-6 rounded-full flex items-center justify-center brand-icon" style={{ backgroundColor: 'var(--header-brand-bg)' }}>
                  <span className="font-bold text-sm" style={{ color: 'var(--menu-active-text)' }}>U</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-6 h-6 rounded-full flex items-center justify-center brand-icon" style={{ backgroundColor: 'var(--header-brand-bg)' }}>
                <span className="font-bold text-sm" style={{ color: 'var(--menu-active-text)' }}>U</span>
          </div>
              <div className="ml-1.5">
                <h1 className="text-base font-bold" style={{ color: 'var(--header-title)' }}>UniHub</h1>
            </div>
            </>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-1 overflow-y-auto">
        <nav className="space-y-0.5">
          {menuItems.map(item => renderMenuItem(item))}
        </nav>
      </div>

      {/* Utility Links */}
      <div className="pt-1.5 pb-2" style={{ borderTop: '1px solid var(--border-light)' }}>
        <nav className="space-y-0.5">
          {utilityItems.map(item => renderMenuItem(item))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
