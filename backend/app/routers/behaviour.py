from fastapi import APIRouter
from app.schemas.request_response_models import BehaviourSpaceResponse, BehaviourSpacePoint
import random

router = APIRouter(prefix="/api/behaviour", tags=["Behaviour"])

@router.get("/space", response_model=BehaviourSpaceResponse)
def get_behaviour_space():
    points = []
    
    # Generate ~190 normal points
    for i in range(190):
        points.append(BehaviourSpacePoint(
            x=random.gauss(50, 15),
            y=random.gauss(50, 15),
            cluster="normal",
            label=f"USR-{random.randint(10000, 99999)}"
        ))
        
    # Generate ~22 suspicious points
    for i in range(22):
        points.append(BehaviourSpacePoint(
            x=random.uniform(5, 95),
            y=random.uniform(5, 95),
            cluster="suspicious",
            label=f"USR-{random.randint(10000, 99999)}"
        ))
        
    # Generate ~5 anomaly points
    for i in range(5):
        points.append(BehaviourSpacePoint(
            x=random.uniform(5, 95),
            y=random.uniform(5, 95),
            cluster="anomaly",
            label=f"USR-{random.randint(10000, 99999)}"
        ))
        
    return BehaviourSpaceResponse(points=points)
