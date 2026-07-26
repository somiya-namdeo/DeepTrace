from typing import Dict, Any


def get_shap_explanation(alert_id: str) -> Dict[str, Any]:
    # Mocking SHAP logic as requested for notebook 07 integration fallback.
    # In production, this would load the XGBoost/Transformer explainer and run
    # it against the event.
    return {
        "alert_id": alert_id,
        "top_features": ["Failed Logins (1h)", "Login Location", "Distinct Resources Accessed"],
        "feature_contributions": [0.45, 0.25, 0.15],
        "explanation": f"Alert {alert_id} was flagged primarily due to a high volume of failed logins in the last hour originating from an unusual location."
    }
