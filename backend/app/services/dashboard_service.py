import pandas as pd
from typing import Dict, Any
from pathlib import Path
import logging

PROJECT_ROOT = Path(__file__).resolve().parents[3]
logger = logging.getLogger(__name__)

class DashboardService:
    def __init__(self, alerts_path=None, reports_path=None):
        if alerts_path is None:
            self.alerts_path = PROJECT_ROOT / "reports" / "predictions" / "deeptrace_alerts.csv"
        else:
            self.alerts_path = Path(alerts_path)
            
        if reports_path is None:
            self.reports_path = PROJECT_ROOT / "reports" / "predictions" / "deeptrace_threat_report.csv"
        else:
            self.reports_path = Path(reports_path)

    def get_summary(self) -> Dict[str, Any]:
        if not self.alerts_path.exists() or not self.reports_path.exists():
            logger.error("Dashboard prediction files missing.")
            raise FileNotFoundError("Dashboard prediction files not found.")
            
        alerts_df = pd.read_csv(self.alerts_path)
        reports_df = pd.read_csv(self.reports_path)
        
        total_events = len(reports_df)
        total_alerts = len(alerts_df)
        
        critical = int((alerts_df['RiskLevel'] == 'Critical').sum()) if 'RiskLevel' in alerts_df.columns else 0
        high = int((alerts_df['RiskLevel'] == 'High').sum()) if 'RiskLevel' in alerts_df.columns else 0
        medium = int((alerts_df['RiskLevel'] == 'Medium').sum()) if 'RiskLevel' in alerts_df.columns else 0
        
        risk_dist = alerts_df['RiskLevel'].value_counts().to_dict() if 'RiskLevel' in alerts_df.columns else {}
        severity_dist = alerts_df['Severity'].value_counts().to_dict() if 'Severity' in alerts_df.columns else {}
        status_dist = alerts_df['Status'].value_counts().to_dict() if 'Status' in alerts_df.columns else {}
        
        return {
            "TotalEvents": total_events,
            "TotalAlerts": total_alerts,
            "CriticalAlerts": critical,
            "HighAlerts": high,
            "MediumAlerts": medium,
            "RiskDistribution": risk_dist,
            "SeverityDistribution": severity_dist,
            "AlertStatusDistribution": status_dist
        }
