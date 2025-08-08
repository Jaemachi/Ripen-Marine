export interface User {
  id: string;
  email: string;
  role: UserRole;
  name: string;
  avatar?: string;
  lastLogin?: string;
}

export type UserRole = 'admin' | 'it-manager' | 'department-manager' | 'employee' | 'vendor';

export interface Asset {
  id: string;
  name: string;
  type: string;
  location: string;
  status: 'active' | 'maintenance' | 'retired';
  owner: string;
  lastUpdated: string;
  vessel?: string;
}

export interface Incident {
  id: string;
  title: string;
  category: string;
  severity: 'low' | 'medium' | 'high';
  status: 'open' | 'in-progress' | 'closed';
  vessel: string;
  location: string;
  reportedBy: string;
  assignedTo?: string;
  createdAt: string;
  resolvedAt?: string;
  description: string;
}

export interface ComplianceItem {
  id: string;
  name: string;
  type: 'NDPR' | 'NIMASA' | 'ISO';
  status: 'compliant' | 'non-compliant' | 'pending';
  lastAudit: string;
  nextDue: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export interface RoadmapItem {
  id: string;
  title: string;
  priority: 'low' | 'medium' | 'high';
  status: 'planned' | 'in-progress' | 'completed';
  owner: string;
  startDate: string;
  endDate: string;
  budget: number;
  progress: number;
  dependencies?: string[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  read: boolean;
  createdAt: string;
}

export interface DashboardWidget {
  id: string;
  title: string;
  type: 'chart' | 'table' | 'map' | 'metric' | 'activity';
  data: any;
  allowedRoles: UserRole[];
}