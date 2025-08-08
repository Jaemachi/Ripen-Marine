import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getRoleBasedWidgets } from '../../data/mockData';
import DashboardWidget from './DashboardWidget';
import { Calendar, TrendingUp, Users, AlertTriangle } from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const widgets = getRoleBasedWidgets(user?.role || 'employee');

  const quickStats = [
    { title: 'Active Vessels', value: '12', icon: TrendingUp, color: 'text-teal' },
    { title: 'Open Incidents', value: '3', icon: AlertTriangle, color: 'text-coral' },
    { title: 'Team Members', value: '24', icon: Users, color: 'text-navy' },
    { title: 'This Month', value: '98%', icon: Calendar, color: 'text-green-600' }
  ];

  const getRoleWelcomeMessage = () => {
    const roleMessages = {
      admin: 'You have full system access and oversight capabilities.',
      'it-manager': 'Monitor infrastructure and manage technical operations.',
      'department-manager': 'Oversee your department\'s assets and compliance status.',
      employee: 'Access your assigned assets and report incidents.',
      vendor: 'Manage assigned maintenance tasks and vendor-specific assets.'
    };
    return roleMessages[user?.role || 'employee'];
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-navy/90 to-teal rounded-2xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-white/80 text-lg">
              {getRoleWelcomeMessage()}
            </p>
            <div className="mt-4 inline-block px-3 py-1 bg-white/20 rounded-full">
              <span className="text-sm font-medium capitalize">
                {user?.role?.replace('-', ' ')} Dashboard
              </span>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
              <img
                src={user?.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'}
                alt={user?.name}
                className="w-24 h-24 rounded-full border-4 border-white/20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg bg-gray-50 dark:bg-gray-700`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Dashboard Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {widgets.map((widget) => (
          <DashboardWidget key={widget.id} widget={widget} />
        ))}
      </div>

      {/* Recent Activity - Full Width */}
      {widgets.find(w => w.id === 'activity') && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Activity
          </h3>
          <div className="space-y-4">
            {widgets.find(w => w.id === 'activity')?.data.map((activity: any, index: number) => (
              <div key={index} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="w-10 h-10 bg-gradient-to-br from-teal to-navy rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {activity.user.split(' ').map((n: string) => n[0]).join('')}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 dark:text-white">
                    <span className="font-medium">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}