import React from 'react';

export const ReasoningTrace: React.FC<{ explanation: string }> = ({ explanation }) => {
  const traces = [
    { time: '0m', title: 'AI Reasoning Output', desc: explanation, type: 'critical' },
  ];

  return (
    <div className="relative pl-6">
      <div className="absolute left-2.5 top-2 bottom-2 w-px bg-white/10" />
      <div className="space-y-8">
        {traces.map((trace, idx) => (
          <div key={idx} className="relative">
            <div className={`absolute -left-[27px] top-1.5 w-3 h-3 rounded-full border-2 border-background
              ${trace.type === 'normal' ? 'bg-primary shadow-[0_0_8px_rgba(147,51,234,0.8)]' : ''}
              ${trace.type === 'suspicious' ? 'bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]' : ''}
              ${trace.type === 'critical' ? 'bg-critical shadow-[0_0_8px_rgba(244,63,94,0.8)]' : ''}
            `} />
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-white font-medium mb-1">{trace.title}</h4>
                <p className="text-white/60 text-sm whitespace-pre-wrap">{trace.desc}</p>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{trace.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
