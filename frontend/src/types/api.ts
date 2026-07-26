// Types matching the backend Pydantic schemas

export interface DashboardSummary {
  TotalEvents: number;
  TotalAlerts: number;
  CriticalAlerts: number;
  HighAlerts: number;
  MediumAlerts: number;
  RiskDistribution: Record<string, number>;
  SeverityDistribution: Record<string, number>;
  AlertStatusDistribution: Record<string, number>;
}

export interface AlertModel {
  AlertID: string;
  EventID: string;
  Timestamp: string;
  ThreatScore: number;
  RiskLevel: string;
  Severity: string;
  Priority: string;
  Status: string;
  AssignedTo: string;
  AlertCategory: string;
  RecommendedAction: string;
}

export interface AlertSummary {
  alert_id: string;
  title: string;
  risk_score: number;
  severity: string;
  confidence: string;
  status: string;
  timestamp: string;
}

export interface PaginatedAlerts {
  total: number;
  page: number;
  limit: number;
  alerts: AlertSummary[];
}

export interface ExplanationResponse {
  alert_id: string;
  top_features: string[];
  feature_contributions: number[];
  explanation: string;
}

export interface MetricsResponse {
  Accuracy: number;
  Precision: number;
  Recall: number;
  F1Score: number;
  ROCAUC: number;
}

export interface DriftAffectedFeature {
  feature: string;
  psi_score: number;
  status: string;
}

export interface DriftStatusResponse {
  overall_drift_score: number;
  system_status: string;
  stable_features: number;
  warning_features: number;
  drift_detected_features: number;
  affected_features: DriftAffectedFeature[];
}

export interface ColdStartRequest {
  features: number[];
}

export interface ColdStartResponse {
  similarity_score: number;
  cold_start_risk_score: number;
  risk_level: string;
  explanation: string;
}

export interface BehaviourSpacePoint {
  x: number;
  y: number;
  cluster: string;
  label: string;
}

export interface BehaviourSpaceResponse {
  points: BehaviourSpacePoint[];
}

export interface IdentityInfo {
  identity_id: string;
  events_analyzed: number;
  last_activity: string;
  department: string;
}

export interface BehaviouralSignal {
  name: string;
  value: string;
  status: string;
}

export interface ClusterComparison {
  closest_cluster: string;
  similarity_score: number;
  deviation_level: string;
}

export interface ModelAnalysis {
  isolation_forest_result: string;
  transformer_score: number;
  threat_fusion_score: number;
}

export interface IdentityInvestigationResponse {
  data_source: string;
  identity_info: IdentityInfo;
  behaviour_profile: BehaviouralSignal[];
  cluster_comparison: ClusterComparison;
  model_analysis: ModelAnalysis;
  ai_explanation: string;
}
