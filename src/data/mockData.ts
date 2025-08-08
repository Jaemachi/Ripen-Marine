import { Asset, Incident, ComplianceItem, RoadmapItem, Notification, DashboardWidget, UserRole } from '../types';

export const mockAssets: Asset[] = [
  {
    id: '1',
    name: 'Navigation Radar System',
    type: 'Navigation',
    location: 'Bridge - MV Neptune',
    status: 'active',
    owner: 'Sarah IT Manager',
    lastUpdated: '2025-01-07',
    vessel: 'MV Neptune'
  },
  {
    id: '2',
    name: 'Engine Monitoring Unit',
    type: 'Engine',
    location: 'Engine Room - MV Atlantic',
    status: 'maintenance',
    owner: 'Mike Department Head',
    lastUpdated: '2025-01-05',
    vessel: 'MV Atlantic'
  },
  {
    id: '3',
    name: 'Communication Antenna',
    type: 'Communication',
    location: 'Upper Deck - MV Pacific',
    status: 'active',
    owner: 'Tom Vendor',
    lastUpdated: '2025-01-06',
    vessel: 'MV Pacific'
  }
];

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Navigation System Malfunction',
    category: 'Technical',
    severity: 'high',
    status: 'open',
    vessel: 'MV Neptune',
    location: 'Bridge',
    reportedBy: 'Captain Smith',
    assignedTo: 'Sarah IT Manager',
    createdAt: '2025-01-08T10:30:00Z',
    description: 'GPS navigation showing incorrect coordinates'
  },
  {
    id: '2',
    title: 'Engine Temperature Alert',
    category: 'Mechanical',
    severity: 'medium',
    status: 'in-progress',
    vessel: 'MV Atlantic',
    location: 'Engine Room',
    reportedBy: 'Chief Engineer',
    assignedTo: 'Mike Department Head',
    createdAt: '2025-01-07T14:15:00Z',
    description: 'Engine temperature exceeding normal range'
  }
];

export const mockCompliance: ComplianceItem[] = [
  {
    id: '1',
    name: 'NDPR Data Protection Audit',
    type: 'NDPR',
    status: 'compliant',
    lastAudit: '2024-11-15',
    nextDue: '2025-02-15',
    riskLevel: 'low'
  },
  {
    id: '2',
    name: 'NIMASA Safety Standards',
    type: 'NIMASA',
    status: 'pending',
    lastAudit: '2024-10-20',
    nextDue: '2025-01-20',
    riskLevel: 'medium'
  },
  {
    id: '3',
    name: 'ISO 27001 Security Assessment',
    type: 'ISO',
    status: 'non-compliant',
    lastAudit: '2024-12-01',
    nextDue: '2025-03-01',
    riskLevel: 'high'
  }
];

export const mockRoadmap: RoadmapItem[] = [
  {
    id: '1',
    title: 'Vessel IoT Sensor Network Upgrade',
    priority: 'high',
    status: 'in-progress',
    owner: 'Sarah IT Manager',
    startDate: '2024-12-01',
    endDate: '2025-03-31',
    budget: 250000,
    progress: 35
  },
  {
    id: '2',
    title: 'Fleet Management Dashboard Enhancement',
    priority: 'medium',
    status: 'planned',
    owner: 'Mike Department Head',
    startDate: '2025-02-01',
    endDate: '2025-06-30',
    budget: 150000,
    progress: 0
  }
];

export const mockNotifications: Notification[] = [
  {
    id: '1',
    title: 'System Maintenance Scheduled',
    message: 'Planned maintenance window: Jan 15, 2025 02:00-04:00 UTC',
    type: 'info',
    read: false,
    createdAt: '2025-01-08T09:00:00Z'
  },
  {
    id: '2',
    title: 'High Priority Incident',
    message: 'Navigation system malfunction reported on MV Neptune',
    type: 'error',
    read: false,
    createdAt: '2025-01-08T10:30:00Z'
  },
  {
    id: '3',
    title: 'Compliance Deadline Approaching',
    message: 'NIMASA audit due in 12 days',
    type: 'warning',
    read: true,
    createdAt: '2025-01-07T16:00:00Z'
  }
];

export const getRoleBasedWidgets = (role: UserRole): DashboardWidget[] => {
  const baseWidgets: DashboardWidget[] = [
    {
      id: 'vessel-status',
      title: 'Fleet Status',
      type: 'map',
      data: {
        vessels: [
          { name: 'MV Neptune', lat: 6.5244, lng: 3.3792, status: 'active' },
          { name: 'MV Atlantic', lat: 9.0579, lng: 7.4951, status: 'maintenance' },
          { name: 'MV Pacific', lat: 4.8156, lng: 7.0498, status: 'active' }
        ]
      },
      allowedRoles: ['admin', 'it-manager', 'department-manager']
    },
    {
      id: 'incidents',
      title: 'Open Incidents',
      type: 'table',
      data: mockIncidents.filter(i => i.status !== 'closed').slice(0, 5),
      allowedRoles: ['admin', 'it-manager', 'department-manager', 'employee']
    },
    {
      id: 'maintenance',
      title: 'Maintenance Queue',
      type: 'table',
      data: mockAssets.filter(a => a.status === 'maintenance'),
      allowedRoles: ['admin', 'it-manager', 'department-manager']
    },
    {
      id: 'compliance',
      title: 'Compliance Summary',
      type: 'metric',
      data: {
        total: mockCompliance.length,
        compliant: mockCompliance.filter(c => c.status === 'compliant').length,
        nonCompliant: mockCompliance.filter(c => c.status === 'non-compliant').length,
        pending: mockCompliance.filter(c => c.status === 'pending').length
      },
      allowedRoles: ['admin', 'it-manager', 'department-manager']
    },
    {
      id: 'roadmap',
      title: 'Active Initiatives',
      type: 'chart',
      data: mockRoadmap.filter(r => r.status === 'in-progress'),
      allowedRoles: ['admin', 'it-manager', 'department-manager']
    },
    {
      id: 'activity',
      title: 'Recent Activity',
      type: 'activity',
      data: [
        { user: 'Sarah IT Manager', action: 'Updated radar system status', time: '2 hours ago' },
        { user: 'Captain Smith', action: 'Reported navigation issue', time: '4 hours ago' },
        { user: 'Mike Department Head', action: 'Scheduled maintenance', time: '6 hours ago' }
      ],
      allowedRoles: ['admin', 'it-manager', 'department-manager', 'employee']
    }
  ];

  return baseWidgets.filter(widget => widget.allowedRoles.includes(role));
};