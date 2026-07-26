import type { ThreatMetric, TimelineEvent, ModelStatus } from '../types';

export const evolutionMetrics: ThreatMetric[] = [
  { id: "em-stability", label: "Behaviour Stability", value: "92.4%", description: "Current identity consistency score", severity: "normal" },
  { id: "em-drift", label: "Concept Drift", value: "Detected", description: "New behavioural patterns observed", severity: "warning" },
  { id: "em-adapt", label: "Adaptation Events", value: 143, description: "Model updates triggered", severity: "primary" },
  { id: "em-cold", label: "New Entities Analysed", value: 2481, description: "Cold-start evaluations", severity: "normal" },
];

export const timelineEvents: TimelineEvent[] = [
  { day: 1, label: "Day 1", risk: "normal", desc: "Normal baseline" },
  { day: 10, label: "Day 10", risk: "info", desc: "Minor deviation" },
  { day: 18, label: "Day 18", risk: "warning", desc: "New device behaviour" },
  { day: 24, label: "Day 24", risk: "critical", desc: "Privilege pattern shift" },
  { day: 30, label: "Day 30", risk: "primary", desc: "Adaptation complete" },
];

export const evolutionStatusCards: ModelStatus[] = [
  {
    id: "es-transformer",
    name: "Transformer",
    type: "Status",
    status: "ACTIVE",
    details: { "State": "Adapting" }
  },
  {
    id: "es-iforest",
    name: "Isolation Forest",
    type: "Status",
    status: "OPERATIONAL",
    details: { "State": "Monitoring" }
  },
  {
    id: "es-shap",
    name: "SHAP",
    type: "Status",
    status: "ACTIVE",
    details: { "State": "Ready" }
  }
];
