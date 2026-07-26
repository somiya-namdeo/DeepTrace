import os
import pandas as pd
from typing import List, Dict, Any
from pathlib import Path
import logging

PROJECT_ROOT = Path(__file__).resolve().parents[3]
logger = logging.getLogger(__name__)

class AlertService:
    def __init__(self, alerts_path=None):
        if alerts_path is None:
            self.alerts_path = PROJECT_ROOT / "reports" / "predictions" / "deeptrace_alerts.csv"
        else:
            self.alerts_path = Path(alerts_path)

    def get_all_alerts(self) -> List[Dict[str, Any]]:
        if not self.alerts_path.exists():
            logger.error(f"Alerts file missing: {self.alerts_path}")
            raise FileNotFoundError(f"Alerts file not found at {self.alerts_path}")
            
        df = pd.read_csv(self.alerts_path)
        # Ensure we return exact columns specified
        expected_columns = [
            "AlertID", "EventID", "Timestamp", "ThreatScore", "RiskLevel", 
            "Severity", "Priority", "Status", "AssignedTo", "AlertCategory", "RecommendedAction"
        ]
        
        # Select only available expected columns to prevent KeyError if some are missing, 
        # though production expects them all.
        available_cols = [c for c in expected_columns if c in df.columns]
        
        string_columns = [
            "AlertID",
            "EventID",
            "Timestamp",
            "RiskLevel",
            "Severity",
            "Priority",
            "Status",
            "AssignedTo",
            "AlertCategory",
            "RecommendedAction"
        ]
        
        for col in string_columns:
            if col in available_cols:
                df[col] = df[col].astype(str)
                
        return df[available_cols].to_dict(orient="records")
