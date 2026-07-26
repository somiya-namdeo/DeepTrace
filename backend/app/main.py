import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers import prediction, alerts, dashboard, explanation, reports, drift, cold_start, behaviour, investigate

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s")
logger = logging.getLogger(__name__)

app = FastAPI(
    title="DeepTrace AI API",
    description="Backend API for the DeepTrace Cyber Threat Detection System.",
    version="1.0.0"
)

# CORS configuration for future React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for development
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Include routers
app.include_router(prediction.router)
app.include_router(alerts.router)
app.include_router(dashboard.router)
app.include_router(explanation.router)
app.include_router(reports.router)
app.include_router(drift.router)
app.include_router(cold_start.router)
app.include_router(behaviour.router)
app.include_router(investigate.router)


@app.get("/", tags=["Health"])
def health_check():
    return {"status": "healthy", "service": "DeepTrace AI API"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
