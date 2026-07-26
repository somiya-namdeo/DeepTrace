from pydantic import BaseModel, Field
from typing import List


class PredictionRequest(BaseModel):
    features: List[float] = Field(...,
                                  min_items=49,
                                  max_items=49,
                                  description="Array of 49 engineered features.")


class PredictionResponse(BaseModel):
    threat_score: float
    risk_level: str
    severity: str
    recommended_action: str
    model_prediction: int
    anomaly_prediction: int


class AlertModel(BaseModel):
    AlertID: str
    EventID: str
    Timestamp: str
    ThreatScore: float
    RiskLevel: str
    Severity: str
    Priority: str
    Status: str
    AssignedTo: str
    AlertCategory: str
    RecommendedAction: str


class AlertSummary(BaseModel):
    alert_id: str
    title: str
    risk_score: float
    severity: str
    confidence: str
    status: str
    timestamp: str


class PaginatedAlerts(BaseModel):
    total: int
    page: int
    limit: int
    alerts: List[AlertSummary]


class DashboardSummary(BaseModel):
    TotalEvents: int
    TotalAlerts: int
    CriticalAlerts: int
    HighAlerts: int
    MediumAlerts: int
    RiskDistribution: dict
    SeverityDistribution: dict
    AlertStatusDistribution: dict


class ExplanationResponse(BaseModel):
    alert_id: str
    top_features: List[str]
    feature_contributions: List[float]
    explanation: str


class MetricsResponse(BaseModel):
    Accuracy: float
    Precision: float
    Recall: float
    F1Score: float
    ROCAUC: float


class DriftAffectedFeature(BaseModel):
    feature: str
    psi_score: float
    status: str


class DriftStatusResponse(BaseModel):
    overall_drift_score: float
    system_status: str
    stable_features: int
    warning_features: int
    drift_detected_features: int
    affected_features: List[DriftAffectedFeature]


class ColdStartRequest(BaseModel):
    features: List[float] = Field(...,
                                  min_items=49,
                                  max_items=49,
                                  description="Array of 49 engineered features.")


class ColdStartResponse(BaseModel):
    similarity_score: float
    cold_start_risk_score: float
    risk_level: str
    explanation: str


class BehaviourSpacePoint(BaseModel):
    x: float
    y: float
    cluster: str
    label: str


class BehaviourSpaceResponse(BaseModel):
    points: List[BehaviourSpacePoint]


class IdentityInfo(BaseModel):
    identity_id: str
    events_analyzed: int
    last_activity: str
    department: str


class BehaviouralSignal(BaseModel):
    name: str
    value: str
    status: str  # e.g. "normal", "deviation"


class ClusterComparison(BaseModel):
    closest_cluster: str
    similarity_score: float
    deviation_level: str


class ModelAnalysis(BaseModel):
    isolation_forest_result: str
    transformer_score: float
    threat_fusion_score: float


class IdentityInvestigationResponse(BaseModel):
    data_source: str
    identity_info: IdentityInfo
    behaviour_profile: List[BehaviouralSignal]
    cluster_comparison: ClusterComparison
    model_analysis: ModelAnalysis
    ai_explanation: str
