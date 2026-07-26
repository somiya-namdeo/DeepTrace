import { apiClient } from '../api/client';
import type { ColdStartResponse, ColdStartRequest } from '../types/api';

export const coldStartService = {
  predictColdStart: (features: number[]) => apiClient.post<ColdStartResponse, ColdStartRequest>('/api/cold-start/predict', { features }),
};
