import os
import joblib
import logging
from typing import Any
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]

logger = logging.getLogger(__name__)

class ScalerLoader:
    def __init__(self, model_path=None):
        if model_path is None:
            self.model_path = (
                PROJECT_ROOT /
                "models" /
                "scalers" /
                "deeptrace_scaler.pkl"
            )
        else:
            self.model_path = Path(model_path)
            
        print(f"Loading scaler from:\n{self.model_path}")
        self.scaler = None
        self.is_mock = False
        self._load_model()

    def _load_model(self):
        if os.path.exists(self.model_path):
            try:
                self.scaler = joblib.load(self.model_path)
                logger.info("Scaler loaded successfully.")
            except Exception as e:
                logger.error(f"Failed to load scaler from {self.model_path}: {e}")
                self._initialize_mock()
        else:
            logger.warning("WARNING: Real model not found. Using mock model for development.")
            self._initialize_mock()

    def _initialize_mock(self):
        self.is_mock = True
        # For mock, we just use a class with a transform method that does nothing
        class MockScaler:
            def transform(self, X):
                return X
        self.scaler = MockScaler()

    def transform(self, X: Any) -> Any:
        return self.scaler.transform(X)
