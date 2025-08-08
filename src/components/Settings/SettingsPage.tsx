import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import { Settings, User, Bell, Shield, Globe, Database, Moon, Sun, Save, RefreshCw } from 'lucide-react';
import ThemeToggle from '../UI/ThemeToggle';

export default function SettingsPage() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  const [settings, setSettings] = useState({
    profile: {
      name: user?.name || '',
      email: user?.email || '',
      timezone: 'UTC+1',
      language: 'en',
      avatar: user?.avatar || ''
    },
    notifications: {
      email: true,
      push: true,
      maintenance: true,
      incidents: true,
      compliance: false,
      reports: true
    },
    security: {
      twoFactor: true,
      sessionTimeout: 30,
      loginAlerts: true,
      ipRestriction: false
    },
    system: {
      autoBackup: true,
      dataRetention: 365,
      logLevel: 'info',
      maintenance: false
    }
  });

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'system', label: 'System', icon: Database },
  ];

  const updateSetting = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value
      }
    }));
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Settings</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage your account and system preferences</p>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors">
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-700">
            <nav className="space-y-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      flex items-center space-x-3 w-full px-4 py-3 rounded-lg text-left transition-all duration-200
                      ${activeTab === tab.id
                        ? 'bg-coral text-white shadow-lg'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            {/* Profile Settings */}
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Profile Information</h3>
                  
                  <div className="flex items-center space-x-6 mb-6">
                    <div className="relative">
                      <img
                        src={settings.profile.avatar || 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'}
                        alt="Profile"
                        className="w-20 h-20 rounded-full border-4 border-gray-200 dark:border-gray-700"
                      />
                      <button className="absolute bottom-0 right-0 w-6 h-6 bg-coral text-white rounded-full flex items-center justify-center text-xs hover:bg-coral/90 transition-colors">
                        <RefreshCw className="w-3 h-3" />
                      </button>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{user?.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{user?.role?.replace('-', ' ')}</p>
                      <button className="mt-2 text-sm text-coral hover:text-coral/80 font-medium">
                        Change Photo
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={settings.profile.name}
                        onChange={(e) => updateSetting('profile', 'name', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settings.profile.email}
                        onChange={(e) => updateSetting('profile', 'email', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timezone
                      </label>
                      <select
                        value={settings.profile.timezone}
                        onChange={(e) => updateSetting('profile', 'timezone', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      >
                        <option value="UTC-5">UTC-5 (Eastern)</option>
                        <option value="UTC+0">UTC+0 (GMT)</option>
                        <option value="UTC+1">UTC+1 (Central European)</option>
                        <option value="UTC+8">UTC+8 (Asia/Shanghai)</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Language
                      </label>
                      <select
                        value={settings.profile.language}
                        onChange={(e) => updateSetting('profile', 'language', e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      >
                        <option value="en">English</option>
                        <option value="fr">French</option>
                        <option value="es">Spanish</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Change Password</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <button className="mt-4 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors">
                    Update Password
                  </button>
                </div>
              </div>
            )}

            {/* Notification Settings */}
            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Notification Preferences</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Delivery Methods</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'email', label: 'Email Notifications', description: 'Receive notifications via email' },
                          { key: 'push', label: 'Push Notifications', description: 'Browser and mobile push notifications' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                              onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                              className="mt-1 w-4 h-4 text-coral bg-gray-100 border-gray-300 rounded focus:ring-coral dark:focus:ring-coral dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-4">Notification Types</h4>
                      <div className="space-y-4">
                        {[
                          { key: 'maintenance', label: 'System Maintenance', description: 'Scheduled maintenance alerts' },
                          { key: 'incidents', label: 'Incident Updates', description: 'New incidents and status changes' },
                          { key: 'compliance', label: 'Compliance Alerts', description: 'Audit deadlines and compliance issues' },
                          { key: 'reports', label: 'Report Generation', description: 'Report completion notifications' }
                        ].map((item) => (
                          <div key={item.key} className="flex items-start space-x-3">
                            <input
                              type="checkbox"
                              checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                              onChange={(e) => updateSetting('notifications', item.key, e.target.checked)}
                              className="mt-1 w-4 h-4 text-coral bg-gray-100 border-gray-300 rounded focus:ring-coral dark:focus:ring-coral dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Settings */}
            {activeTab === 'security' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Security Settings</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Add an extra layer of security to your account</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.security.twoFactor}
                        onChange={(e) => updateSetting('security', 'twoFactor', e.target.checked)}
                        className="w-4 h-4 text-coral bg-gray-100 border-gray-300 rounded focus:ring-coral dark:focus:ring-coral dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Login Alerts</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Get notified of new login attempts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.security.loginAlerts}
                        onChange={(e) => updateSetting('security', 'loginAlerts', e.target.checked)}
                        className="w-4 h-4 text-coral bg-gray-100 border-gray-300 rounded focus:ring-coral dark:focus:ring-coral dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">IP Restriction</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Limit access to specific IP addresses</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.security.ipRestriction}
                        onChange={(e) => updateSetting('security', 'ipRestriction', e.target.checked)}
                        className="w-4 h-4 text-coral bg-gray-100 border-gray-300 rounded focus:ring-coral dark:focus:ring-coral dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Session Timeout</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Automatically log out after inactivity</p>
                        </div>
                      </div>
                      <select
                        value={settings.security.sessionTimeout}
                        onChange={(e) => updateSetting('security', 'sessionTimeout', parseInt(e.target.value))}
                        className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={120}>2 hours</option>
                        <option value={0}>Never</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* System Settings */}
            {activeTab === 'system' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System Configuration</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Automatic Backups</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Daily automated system backups</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.system.autoBackup}
                        onChange={(e) => updateSetting('system', 'autoBackup', e.target.checked)}
                        className="w-4 h-4 text-coral bg-gray-100 border-gray-300 rounded focus:ring-coral dark:focus:ring-coral dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white">Maintenance Mode</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Enable system maintenance mode</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.system.maintenance}
                        onChange={(e) => updateSetting('system', 'maintenance', e.target.checked)}
                        className="w-4 h-4 text-coral bg-gray-100 border-gray-300 rounded focus:ring-coral dark:focus:ring-coral dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Data Retention Period</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">How long to keep system logs and data</p>
                        </div>
                      </div>
                      <select
                        value={settings.system.dataRetention}
                        onChange={(e) => updateSetting('system', 'dataRetention', parseInt(e.target.value))}
                        className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      >
                        <option value={90}>90 days</option>
                        <option value={180}>6 months</option>
                        <option value={365}>1 year</option>
                        <option value={730}>2 years</option>
                        <option value={-1}>Indefinite</option>
                      </select>
                    </div>
                    
                    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">Log Level</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">System logging verbosity level</p>
                        </div>
                      </div>
                      <select
                        value={settings.system.logLevel}
                        onChange={(e) => updateSetting('system', 'logLevel', e.target.value)}
                        className="w-full md:w-48 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
                      >
                        <option value="error">Error Only</option>
                        <option value="warning">Warning & Above</option>
                        <option value="info">Info & Above</option>
                        <option value="debug">Debug (All)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="font-medium text-gray-900 dark:text-white mb-4">Danger Zone</h4>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                        Reset All Settings
                      </button>
                      <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:border-red-600 dark:text-red-400 dark:hover:bg-red-900/20 transition-colors">
                        Export System Data
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}