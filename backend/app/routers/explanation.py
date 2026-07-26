from fastapi import APIRouter, HTTPException
from app.schemas.request_response_models import ExplanationResponse
from app.services.explanation_service import get_shap_explanation

router = APIRouter(prefix="/api/explanation", tags=["Explainability"])


@router.get("/{alert_id}", response_model=ExplanationResponse)
def get_explanation(alert_id: str):
    try:
        return get_shap_explanation(alert_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
