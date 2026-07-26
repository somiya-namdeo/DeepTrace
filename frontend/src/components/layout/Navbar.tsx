import React from 'react';
import { NavLink } from 'react-router-dom';
import { Badge } from '../common/Badge';

export const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Command Center', path: '/' },
    { name: 'Investigations', path: '/investigations' },
    { name: 'AI Core', path: '/ai-core' },
    { name: 'Behaviour Evolution', path: '/behaviour-evolution' },
    { name: 'Behaviour Investigation', path: '/behaviour-investigation' },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-surface/80 backdrop-blur-md">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center space-x-3">
          <img src="/logo.png" alt="DeepTrace Logo" className="h-9 hover:scale-105 transition-transform duration-300" />
          <div>
            <h1 className="text-white font-semibold text-lg leading-tight tracking-wide">DeepTrace</h1>
            <p className="text-muted text-[10px] uppercase tracking-widest font-mono">AI Intelligence Console</p>
          </div>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md text-sm transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary/10 text-white font-medium' 
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Status */}
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="border-secondary/30 text-secondary bg-secondary/10 px-3 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary mr-2 shadow-[0_0_5px_rgba(45,212,191,0.5)] animate-pulse"></span>
            System Online
          </Badge>
        </div>

      </div>
    </nav>
  );
};
