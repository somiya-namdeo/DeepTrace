from fastapi import APIRouter, HTTPException
from app.schemas.request_response_models import PredictionRequest, PredictionResponse
from app.services.prediction_service import predict_threat

router = APIRouter(prefix="/api/predict", tags=["Prediction"])


@router.post("", response_model=PredictionResponse)
def predict(request: PredictionRequest):
    try:
        response = predict_threat(request.features)
        return response
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}")
