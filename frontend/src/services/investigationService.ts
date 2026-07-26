import type { IdentityInvestigationResponse, PaginatedAlerts, ExplanationResponse } from '../types/api';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const API_BASE_URL = `${API_URL}/api`;

export const investigationService = {
  async getLatestAlerts(): Promise<PaginatedAlerts> {
    const response = await fetch(`${API_BASE_URL}/alerts`);
    if (!response.ok) {
      throw new Error(`Failed to fetch alerts: ${response.statusText}`);
    }
    return response.json();
  },

  async getAlertDetails(alertId: string): Promise<ExplanationResponse> {
    const response = await fetch(`${API_BASE_URL}/explanation/${alertId}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch alert details: ${response.statusText}`);
    }
    return response.json();
  },

  async investigateIdentity(identityId: string): Promise<IdentityInvestigationResponse> {
    const response = await fetch(`${API_BASE_URL}/investigate/identity/${identityId}`);
    if (!response.ok) {
      throw new Error(`Failed to investigate identity: ${response.statusText}`);
    }
    return response.json();
  }
};

