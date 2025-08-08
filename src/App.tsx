import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import LoginPage from './components/Auth/LoginPage';
import Navigation from './components/Layout/Navigation';
import DashboardPage from './components/Dashboard/DashboardPage';
import InventoryPage from './components/Inventory/InventoryPage';
import IncidentsPage from './components/Incidents/IncidentsPage';
import CompliancePage from './components/Compliance/CompliancePage';
import RoadmapPage from './components/Roadmap/RoadmapPage';
import UsersPage from './components/Users/UsersPage';
import NotificationsPage from './components/Notifications/NotificationsPage';
import SettingsPage from './components/Settings/SettingsPage';

function AppContent() {
  const { isAuthenticated, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-navy to-teal rounded-full animate-pulse mb-4 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading MarineIT...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'inventory':
        return <InventoryPage />;
      case 'incidents':
        return <IncidentsPage />;
      case 'compliance':
        return <CompliancePage />;
      case 'roadmap':
        return <RoadmapPage />;
      case 'users':
        return <UsersPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Main Content */}
      <div className="lg:pl-64 pt-16 lg:pt-0 pb-16 lg:pb-0 min-h-screen">
        {renderPage()}
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;