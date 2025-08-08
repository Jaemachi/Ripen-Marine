import React from 'react';
import { 
  Home, 
  Package, 
  AlertTriangle, 
  Shield, 
  Map, 
  Users, 
  Bell,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, roles: ['admin', 'it-manager', 'department-manager', 'employee', 'vendor'] },
  { id: 'inventory', label: 'Inventory', icon: Package, roles: ['admin', 'it-manager', 'department-manager', 'employee'] },
  { id: 'incidents', label: 'Incidents', icon: AlertTriangle, roles: ['admin', 'it-manager', 'department-manager', 'employee'] },
  { id: 'compliance', label: 'Compliance', icon: Shield, roles: ['admin', 'it-manager', 'department-manager'] },
  { id: 'roadmap', label: 'Roadmap', icon: Map, roles: ['admin', 'it-manager', 'department-manager'] },
  { id: 'users', label: 'User Management', icon: Users, roles: ['admin', 'it-manager'] },
  { id: 'notifications', label: 'Notifications', icon: Bell, roles: ['admin', 'it-manager', 'department-manager', 'employee', 'vendor'] },
  { id: 'settings', label: 'Settings', icon: Settings, roles: ['admin', 'it-manager', 'department-manager', 'employee', 'vendor'] }
];

export default function Navigation({ currentPage, onPageChange, isMobileMenuOpen, setIsMobileMenuOpen }: NavigationProps) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const allowedItems = navigationItems.filter(item => 
    item.roles.includes(user?.role || 'employee')
  );

  const NavItem = ({ item, onClick }: { item: typeof navigationItems[0], onClick: () => void }) => {
    const Icon = item.icon;
    const isActive = currentPage === item.id;
    
    return (
      <button
        onClick={onClick}
        className={`
          flex items-center space-x-3 w-full px-4 py-3 rounded-lg transition-all duration-200
          ${isActive 
            ? 'bg-coral text-white shadow-lg' 
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }
        `}
      >
        <Icon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium">{item.label}</span>
      </button>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="w-8 h-8 bg-gradient-to-br from-navy to-teal rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-navy dark:text-white">MarineIT</span>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {allowedItems.map((item) => (
              <NavItem 
                key={item.id} 
                item={item} 
                onClick={() => onPageChange(item.id)}
              />
            ))}
          </nav>

          {/* User Profile & Logout */}
          <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'}
                alt={user?.name}
                className="w-10 h-10 rounded-full"
              />
              <div className="ml-3 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                  {user?.role?.replace('-', ' ')}
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-navy to-teal rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="ml-3 text-xl font-bold text-navy dark:text-white">MarineIT</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <aside className="fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl">
            <div className="flex flex-col h-full pt-16">
              {/* Navigation Items */}
              <nav className="flex-1 px-4 py-6 space-y-2">
                {allowedItems.map((item) => (
                  <NavItem 
                    key={item.id} 
                    item={item} 
                    onClick={() => {
                      onPageChange(item.id);
                      setIsMobileMenuOpen(false);
                    }}
                  />
                ))}
              </nav>

              {/* User Profile & Logout */}
              <div className="px-4 py-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center mb-4">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'}
                    alt={user?.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="ml-3 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                      {user?.role?.replace('-', ' ')}
                    </p>
                  </div>
                </div>
                <button
                  onClick={logout}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 z-30">
        <div className="grid grid-cols-4 py-2">
          {allowedItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                className={`
                  flex flex-col items-center py-2 px-1 transition-colors
                  ${isActive 
                    ? 'text-coral' 
                    : 'text-gray-600 dark:text-gray-400'
                  }
                `}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}