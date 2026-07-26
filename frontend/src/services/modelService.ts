import { apiClient } from '../api/client';
import type { MetricsResponse } from '../types/api';

export const modelService = {
  getModelStatus: () => apiClient.get<MetricsResponse>('/api/reports/metrics'),
};
