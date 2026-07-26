import pandas as pd
from pathlib import Path
from app.schemas.request_response_models import DriftStatusResponse, DriftAffectedFeature
import logging

PROJECT_ROOT = Path(__file__).resolve().parents[3]
logger = logging.getLogger(__name__)

class DriftService:
    def __init__(self, drift_path=None):
        if drift_path is None:
            self.drift_path = PROJECT_ROOT / "reports" / "drift" / "concept_drift_report.csv"
        else:
            self.drift_path = Path(drift_path)

    def get_drift_status(self) -> DriftStatusResponse:
        if not self.drift_path.exists():
            raise FileNotFoundError("Concept drift report not found.")

        df = pd.read_csv(self.drift_path)
        
        overall_drift_score = float(df['PSI Score'].mean())
        
        stable = int((df['Status'] == 'Stable').sum())
        warning = int((df['Status'] == 'Warning').sum())
        drift_detected = int((df['Status'] == 'Drift Detected').sum())
        
        system_status = "Stable"
        if drift_detected > 0:
            system_status = "Drift Detected"
        elif warning > 0:
            system_status = "Warning"
            
        affected_df = df[df['Status'] != 'Stable']
        affected_features = []
        for _, row in affected_df.iterrows():
            affected_features.append(
                DriftAffectedFeature(
                    feature=row['Feature'],
                    psi_score=row['PSI Score'],
                    status=row['Status']
                )
            )
            
        return DriftStatusResponse(
            overall_drift_score=overall_drift_score,
            system_status=system_status,
            stable_features=stable,
            warning_features=warning,
            drift_detected_features=drift_detected,
            affected_features=affected_features
        )
