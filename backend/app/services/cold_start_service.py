import joblib
import numpy as np
from pathlib import Path
from sklearn.metrics.pairwise import cosine_similarity
from app.schemas.request_response_models import ColdStartRequest, ColdStartResponse
import logging

import pandas as pd

PROJECT_ROOT = Path(__file__).resolve().parents[3]
logger = logging.getLogger(__name__)


class ColdStartService:
    def __init__(self, scaler_path=None, profiles_path=None):
        if scaler_path is None:
            self.scaler_path = PROJECT_ROOT / "models" / "cold_start" / "profile_scaler.pkl"
        else:
            self.scaler_path = Path(scaler_path)

        if profiles_path is None:
            self.profiles_path = PROJECT_ROOT / "models" / \
                "adaptive_profiles" / "updated_behavior_profile.csv"
        else:
            self.profiles_path = Path(profiles_path)

        self._load_models()

    def _load_models(self):
        if self.scaler_path.exists() and self.profiles_path.exists():
            self.scaler = joblib.load(self.scaler_path)

            # Load stored behavioural profiles
            df = pd.read_csv(self.profiles_path)

            # If the CSV is transposed (features as rows), transpose it back so
            # columns are features
            if 'Feature' in df.columns:
                df = df.set_index('Feature').T

            # Ensure we only have numeric data for the scaler
            numeric_features = df.select_dtypes(include=[np.number])

            sample_size = min(5000, len(numeric_features))
            profile_data = numeric_features.sample(
                sample_size, random_state=42)

            # Scale profiles using the same scaler
            self.scaled_profiles = self.scaler.transform(profile_data)
        else:
            raise FileNotFoundError(
                "Cold start scaler or profile data not found.")

    def predict(self, request: ColdStartRequest) -> ColdStartResponse:
        X = np.array(request.features).reshape(1, -1)

        # Scale incoming 49 features
        X_scaled = self.scaler.transform(X)

        # Calculate cosine similarity
        similarity = cosine_similarity(X_scaled, self.scaled_profiles)

        # Select highest similarity exactly like Notebook 10
        similar_entity_index = np.argmax(similarity)
        similarity_score = float(similarity[0][similar_entity_index])

        # Calculate Risk
        risk_score = (1 - similarity_score) * 100

        if risk_score < 25:
            risk_level = "Low"
        elif risk_score < 50:
            risk_level = "Medium"
        elif risk_score < 75:
            risk_level = "High"
        else:
            risk_level = "Critical"

        if similarity_score >= 0.75:
            explanation = "New entity behaviour is similar to existing behavioural profiles."
        else:
            explanation = "New entity behaviour differs significantly from existing behavioural profiles and requires investigation."

        return ColdStartResponse(
            similarity_score=similarity_score,
            cold_start_risk_score=risk_score,
            risk_level=risk_level,
            explanation=explanation
        )
