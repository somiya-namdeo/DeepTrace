from fastapi import APIRouter
from app.schemas.request_response_models import DashboardSummary
from app.services.dashboard_service import DashboardService

router = APIRouter(prefix="/api/dashboard", tags=["Dashboard"])
dashboard_service = DashboardService()


@router.get("/summary", response_model=DashboardSummary)
def get_dashboard_summary():
    return dashboard_service.get_summary()
