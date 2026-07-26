import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { CommandCenter } from './pages/CommandCenter';
import { Investigations } from './pages/Investigations';
import { AICore } from './pages/AICore';
import { BehaviourEvolution } from './pages/BehaviourEvolution';
import { AnimatePresence, motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <Navbar />
      
      {/* Route wrapper with Framer Motion for smooth page transitions */}
      <AnimatePresence mode="wait">
        <main className="flex-1 w-full relative">
          <Routes>
            <Route path="/" element={<PageWrapper><CommandCenter /></PageWrapper>} />
            <Route path="/command-center" element={<Navigate to="/" replace />} />
            <Route path="/investigations" element={<PageWrapper><Investigations /></PageWrapper>} />
            <Route path="/ai-core" element={<PageWrapper><AICore /></PageWrapper>} />
            <Route path="/behaviour-evolution" element={<PageWrapper><BehaviourEvolution /></PageWrapper>} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </AnimatePresence>
    </div>
  );
}

// Simple wrapper for page transitions
const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default App;
