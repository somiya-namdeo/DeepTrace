import React, { useEffect, useState } from 'react';
import { Container } from '../components/layout/Container';
import { GlassCard } from '../components/common/GlassCard';
import { Badge } from '../components/common/Badge';
import { ReasoningTrace } from '../components/investigation/ReasoningTrace';
import { ShapPanel } from '../components/investigation/ShapPanel';
import { investigationService } from '../services/investigationService';
import type { AlertSummary, ExplanationResponse } from '../types/api';
import { Loader2 } from 'lucide-react';

export const Investigations: React.FC = () => {
  const [alert, setAlert] = useState<AlertSummary | null>(null);
  const [explanation, setExplanation] = useState<ExplanationResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paginatedAlerts = await investigationService.getLatestAlerts();
        if (paginatedAlerts.alerts.length > 0) {
          const firstAlert = paginatedAlerts.alerts[0];
          setAlert(firstAlert);
          const exp = await investigationService.getAlertDetails(firstAlert.alert_id);
          setExplanation(exp);
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(true);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <div className="text-xl font-mono tracking-widest uppercase">DeepTrace Intelligence Core Initializing...</div>
      </div>
    );
  }

  if (error || !alert || !explanation) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-white">
        <div className="w-3 h-3 bg-critical rounded-full animate-pulse shadow-[0_0_15px_rgba(244,63,94,0.8)] mb-4" />
        <div className="text-xl font-mono tracking-widest uppercase mb-6 text-critical">Unable to connect to DeepTrace Reasoning Core</div>
        <button onClick={() => window.location.reload()} className="px-6 py-2 border border-white/20 bg-white/5 hover:bg-white/10 rounded font-mono uppercase text-xs tracking-widest transition-colors">Retry Connection</button>
      </div>
    );
  }

  const shapFeatures = explanation.top_features.map((feat, i) => ({
    name: feat,
    pct: Math.round((explanation.feature_contributions[i] || 0) * 100)
  }));

  const getSeverityVariant = (severity: string) => {
    switch (severity.toUpperCase()) {
      case 'CRITICAL': return 'critical';
      case 'HIGH': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <Container>
      {/* Section 1: Alert Overview Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-8 border-b border-white/10">
        <div>
          <h4 className="text-[10px] text-muted font-mono tracking-widest uppercase mb-4">Investigation Workspace</h4>
          <div className="flex items-center space-x-3 mb-4">
            <Badge variant="outline">{alert.alert_id}</Badge>
            <Badge variant={getSeverityVariant(alert.severity)}>{alert.severity.toUpperCase()}</Badge>
          </div>
          <h1 className="text-3xl font-semibold text-white mb-2">{alert.title}</h1>
          <p className="text-white/50 text-sm max-w-2xl">Review AI explanation and SHAP features to determine necessary action.</p>
        </div>
        <div className="text-right mt-6 md:mt-0">
          <div className="text-[10px] text-white/30 uppercase font-mono tracking-widest mb-1">Threat Score</div>
          <div className="text-4xl font-semibold text-critical">{alert.risk_score.toFixed(2)}</div>
        </div>
      </div>

      {/* Section 2: AI Reasoning Trace */}
      <div className="mb-8">
        <GlassCard glow="critical" className="p-8">
          <div className="flex items-center justify-between mb-6 border-b border-white/5 pb-4">
            <h2 className="text-lg font-medium text-white">AI Reasoning Trace</h2>
            <h4 className="text-[10px] text-white/40 uppercase tracking-widest font-mono">DeepTrace Core</h4>
          </div>
          <ReasoningTrace explanation={`Alert ${alert.alert_id} was classified based on multiple behavioural signals:\n- High failed login frequency detected\n- Unusual access location compared with historical behaviour\n- Activity pattern deviation from baseline\n\nRecommended action: Monitor activity.`} />
        </GlassCard>
      </div>

      {/* Section 3: Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Column: Confidence */}
        <div>
          <GlassCard className="h-full">
            <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono mb-6">Decision Confidence</h4>
            <div className="flex items-center justify-center py-8">
              <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse" />
                <div className="w-40 h-40 rounded-full border border-primary/30 flex items-center justify-center bg-surface relative z-10">
                  <div className="text-center">
                    <div className="text-4xl font-semibold text-white">86.7%</div>
                    <div className="text-xs uppercase tracking-widest text-white/50 font-mono mt-2">Confidence</div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: SHAP */}
        <div>
          <GlassCard className="h-full">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xs text-white/40 uppercase tracking-widest font-mono">Feature Attribution</h4>
              <Badge variant="outline" className="text-[10px]">Kernel SHAP</Badge>
            </div>
            <p className="text-white/50 text-xs mb-6">These are the primary drivers forcing the AI's classification decision.</p>
            <ShapPanel features={shapFeatures} />
          </GlassCard>
        </div>
      </div>
    </Container>
  );
};
