# DeepTrace API Backend

This is the FastAPI backend for the DeepTrace AI Cyber Threat Detection System. 
It loads pre-trained AI models (Isolation Forest, Transformer, and XGBoost) and exposes endpoints to process enterprise activity logs, predict threats, manage alerts, and explain AI decisions.

## Installation

1. Navigate to the `backend` directory.
2. Create a virtual environment: `python -m venv venv`
3. Activate the environment:
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`
4. Install dependencies: `pip install -r requirements.txt`

## Running the Server

Start the FastAPI backend with uvicorn:
```bash
cd app
uvicorn main:app --reload
```
The server will be available at `http://localhost:8000`.

## Available APIs

- `POST /api/predict`: Predicts the threat level from 49 engineered features.
- `GET /api/alerts`: Returns the latest alerts.
- `GET /api/dashboard/summary`: Provides threat summary metrics.
- `GET /api/explanation/{alert_id}`: Generates a SHAP explanation for a specific alert.
- `GET /api/reports/metrics`: Returns model performance metrics.

For full API documentation, visit `http://localhost:8000/docs` while the server is running.

## Model Loading

At startup, the application attempts to load models from:
- `models/scalers/deeptrace_scaler.pkl`
- `models/trained/isolation_forest/isolation_forest.pkl`
- `models/trained/transformers/best_transformer_model.pth`

If the actual models are not present, the system will log a warning and initialize fallback mock models for development and testing purposes.

## Cold Start API Testing

Endpoint:
POST /api/cold-start/predict

Request:
```json
{
 "features": [49 numerical values]
}
```

Expected normal behaviour example:
- Similarity: ~0.81
- Risk: ~18
- Risk Level: Low

Expected unknown behaviour example:
- Similarity: low
- Risk: high
- Risk Level: High/Critical

This validates Notebook 10 behaviour without requiring the full pipeline.
