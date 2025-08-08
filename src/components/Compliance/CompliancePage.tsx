import React, { useState } from 'react';
import { mockCompliance } from '../../data/mockData';
import { ComplianceItem } from '../../types';
import { Shield, Calendar, Download, AlertTriangle, CheckCircle, Clock, Filter, Search, Plus } from 'lucide-react';

export default function CompliancePage() {
  const [compliance, setCompliance] = useState<ComplianceItem[]>(mockCompliance);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');

  const filteredCompliance = compliance.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'non-compliant': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'non-compliant': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      default: return <Shield className="w-4 h-4 text-gray-500" />;
    }
  };

  const complianceStats = {
    total: compliance.length,
    compliant: compliance.filter(c => c.status === 'compliant').length,
    nonCompliant: compliance.filter(c => c.status === 'non-compliant').length,
    pending: compliance.filter(c => c.status === 'pending').length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Compliance Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Monitor regulatory compliance and audit status</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors">
            <Download className="w-4 h-4" />
            Generate Report
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors">
            <Plus className="w-4 h-4" />
            Schedule Audit
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        {[
          { label: 'Total Audits', value: complianceStats.total, icon: Shield, color: 'text-navy' },
          { label: 'Compliant', value: complianceStats.compliant, icon: CheckCircle, color: 'text-green-600' },
          { label: 'Non-Compliant', value: complianceStats.nonCompliant, icon: AlertTriangle, color: 'text-red-600' },
          { label: 'Pending', value: complianceStats.pending, icon: Clock, color: 'text-yellow-600' }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                    {stat.label}
                  </p>
                  <p className={`text-3xl font-bold ${stat.color}`}>
                    {stat.value}
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-gray-50 dark:bg-gray-700">
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* View Toggle and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'list' 
                  ? 'bg-coral text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-4 py-2 rounded-lg transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-coral text-white' 
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              Calendar View
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search compliance..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
              />
            </div>
            
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="NDPR">NDPR</option>
              <option value="NIMASA">NIMASA</option>
              <option value="ISO">ISO</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-coral focus:border-transparent"
            >
              <option value="all">All Statuses</option>
              <option value="compliant">Compliant</option>
              <option value="non-compliant">Non-Compliant</option>
              <option value="pending">Pending</option>
            </select>

            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {filteredCompliance.length} items found
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Templates */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Audit Templates</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {['NDPR Data Protection', 'NIMASA Safety Standards', 'ISO 27001 Security'].map((template, index) => (
            <div key={index} className="p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:border-coral dark:hover:border-coral transition-colors cursor-pointer">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">{template}</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Pre-configured audit checklist and reporting template
              </p>
              <button className="text-sm text-coral hover:text-coral/80 font-medium">
                Use Template →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Content based on view mode */}
      {viewMode === 'list' ? (
        /* List View */
        <div className="space-y-4">
          {filteredCompliance.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    {getStatusIcon(item.status)}
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {item.name}
                    </h3>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(item.status)}`}>
                      {item.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(item.riskLevel)}`}>
                      {item.riskLevel} risk
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Shield className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium">Type</p>
                        <p className="font-mono text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {item.type}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Calendar className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium">Last Audit</p>
                        <p>{new Date(item.lastAudit).toLocaleDateString()}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <Clock className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium">Next Due</p>
                        <p className={new Date(item.nextDue) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) ? 'text-red-600 dark:text-red-400 font-medium' : ''}>
                          {new Date(item.nextDue).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center text-gray-600 dark:text-gray-400">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      <div>
                        <p className="font-medium">Risk Level</p>
                        <p className="capitalize">{item.riskLevel}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ml-4 flex flex-col items-end gap-2">
                  {new Date(item.nextDue) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                    <div className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 rounded-full text-xs font-medium">
                      Due Soon
                    </div>
                  )}
                  
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-sm bg-coral text-white rounded-lg hover:bg-coral/90 transition-colors">
                      Audit
                    </button>
                    <button className="px-3 py-1 text-sm bg-navy text-white rounded-lg hover:bg-navy/90 transition-colors">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Calendar View */
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Audit Calendar</h3>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                Month
              </button>
              <button className="px-3 py-1 text-sm bg-coral text-white rounded-lg">
                Week
              </button>
            </div>
          </div>
          
          {/* Simplified calendar grid */}
          <div className="grid grid-cols-7 gap-4 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-4">
            {Array.from({ length: 35 }, (_, i) => {
              const dayNumber = i - 2; // Offset for month start
              const hasAudit = dayNumber > 0 && dayNumber <= 31 && Math.random() > 0.8;
              
              return (
                <div
                  key={i}
                  className={`
                    p-2 min-h-[80px] border border-gray-200 dark:border-gray-600 rounded-lg
                    ${dayNumber > 0 && dayNumber <= 31 
                      ? 'bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600' 
                      : 'bg-gray-50 dark:bg-gray-800'
                    }
                    ${hasAudit ? 'border-coral' : ''}
                  `}
                >
                  {dayNumber > 0 && dayNumber <= 31 && (
                    <>
                      <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                        {dayNumber}
                      </div>
                      {hasAudit && (
                        <div className="text-xs bg-coral text-white px-2 py-1 rounded">
                          Audit Due
                        </div>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Risk Register */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance Risk Register</h3>
        <div className="space-y-3">
          {compliance.filter(item => item.status === 'non-compliant' || item.riskLevel === 'high').map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{item.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {item.type} • Risk Level: {item.riskLevel}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRiskColor(item.riskLevel)}`}>
                  {item.riskLevel} risk
                </span>
                <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                  Action Required
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}