import { apiClient } from '../api/client';
import type { DashboardSummary } from '../types/api';

export const dashboardService = {
  getDashboardOverview: () => apiClient.get<DashboardSummary>('/api/dashboard/summary'),
};
