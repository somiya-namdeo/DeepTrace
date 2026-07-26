import pandas as pd
from typing import Dict, Any
from pathlib import Path
import logging

PROJECT_ROOT = Path(__file__).resolve().parents[3]
logger = logging.getLogger(__name__)

class ReportsService:
    def __init__(self, metrics_path=None):
        if metrics_path is None:
            self.metrics_path = PROJECT_ROOT / "reports" / "metrics" / "performance_metrics.csv"
        else:
            self.metrics_path = Path(metrics_path)

    def get_metrics(self) -> Dict[str, float]:
        if not self.metrics_path.exists():
            logger.error(f"Metrics file missing: {self.metrics_path}")
            raise FileNotFoundError(f"Metrics file not found at {self.metrics_path}")
            
        df = pd.read_csv(self.metrics_path)
        metrics_dict = dict(zip(df['Metric'], df['Value']))
        
        return {
            "Accuracy": float(metrics_dict["Accuracy"]),
            "Precision": float(metrics_dict["Precision"]),
            "Recall": float(metrics_dict["Recall"]),
            "F1Score": float(metrics_dict["F1 Score"]),
            "ROCAUC": float(metrics_dict["ROC-AUC"])
        }
