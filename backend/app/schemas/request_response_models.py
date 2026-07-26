from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class PredictionRequest(BaseModel):
    features: List[float] = Field(..., min_items=49, max_items=49, description="Array of 49 engineered features.")

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
