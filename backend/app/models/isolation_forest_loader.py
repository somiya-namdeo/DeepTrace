import os
import joblib
import logging
import numpy as np
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[3]

logger = logging.getLogger(__name__)


class IsolationForestLoader:
    def __init__(self, model_path=None):
        if model_path is None:
            self.model_path = (
                PROJECT_ROOT /
                "models" /
                "trained" /
                "isolation_forest" /
                "isolation_forest.pkl"
            )
        else:
            self.model_path = Path(model_path)

        self.model = None
        self.is_mock = False
        self._load_model()

    def _load_model(self):
        if os.path.exists(self.model_path):
            try:
                self.model = joblib.load(self.model_path)
                logger.info("Isolation Forest loaded successfully.")
            except Exception as e:
                logger.error(
                    f"Failed to load Isolation Forest from {self.model_path}: {e}")
                self._initialize_mock()
        else:
            logger.warning(
                "WARNING: Real model not found. Using mock model for development.")
            self._initialize_mock()

    def _initialize_mock(self):
        self.is_mock = True

        class MockIF:
            def predict(self, X):
                # Returns 1 for normal, -1 for anomaly
                # Just return a random choice for mock
                return np.random.choice([1, -1], size=len(X))

            def decision_function(self, X):
                # Anomaly score: lower means more anomalous
                return np.random.uniform(-0.5, 0.5, size=len(X))
        self.model = MockIF()

    def predict(self, X) -> np.ndarray:
        return self.model.predict(X)

    def decision_function(self, X) -> np.ndarray:
        return self.model.decision_function(X)
