from fastapi import APIRouter
import random
from datetime import datetime
from app.schemas.request_response_models import (
    IdentityInvestigationResponse,
    IdentityInfo,
    BehaviouralSignal,
    ClusterComparison,
    ModelAnalysis
)

import hashlib

router = APIRouter(prefix="/api/investigate", tags=["Investigation"])


def get_scenario(identity_id: str) -> str:
    # Use MD5 to get a deterministic hash from the string
    hash_obj = hashlib.md5(identity_id.encode())
    hash_int = int(hash_obj.hexdigest(), 16)
    val = hash_int % 3
    if val == 0:
        return "NORMAL"
    elif val == 1:
        return "SUSPICIOUS"
    else:
        return "CRITICAL"


@router.get("/identity/{identity_id}",
            response_model=IdentityInvestigationResponse)
def investigate_identity(identity_id: str):
    # Determine deterministic random seed from ID
    seed = int(hashlib.md5(identity_id.encode()).hexdigest(), 16) % (2**32)
    rng = random.Random(seed)

    scenario = get_scenario(identity_id)

    # 1. Generate Mock Identity Info based on ID
    is_user = "user" in identity_id.lower() or "usr" in identity_id.lower()
    department = "Engineering Team" if is_user else "IT Infrastructure"
    events_analyzed = rng.randint(150, 15000)

    identity_info = IdentityInfo(
        identity_id=identity_id,
        events_analyzed=events_analyzed,
        last_activity=datetime.utcnow().isoformat() + "Z",
        department=department
    )

    # Variables for calculation
    similarity_score = 0.0
    deviation_level = ""
    iso_forest = ""
    transformer_score = 0.0
    threat_fusion = 0.0

    explanation = ""

    if scenario == "NORMAL":
        similarity_score = round(rng.uniform(80.0, 95.0), 1)
        deviation_level = "Low"
        iso_forest = "Normal"
        transformer_score = round(rng.uniform(10.0, 35.0), 1)

        behaviour_profile = [
            BehaviouralSignal(
                name="Location consistency",
                value="Primary office location",
                status="normal"),
            BehaviouralSignal(
                name="Device consistency",
                value="Primary work device",
                status="normal"),
            BehaviouralSignal(
                name="Failed authentication attempts",
                value=f"{rng.randint(0, 2)} attempts",
                status="normal"),
            BehaviouralSignal(
                name="Login frequency",
                value=f"{rng.randint(1, 5)} per day",
                status="normal"),
            BehaviouralSignal(
                name="Resource access behaviour",
                value="Standard department resources",
                status="normal"),
        ]

        explanation = "Identity behaviour strongly matches existing behavioural clusters.\n"
        explanation += "Minor deviations were observed but remain within expected patterns.\n"
        explanation += "Current risk level: LOW.\n"
        explanation += "Recommendation: Continue monitoring."

        anomaly_score = 10.0
        behaviour_deviation_score = 15.0

    elif scenario == "SUSPICIOUS":
        similarity_score = round(rng.uniform(50.0, 75.0), 1)
        deviation_level = "Medium"
        iso_forest = rng.choice(["Normal", "Anomaly"])
        transformer_score = round(rng.uniform(45.0, 75.0), 1)

        behaviour_profile = [
            BehaviouralSignal(
                name="Location consistency",
                value="Secondary office / Remote",
                status="deviation"),
            BehaviouralSignal(
                name="Device consistency",
                value="Primary work device",
                status="normal"),
            BehaviouralSignal(
                name="Failed authentication attempts",
                value=f"{rng.randint(3, 8)} attempts",
                status="deviation"),
            BehaviouralSignal(
                name="Login frequency",
                value=f"{rng.randint(2, 6)} per day",
                status="normal"),
            BehaviouralSignal(
                name="Resource access behaviour",
                value="Standard department resources",
                status="normal"),
        ]

        explanation = "Identity behaviour shows partial deviation from established behavioural patterns.\n"
        explanation += "Suspicious activity indicators require analyst review.\n"
        explanation += "Current risk level: MEDIUM."

        anomaly_score = 65.0 if iso_forest == "Anomaly" else 30.0
        behaviour_deviation_score = 50.0

    else:  # CRITICAL
        similarity_score = round(rng.uniform(20.0, 45.0), 1)
        deviation_level = "High"
        iso_forest = "Anomaly"
        transformer_score = round(rng.uniform(80.0, 100.0), 1)

        behaviour_profile = [
            BehaviouralSignal(
                name="Location consistency",
                value="Unrecognized IP / Country",
                status="deviation"),
            BehaviouralSignal(
                name="Device consistency",
                value="Unknown Device Type",
                status="deviation"),
            BehaviouralSignal(
                name="Failed authentication attempts",
                value=f"{rng.randint(15, 50)} attempts",
                status="deviation"),
            BehaviouralSignal(
                name="Login frequency",
                value="Outside business hours",
                status="deviation"),
            BehaviouralSignal(
                name="Resource access behaviour",
                value="Accessing sensitive resources",
                status="deviation"),
        ]

        explanation = "Identity behaviour significantly deviates from learned behavioural baselines.\n"
        explanation += "Multiple anomaly indicators were detected.\n"
        explanation += "Current risk level: CRITICAL.\n"
        explanation += "Recommendation: Escalate for security review."

        anomaly_score = 90.0
        behaviour_deviation_score = 95.0

    # 3. Cluster Comparison
    cluster_comparison = ClusterComparison(
        closest_cluster=department,
        similarity_score=similarity_score,
        deviation_level=deviation_level
    )

    # 4. Threat Fusion
    threat_fusion = round((anomaly_score * 0.4) + (transformer_score *
                          0.4) + (behaviour_deviation_score * 0.2), 1)

    model_analysis = ModelAnalysis(
        isolation_forest_result=iso_forest,
        transformer_score=transformer_score,
        threat_fusion_score=threat_fusion
    )

    return IdentityInvestigationResponse(
        data_source="synthetic_behaviour_profile",
        identity_info=identity_info,
        behaviour_profile=behaviour_profile,
        cluster_comparison=cluster_comparison,
        model_analysis=model_analysis,
        ai_explanation=explanation
    )
