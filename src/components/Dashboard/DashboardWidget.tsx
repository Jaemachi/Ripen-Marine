import React from 'react';
import { DashboardWidget as WidgetType } from '../../types';
import { MapPin, Activity, BarChart3, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface DashboardWidgetProps {
  widget: WidgetType;
}

export default function DashboardWidget({ widget }: DashboardWidgetProps) {
  const renderContent = () => {
    switch (widget.type) {
      case 'map':
        return (
          <div className="space-y-4">
            {widget.data.vessels.map((vessel: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-4 h-4 text-teal" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">{vessel.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {vessel.lat.toFixed(4)}, {vessel.lng.toFixed(4)}
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  vessel.status === 'active' 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {vessel.status}
                </span>
              </div>
            ))}
          </div>
        );

      case 'table':
        return (
          <div className="space-y-3">
            {widget.data.slice(0, 5).map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 dark:text-white truncate">
                    {item.title || item.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {item.vessel || item.location || item.type}
                  </p>
                </div>
                {item.severity && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.severity === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' :
                    item.severity === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {item.severity}
                  </span>
                )}
                {item.status && !item.severity && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    item.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                    'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {item.status}
                  </span>
                )}
              </div>
            ))}
          </div>
        );

      case 'metric':
        const { total, compliant, nonCompliant, pending } = widget.data;
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                <span className="text-2xl font-bold text-green-600">{compliant}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Compliant</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <AlertTriangle className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-2xl font-bold text-red-600">{nonCompliant}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Non-compliant</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-2xl font-bold text-yellow-600">{pending}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Pending</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center mb-2">
                <BarChart3 className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-2xl font-bold text-blue-600">{total}</span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total</p>
            </div>
          </div>
        );

      case 'chart':
        return (
          <div className="space-y-4">
            {widget.data.map((item: any, index: number) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-gray-900 dark:text-white">{item.title}</p>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{item.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-teal to-coral h-2 rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>{item.owner}</span>
                  <span>${item.budget?.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        );

      default:
        return <div>Unsupported widget type</div>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {widget.title}
      </h3>
      {renderContent()}
    </div>
  );
}