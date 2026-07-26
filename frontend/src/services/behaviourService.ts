import { apiClient } from '../api/client';
import type { DriftStatusResponse, BehaviourSpaceResponse } from '../types/api';

export const behaviourService = {
  getDriftStatus: () => apiClient.get<DriftStatusResponse>('/api/drift/status'),
  getBehaviourSpace: () => apiClient.get<BehaviourSpaceResponse>('/api/behaviour/space'),
};
