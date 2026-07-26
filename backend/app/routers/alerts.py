from fastapi import APIRouter, Query
from typing import List
from app.schemas.request_response_models import AlertModel, PaginatedAlerts
from app.services.alert_service import AlertService

router = APIRouter(prefix="/api/alerts", tags=["Alerts"])
alert_service = AlertService()

@router.get("", response_model=PaginatedAlerts)
def get_alerts(page: int = Query(1, ge=1), limit: int = Query(20, ge=1, le=100)):
    return alert_service.get_alerts_paginated(page=page, limit=limit)
