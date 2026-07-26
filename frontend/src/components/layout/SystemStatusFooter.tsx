import React from 'react';

export const SystemStatusFooter: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#08080D]/90 backdrop-blur-md border-t border-white/10 h-10 flex items-center px-6">
      <div className="flex items-center justify-between w-full max-w-[1400px] mx-auto text-[10px] font-mono text-white/50 uppercase tracking-widest">
        
        <div className="flex items-center space-x-6 w-full justify-between md:justify-start">
          <div className="flex items-center space-x-2">
            <span className="text-white/40">CORE STATUS</span>
            <div className="flex items-center text-secondary">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_5px_rgba(45,212,191,0.8)] mr-1.5 animate-pulse" />
              ONLINE
            </div>
          </div>
        </div>
        
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <span className="text-white/40">ACTIVE MODELS</span>
            <span className="text-white/80">3</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white/40">LATENCY</span>
            <span className="text-white/80">120ms</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white/40">LAST ANALYSIS</span>
            <span className="text-white/80">2s AGO</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};
