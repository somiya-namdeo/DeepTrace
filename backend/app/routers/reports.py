from fastapi import APIRouter
from app.schemas.request_response_models import MetricsResponse
from app.services.reports_service import ReportsService

router = APIRouter(prefix="/api/reports", tags=["Reports"])
reports_service = ReportsService()

@router.get("/metrics", response_model=MetricsResponse)
def get_metrics():
    return reports_service.get_metrics()
