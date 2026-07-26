export interface Alert {
  id: string;
  score: number;
  type: string;
  description: string;
  confidence: "LOW" | "MEDIUM" | "HIGH";
  status: "OPEN" | "INVESTIGATING" | "CLOSED";
}

export interface MetricBlock {
  label: string;
  value: string | number;
  subtext: string;
}

export interface ModelStatus {
  id: string;
  name: string;
  type: string;
  status: 'ACTIVE' | 'OPERATIONAL' | 'WARNING' | 'OFFLINE';
  details: Record<string, string | number>;
}

export interface ThreatMetric {
  id: string;
  label: string;
  value: number | string;
  description: string;
  severity: 'normal' | 'warning' | 'critical' | 'secondary' | 'primary';
}

export interface TimelineEvent {
  day: number;
  label: string;
  risk: 'normal' | 'warning' | 'critical' | 'info' | 'primary';
  desc: string;
}

export interface NodeEmbedding {
  id: string;
  x: number;
  y: number;
  type: "normal" | "suspicious" | "anomaly";
  entity: string;
  risk: number;
  classification: string;
  detectedBy?: string;
}

export interface DriftData {
  score: number;
  status: "Stable" | "Warning" | "Drift Detected";
  stableFeatures: number;
  warningFeatures: number;
}

export interface ColdStartData {
  similarity: number;
  riskScore: number;
  decision: "LOW RISK" | "MEDIUM RISK" | "HIGH RISK" | "CRITICAL RISK";
}
