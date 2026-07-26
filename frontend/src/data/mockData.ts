import type { Alert, DriftData, ColdStartData, NodeEmbedding, ModelStatus, ThreatMetric } from '../types';

export const mockAlerts: Alert[] = [
  {
    id: "ALT-808538",
    score: 98.91,
    type: "PRIVILEGE ESCALATION",
    description: "Abnormal privilege usage detected compared with historical behaviour of this identity.",
    confidence: "HIGH",
    status: "OPEN"
  },
  {
    id: "ALI-808418",
    score: 91.42,
    type: "DATA EXFILTRATION PATTERN",
    description: "Repeated bulk downloads outside working baseline for the assigned department.",
    confidence: "HIGH",
    status: "OPEN"
  },
  {
    id: "ALT-808362",
    score: 76.05,
    type: "SUSPICIOUS AUTHENTICATION",
    description: "Failed logins clustered from unfamiliar geolocation followed by a success.",
    confidence: "MEDIUM",
    status: "OPEN"
  },
  {
    id: "ALT-806073",
    score: 30.96,
    type: "ABNORMAL TRAFFIC",
    description: "Deviation in resource access sequence relative to peer group.",
    confidence: "LOW",
    status: "OPEN"
  }
];

export const mockDriftData: DriftData = {
  score: 0.0124,
  status: "Warning",
  stableFeatures: 47,
  warningFeatures: 2
};

export const mockColdStart: ColdStartData = {
  similarity: 81.36,
  riskScore: 18.64,
  decision: "LOW RISK"
};

// Generate deterministic random positions for 200 nodes to form clusters
const generateClusters = (): NodeEmbedding[] => {
  const nodes: NodeEmbedding[] = [];
  
  // Cluster 1 (Normal)
  for(let i=0; i<80; i++) {
    nodes.push({
      id: `node-${i}`,
      x: 30 + (Math.random() * 20 - 10),
      y: 40 + (Math.random() * 20 - 10),
      type: "normal",
      entity: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      risk: parseFloat((Math.random() * 0.3).toFixed(2)),
      classification: "Normal Behaviour"
    });
  }
  
  // Cluster 2 (Normal)
  for(let i=80; i<160; i++) {
    nodes.push({
      id: `node-${i}`,
      x: 60 + (Math.random() * 15 - 7.5),
      y: 30 + (Math.random() * 15 - 7.5),
      type: "normal",
      entity: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      risk: parseFloat((Math.random() * 0.3).toFixed(2)),
      classification: "Normal Behaviour"
    });
  }
  
  // Cluster 3 (Normal)
  for(let i=160; i<190; i++) {
    nodes.push({
      id: `node-${i}`,
      x: 70 + (Math.random() * 15 - 7.5),
      y: 70 + (Math.random() * 15 - 7.5),
      type: "normal",
      entity: `DVC-${Math.floor(1000 + Math.random() * 9000)}`,
      risk: parseFloat((Math.random() * 0.3).toFixed(2)),
      classification: "Normal Behaviour"
    });
  }
  
  // Suspicious outliers
  for(let i=190; i<212; i++) {
    nodes.push({
      id: `node-${i}`,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      type: "suspicious",
      entity: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      risk: parseFloat((0.5 + Math.random() * 0.3).toFixed(2)),
      classification: "Suspicious Location",
      detectedBy: "Transformer"
    });
  }
  
  // Anomalies
  for(let i=212; i<217; i++) {
    nodes.push({
      id: `node-${i}`,
      x: Math.random() * 90 + 5,
      y: Math.random() * 90 + 5,
      type: "anomaly",
      entity: `USR-${Math.floor(10000 + Math.random() * 90000)}`,
      risk: parseFloat((0.85 + Math.random() * 0.14).toFixed(2)),
      classification: "Credential Abuse",
      detectedBy: "Transformer + Isolation Forest"
    });
  }
  
  return nodes;
};

export const behaviourEmbeddings = generateClusters();

export const mockModels: ModelStatus[] = [
  {
    id: "m-transformer",
    name: "Transformer Behavioral Model",
    type: "Sequence reasoning",
    status: "ACTIVE",
    details: {
      "Attention heads": 6,
      "Window": "128 events"
    }
  },
  {
    id: "m-iforest",
    name: "Isolation Forest Detector",
    type: "Anomaly detection engine",
    status: "ACTIVE",
    details: {
      "Trees": 200,
      "Method": "Unsupervised"
    }
  },
  {
    id: "m-shap",
    name: "SHAP Explainability",
    type: "Attribution engine",
    status: "OPERATIONAL",
    details: {
      "Coverage": "100% alerts"
    }
  }
];

export const mockMetrics: ThreatMetric[] = [
  {
    id: "tm-events",
    label: "Total Events",
    value: 239480,
    description: "Events processed in last 24 hours",
    severity: "normal"
  },
  {
    id: "tm-alerts",
    label: "Detected Alerts",
    value: 6167,
    description: "Behaviour deviations identified",
    severity: "warning"
  },
  {
    id: "tm-critical",
    label: "Critical Alerts",
    value: 4951,
    description: "Require analyst investigation",
    severity: "critical"
  }
];

