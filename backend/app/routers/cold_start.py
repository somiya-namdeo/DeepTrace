from fastapi import APIRouter
from app.schemas.request_response_models import ColdStartRequest, ColdStartResponse
from app.services.cold_start_service import ColdStartService

router = APIRouter(prefix="/api/cold-start", tags=["Cold Start"])
cold_start_service = ColdStartService()


@router.post("/predict", response_model=ColdStartResponse)
def predict_cold_start(request: ColdStartRequest):
    return cold_start_service.predict(request)
