import pandas as pd
from typing import List, Dict, Any
from pathlib import Path
import logging

PROJECT_ROOT = Path(__file__).resolve().parents[3]
logger = logging.getLogger(__name__)


class AlertService:
    def __init__(self, alerts_path=None):
        if alerts_path is None:
            self.alerts_path = PROJECT_ROOT / "reports" / \
                "predictions" / "deeptrace_alerts.csv"
        else:
            self.alerts_path = Path(alerts_path)

    def get_all_alerts(self) -> List[Dict[str, Any]]:
        if not self.alerts_path.exists():
            logger.error(f"Alerts file missing: {self.alerts_path}")
            raise FileNotFoundError(
                f"Alerts file not found at {self.alerts_path}")

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

    def get_alerts_paginated(
            self, page: int = 1, limit: int = 20) -> Dict[str, Any]:
        if not self.alerts_path.exists():
            logger.error(f"Alerts file missing: {self.alerts_path}")
            raise FileNotFoundError(
                f"Alerts file not found at {self.alerts_path}")

        df = pd.read_csv(self.alerts_path)
        total = len(df)

        start = (page - 1) * limit
        end = start + limit
        df_page = df.iloc[start:end]

        alerts = []
        for _, row in df_page.iterrows():
            risk_level = str(row.get("RiskLevel", ""))
            confidence = "High" if risk_level.upper(
            ) in ["CRITICAL", "HIGH"] else "Medium"

            alerts.append({
                "alert_id": str(row.get("AlertID", "")),
                "title": str(row.get("AlertCategory", "")),
                "risk_score": float(row.get("ThreatScore", 0.0)),
                "severity": str(row.get("Severity", "")),
                "confidence": confidence,
                "status": str(row.get("Status", "")),
                "timestamp": str(row.get("Timestamp", ""))
            })

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "alerts": alerts
        }
