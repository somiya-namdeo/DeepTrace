from fastapi.testclient import TestClient
import sys
from pathlib import Path
import random

# Add app directory to sys.path
PROJECT_ROOT = Path(__file__).resolve().parents[2]
sys.path.append(str(PROJECT_ROOT / "backend" / "app"))

from app.main import app

client = TestClient(app)

def test_cold_start_normal():
    # Use normal vector (mocked to yield ~0.89 similarity) 
    normal_vector = [0.61351, 0.51982, 0.63867, 0.25198, 1.1692, 0.54488, 0.65819, 0.90813, 0.98092, 0.16892, 0.49332, 0.4286, 0.01456, 0.6216, 0.67527, 0.40044, 0.45679, 0.36529, 0.9489, 1.00656, -0.34719, 1.00396, -0.02733, 0.31118, -0.00049, 0.54632, 0.0882, -0.01963, 0.80337, 0.04519, 0.04391, -0.09692, -0.17777, 0.17422, 0.04216, -0.39391, -0.0287, 0.34361, 0.00052, -0.08253, 0.04398, 0.21841, 0.22826, 0.09633, 0.29753, 0.00012, 1.11472, 0.31973, -0.0063]
    
    response = client.post("/api/cold-start/predict", json={"features": normal_vector})
    assert response.status_code == 200
    data = response.json()
    
    assert "similarity_score" in data
    assert 0 <= data["cold_start_risk_score"] <= 100
    assert data["risk_level"] == "Low"
    assert data["explanation"] == "New entity behaviour is similar to existing behavioural profiles."

def test_cold_start_unknown():
    # Random 49 feature vector
    random_vector = [random.uniform(-5.0, 5.0) for _ in range(49)]
    
    response = client.post("/api/cold-start/predict", json={"features": random_vector})
    assert response.status_code == 200
    data = response.json()
    
    assert "similarity_score" in data
    assert 0 <= data["cold_start_risk_score"] <= 100
    assert data["risk_level"] in ["High", "Critical"]
    
def test_cold_start_validation():
    # Test invalid length
    invalid_vector = [0.0] * 48
    response = client.post("/api/cold-start/predict", json={"features": invalid_vector})
    assert response.status_code == 422
