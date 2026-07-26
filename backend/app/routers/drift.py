from fastapi import APIRouter
from app.schemas.request_response_models import DriftStatusResponse
from app.services.drift_service import DriftService

router = APIRouter(prefix="/api/drift", tags=["Drift"])
drift_service = DriftService()

@router.get("/status", response_model=DriftStatusResponse)
def get_drift_status():
    return drift_service.get_drift_status()
