from fastapi import APIRouter
from typing import List
from app.schemas.request_response_models import AlertModel
from app.services.alert_service import AlertService

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])
alert_service = AlertService()

@router.get("", response_model=List[AlertModel])
def get_alerts():
    return alert_service.get_all_alerts()
