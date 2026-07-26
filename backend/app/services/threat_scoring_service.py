def calculate_threat_score(if_score: float, transformer_prob: float) -> float:
    # Normalize IF score to 0-1 (assuming -0.5 to 0.5 where lower is anomalous)
    # This is a simplified fallback normalization for the scoring logic
    if_normalized = max(0.0, min(1.0, 0.5 - if_score))

    # Combined score (simplified from Notebook 05)
    # Using 40% IF and 60% Transformer as XGBoost wasn't loaded in this
    # specific API
    final_score = (if_normalized * 0.4) + (transformer_prob * 0.6)

    # Scale to 0-100
    threat_score = round(final_score * 100, 2)
    return max(0.0, min(100.0, threat_score))


def classify_risk(score: float) -> tuple:
    if score < 25:
        return "Low", "Informational", "No action required."
    elif score < 50:
        return "Medium", "Low", "Monitor user activity."
    elif score < 75:
        return "High", "Medium", "Investigate alert and review logs."
    else:
        return "Critical", "Critical", "Immediate automated isolation required."
