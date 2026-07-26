import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Container } from '../components/layout/Container';
import { SystemStatusFooter } from '../components/layout/SystemStatusFooter';
import { GlassCard } from '../components/common/GlassCard';
import { investigationService } from '../services/investigationService';
import type { IdentityInvestigationResponse } from '../types/api';
import { Loader2 } from 'lucide-react';

export const BehaviourInvestigation: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [investigationData, setInvestigationData] = useState<IdentityInvestigationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // 0 = none, 1 = identity, 2 = profile, 3 = cluster, 4 = model, 5 = explanation
  const [searchStep, setSearchStep] = useState(0);

  const handleSearch = async () => {
    if (!searchQuery) return;
    setIsSearching(true);
    setError(null);
    setInvestigationData(null);
    setSearchStep(1);

    try {
      const data = await investigationService.investigateIdentity(searchQuery);
      
      // Step 1 activates immediately (already set)
      
      // Sequence the steps for visual effect
      setTimeout(() => setSearchStep(2), 1000);
      setTimeout(() => setSearchStep(3), 2000);
      setTimeout(() => setSearchStep(4), 3200);
      setTimeout(() => {
        setSearchStep(5);
        setInvestigationData(data);
        setIsSearching(false);
      }, 4500);

    } catch (err) {
      console.error(err);
      setError('Failed to fetch identity investigation data.');
      setIsSearching(false);
      setSearchStep(0);
    }
  };

  return (
    <>
      <Container className="pb-16 pt-8 max-w-4xl">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h4 className="text-[10px] text-primary uppercase font-mono tracking-widest mb-3">Analyst Workflow</h4>
          <h1 className="text-3xl md:text-4xl font-semibold text-white mb-4">
            Behaviour <span className="text-primary">Investigation</span>
          </h1>
          <p className="text-white/50 text-base max-w-2xl leading-relaxed">
            Analyze identity behaviour patterns against learned behavioural baselines.
          </p>
        </motion.div>

        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <GlassCard className="p-4 flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">🔍</span>
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search User ID / Device ID / IP Address" 
                className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-primary/50 transition-colors font-mono text-sm"
              />
            </div>
            <button 
              onClick={handleSearch}
              disabled={isSearching || !searchQuery}
              className="bg-primary hover:bg-primary/90 disabled:opacity-50 disabled:hover:bg-primary text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-[1.02] shadow-[0_0_15px_rgba(147,51,234,0.3)] whitespace-nowrap flex items-center space-x-2"
            >
              {isSearching ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Investigating...</span>
                </>
              ) : 'Investigate'}
            </button>
          </GlassCard>
          {error && <div className="mt-4 text-critical text-sm bg-critical/10 p-3 rounded-lg border border-critical/20">{error}</div>}
          
          <div className="mt-4 flex items-center text-xs font-mono text-white/40">
            <span className="mr-2">Try examples:</span>
            {['user_10293', 'device_DEV_4821', 'IP_192.168.1.20'].map((target, idx) => (
              <React.Fragment key={target}>
                <button
                  onClick={() => setSearchQuery(target)}
                  className="text-primary/70 hover:text-primary transition-colors"
                >
                  {target}
                </button>
                {idx < 2 && <span className="mx-2">•</span>}
              </React.Fragment>
            ))}
          </div>

          {searchStep === 0 && !isSearching && !error && (
            <div className="mt-8 text-center text-white/30 font-mono text-sm max-w-lg mx-auto">
              Investigate an identity to view behavioural signals, cluster comparison, and AI reasoning.
            </div>
          )}
        </motion.div>

        {/* Pipeline */}
        {searchStep > 0 && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-6"
          >
            <GlassCard className="p-6 relative overflow-hidden min-h-[500px]">
              {/* Connecting vertical line */}
              <div className="absolute left-[39px] top-10 bottom-10 w-px bg-gradient-to-b from-primary/50 via-secondary/50 to-transparent -z-10" />
              
              <div className="space-y-8 z-10 relative">
                
                {/* Step 1: Identity Retrieval */}
                <div className={`flex gap-6 transition-opacity duration-700 ${searchStep >= 1 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="mt-1 flex flex-col items-center z-10 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border transition-colors duration-500 ${searchStep >= 1 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-white/5 border-white/10 text-white/30 bg-[#0c0c14]'}`}>1</div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-3">Identity Retrieval</h3>
                    {searchStep >= 1 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm text-white/60">
                        {investigationData ? (
                          <div className="grid grid-cols-2 gap-y-2">
                            <div>Identity ID: <span className="text-white/90">{investigationData.identity_info.identity_id}</span></div>
                            <div>Department: <span className="text-white/90">{investigationData.identity_info.department}</span></div>
                            <div>Events Analyzed: <span className="text-white/90">{investigationData.identity_info.events_analyzed.toLocaleString()}</span></div>
                            <div>Last Activity: <span className="text-white/90">{new Date(investigationData.identity_info.last_activity).toLocaleTimeString()}</span></div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-white/40"><Loader2 className="w-3 h-3 animate-spin" /><span>Retrieving...</span></div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 2: Behaviour Profile Extraction */}
                <div className={`flex gap-6 transition-opacity duration-700 ${searchStep >= 2 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="mt-1 flex flex-col items-center z-10 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border transition-colors duration-500 ${searchStep >= 2 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-white/5 border-white/10 text-white/30 bg-[#0c0c14]'}`}>2</div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-3">Behaviour Profile Extraction</h3>
                    {searchStep >= 2 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm text-white/60 space-y-2">
                         {investigationData ? (
                           investigationData.behaviour_profile.map((signal, idx) => (
                             <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0 last:pb-0">
                               <span>{signal.name}</span>
                               <div className="flex items-center space-x-3">
                                 <span className="text-white/80">{signal.value}</span>
                                 {signal.status === 'deviation' ? (
                                   <span className="text-[10px] bg-warning/10 text-warning px-2 py-0.5 rounded uppercase tracking-widest border border-warning/30">Deviation</span>
                                 ) : (
                                   <span className="text-[10px] bg-secondary/10 text-secondary px-2 py-0.5 rounded uppercase tracking-widest border border-secondary/30">Normal</span>
                                 )}
                               </div>
                             </div>
                           ))
                         ) : (
                           <div className="flex items-center space-x-2 text-white/40"><Loader2 className="w-3 h-3 animate-spin" /><span>Extracting signals...</span></div>
                         )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 3: Behavioural Cluster Comparison */}
                <div className={`flex gap-6 transition-opacity duration-700 ${searchStep >= 3 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="mt-1 flex flex-col items-center z-10 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border transition-colors duration-500 ${searchStep >= 3 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-white/5 border-white/10 text-white/30 bg-[#0c0c14]'}`}>3</div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-3">Behavioural Cluster Comparison</h3>
                    {searchStep >= 3 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm text-white/60 flex flex-wrap gap-6">
                        {investigationData ? (
                          <>
                            <div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Closest Cluster</div>
                              <div className="text-white/90">{investigationData.cluster_comparison.closest_cluster}</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Similarity Score</div>
                              <div className="text-secondary">{investigationData.cluster_comparison.similarity_score}%</div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Deviation</div>
                              <div className={investigationData.cluster_comparison.deviation_level === 'High' ? 'text-critical' : investigationData.cluster_comparison.deviation_level === 'Medium' ? 'text-warning' : 'text-secondary'}>
                                {investigationData.cluster_comparison.deviation_level}
                              </div>
                            </div>
                          </>
                        ) : (
                           <div className="flex items-center space-x-2 text-white/40"><Loader2 className="w-3 h-3 animate-spin" /><span>Computing similarity matrix...</span></div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 4: Model Analysis */}
                <div className={`flex gap-6 transition-opacity duration-700 ${searchStep >= 4 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="mt-1 flex flex-col items-center z-10 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border transition-colors duration-500 ${searchStep >= 4 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-white/5 border-white/10 text-white/30 bg-[#0c0c14]'}`}>4</div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-3">Model Analysis</h3>
                    {searchStep >= 4 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-white/5 border border-white/10 rounded-lg p-4 font-mono text-sm text-white/60 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {investigationData ? (
                          <>
                            <div className="bg-black/20 p-3 rounded border border-white/5">
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Isolation Forest</div>
                              <div className={investigationData.model_analysis.isolation_forest_result === 'Anomaly' ? 'text-critical' : 'text-secondary'}>
                                {investigationData.model_analysis.isolation_forest_result}
                              </div>
                            </div>
                            <div className="bg-black/20 p-3 rounded border border-white/5">
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Transformer Behaviour Model</div>
                              <div className="text-white/90">{investigationData.model_analysis.transformer_score.toFixed(1)}</div>
                            </div>
                            <div className="bg-black/20 p-3 rounded border border-white/5">
                              <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1 flex items-center"><span className="w-1.5 h-1.5 bg-primary rounded-full mr-2"></span>Threat Fusion Score</div>
                              <div className="text-white/90">{investigationData.model_analysis.threat_fusion_score.toFixed(1)}</div>
                            </div>
                          </>
                        ) : (
                          <div className="col-span-3 flex items-center space-x-2 text-white/40"><Loader2 className="w-3 h-3 animate-spin" /><span>Running existing models...</span></div>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

                {/* Step 5: AI Explanation */}
                <div className={`flex gap-6 transition-opacity duration-700 ${searchStep >= 5 ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="mt-1 flex flex-col items-center z-10 shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs border transition-colors duration-500 ${searchStep >= 5 ? 'bg-primary/20 border-primary text-primary shadow-[0_0_10px_rgba(147,51,234,0.5)]' : 'bg-white/5 border-white/10 text-white/30 bg-[#0c0c14]'}`}>5</div>
                  </div>
                  <div className="w-full">
                    <h3 className="text-white font-medium text-sm tracking-wider uppercase mb-3">AI Explanation</h3>
                    {searchStep >= 5 && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-primary/5 border border-primary/20 rounded-lg p-5">
                        {investigationData && (
                          <>
                            <div className={`inline-block mb-4 px-3 py-1 text-xs font-mono tracking-widest uppercase border rounded ${investigationData.model_analysis.threat_fusion_score > 70 ? 'bg-critical/20 text-critical border-critical/30' : investigationData.model_analysis.threat_fusion_score > 35 ? 'bg-warning/20 text-warning border-warning/30' : 'bg-secondary/20 text-secondary border-secondary/30'}`}>
                              {investigationData.model_analysis.threat_fusion_score > 70 ? 'CRITICAL RISK' : investigationData.model_analysis.threat_fusion_score > 35 ? 'MEDIUM RISK' : 'LOW RISK'}
                            </div>
                            <div className="text-white/80 text-sm leading-relaxed whitespace-pre-line mb-4 font-mono">
                              {investigationData.ai_explanation}
                            </div>
                            <div className="text-[9px] uppercase tracking-widest text-primary/60 flex items-center">
                              <span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2" />
                              Simulation Data Source: {investigationData.data_source}
                            </div>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>
                </div>

              </div>
            </GlassCard>
          </motion.div>
        )}
      </Container>
      <SystemStatusFooter />
    </>
  );
};
