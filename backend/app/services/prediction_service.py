import numpy as np
import torch
from app.models.scaler_loader import ScalerLoader
from app.models.isolation_forest_loader import IsolationForestLoader
from app.models.transformer_loader import TransformerLoader
from app.services.threat_scoring_service import calculate_threat_score, classify_risk
from app.schemas.request_response_models import PredictionResponse

# Singletons for models
scaler = ScalerLoader()
iso_forest = IsolationForestLoader()
transformer = TransformerLoader()

def predict_threat(features: list) -> PredictionResponse:
    # 1. Scale features
    X = np.array([features])
    X_scaled = scaler.transform(X)

    # 2. IF Prediction
    if_score = iso_forest.decision_function(X_scaled)[0]
    if_pred = int(iso_forest.predict(X_scaled)[0])

    # 3. Transformer Prediction
    # Transform to (batch, seq_len=1, features=49) for dummy sequence
    X_tensor = torch.tensor(X_scaled, dtype=torch.float32).unsqueeze(1)
    transformer_prob = transformer.predict_proba(X_tensor)

    # 4. Threat Scoring
    threat_score = calculate_threat_score(if_score, transformer_prob)
    risk_level, severity, recommended_action = classify_risk(threat_score)

    return PredictionResponse(
        threat_score=threat_score,
        risk_level=risk_level,
        severity=severity,
        recommended_action=recommended_action,
        model_prediction=1 if threat_score >= 70 else 0,
        anomaly_prediction=if_pred
    )
