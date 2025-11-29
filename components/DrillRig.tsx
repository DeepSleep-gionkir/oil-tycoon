
import React from 'react';
import { TierDef } from '../types';

interface DrillRigProps {
  isDrilling: boolean;
  onManualDrill: () => void;
  level: number;
  levelText: string;
  drillText: string;
  currentTier: TierDef;
  nextTier: TierDef | null;
  onEvolve: () => void;
  canEvolve: boolean;
  evolutionText: string;
  evolveBtnText: string;

}

const DrillRig: React.FC<DrillRigProps> = ({ 
  isDrilling, 
  onManualDrill, 
  level, 
  levelText, 
  drillText,
  currentTier,
  nextTier,
  onEvolve,
  canEvolve,
  evolutionText,
  evolveBtnText,

}) => {
  const containerClass = isDrilling ? "drilling" : "";
  const primaryColor = currentTier.color;
  
  // Speed up animation based on level
  const animSpeed = Math.max(0.1, 0.5 - (level * 0.008)); 

  return (
    <div className={`flex flex-col items-center justify-center h-full relative py-0 ${containerClass} bg-sky-300 overflow-hidden`}>
      
      {/* Main SVG Area */}
      <div className="relative w-full flex-1 flex items-center justify-center">
        <svg
          viewBox="0 0 400 300"
          className="w-full h-full object-cover z-10"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Sky Gradient */}
            <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="100%" stopColor="#bae6fd" />
            </linearGradient>

            {/* Soil Pattern for Texture */}
            <pattern id="soilTexture" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
               <circle cx="2" cy="2" r="1" fill="#3e2723" opacity="0.5" />
               <circle cx="10" cy="12" r="1.5" fill="#3e2723" opacity="0.3" />
               <path d="M 15 5 L 17 7" stroke="#3e2723" strokeWidth="1" opacity="0.4" />
            </pattern>
          </defs>

          {/* --- SKY --- */}
          <rect x="0" y="0" width="400" height="250" fill="url(#skyGradient)" />
          
          {/* Cloud 1: Big, Slow, High */}
          <g className="animate-cloud" opacity="0.7" style={{ animationDuration: '60s', animationDelay: '0s' }}>
            <ellipse cx="50" cy="50" rx="30" ry="15" fill="#fff" />
            <ellipse cx="70" cy="60" rx="25" ry="12" fill="#fff" />
            <ellipse cx="30" cy="60" rx="20" ry="10" fill="#fff" />
          </g>

          {/* Cloud 2: Medium, Faster, Lower */}
          <g className="animate-cloud" opacity="0.5" style={{ animationDuration: '45s', animationDelay: '-15s' }}>
            <ellipse cx="20" cy="90" rx="40" ry="20" fill="#fff" />
            <ellipse cx="50" cy="95" rx="30" ry="15" fill="#fff" />
          </g>

          {/* Cloud 3: Small, Very Slow, Very High */}
          <g className="animate-cloud" opacity="0.4" style={{ animationDuration: '80s', animationDelay: '-30s' }}>
            <ellipse cx="20" cy="30" rx="25" ry="12" fill="#fff" />
            <ellipse cx="40" cy="35" rx="20" ry="10" fill="#fff" />
          </g>

          {/* Mountains (Background) */}
          <path d="M -50 250 L 50 150 L 150 250 Z" fill="#64748b" opacity="0.5" />
          <path d="M 100 250 L 250 120 L 400 250 Z" fill="#475569" opacity="0.6" />
          <path d="M 300 250 L 380 180 L 460 250 Z" fill="#64748b" opacity="0.5" />

          {/* Trees (Horizon) */}
          <g transform="translate(0, -10)">
            <path d="M 30 250 L 40 220 L 50 250 Z" fill="#15803d" />
            <rect x="38" y="250" width="4" height="5" fill="#3f2e26" />
            
            <path d="M 80 250 L 95 210 L 110 250 Z" fill="#166534" />
            <rect x="92" y="250" width="6" height="5" fill="#3f2e26" />

            <path d="M 320 250 L 335 215 L 350 250 Z" fill="#15803d" />
            <rect x="332" y="250" width="6" height="5" fill="#3f2e26" />

            <path d="M 360 250 L 370 230 L 380 250 Z" fill="#166534" />
            <rect x="368" y="250" width="4" height="5" fill="#3f2e26" />
          </g>

          {/* --- GROUND (SOIL) --- */}
          {/* Base Soil Color */}
          <rect x="0" y="250" width="400" height="300" fill="#5d4037" />
          {/* Texture Overlay */}
          <rect x="0" y="250" width="400" height="300" fill="url(#soilTexture)" />
          
          {/* Grass Top Layer */}
          <rect x="0" y="250" width="400" height="8" fill="#4ade80" />
          <path d="M 0 250 L 400 250" stroke="#16a34a" strokeWidth="2" />
          
          {/* --- OIL PIPE & FLOW (Underground) --- */}
          <line x1="200" y1="250" x2="200" y2="400" stroke="#262626" strokeWidth="12" />
          <line x1="200" y1="250" x2="200" y2="400" stroke={primaryColor} strokeWidth="6" className={isDrilling ? 'animate-oil-flow' : 'opacity-0'} />

          {/* --- THE SIMPLE DRILL RIG (Robust Industrial Auger) --- */}
          
          {/* Legs (Tripod) - Planted on the ground (y=252), Apex at y=140 */}
          <path d="M 160 252 L 190 140" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          <path d="M 240 252 L 210 140" stroke="#334155" strokeWidth="8" strokeLinecap="round" />
          <circle cx="160" cy="252" r="4" fill="#1e293b" />
          <circle cx="240" cy="252" r="4" fill="#1e293b" />
          
          {/* Platform / Motor Housing (Industrial Gearbox) */}
          <g transform="translate(175, 120)">
            {/* Main Gearbox Block */}
            <rect x="0" y="0" width="50" height="40" rx="2" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            
            {/* Front Panel with Bolts */}
            <rect x="5" y="5" width="40" height="30" rx="1" fill="#334155" />
            <circle cx="8" cy="8" r="1.5" fill="#94a3b8" />
            <circle cx="42" cy="8" r="1.5" fill="#94a3b8" />
            <circle cx="8" cy="32" r="1.5" fill="#94a3b8" />
            <circle cx="42" cy="32" r="1.5" fill="#94a3b8" />
            
            {/* Cooling Vents (Side) */}
            <line x1="-2" y1="10" x2="0" y2="10" stroke="#1e293b" strokeWidth="2" />
            <line x1="-2" y1="16" x2="0" y2="16" stroke="#1e293b" strokeWidth="2" />
            <line x1="-2" y1="22" x2="0" y2="22" stroke="#1e293b" strokeWidth="2" />
            <line x1="50" y1="10" x2="52" y2="10" stroke="#1e293b" strokeWidth="2" />
            <line x1="50" y1="16" x2="52" y2="16" stroke="#1e293b" strokeWidth="2" />
            <line x1="50" y1="22" x2="52" y2="22" stroke="#1e293b" strokeWidth="2" />

            {/* Warning Stripe */}
            <path d="M 5 35 L 45 35" stroke="#fbbf24" strokeWidth="2" strokeDasharray="5 2" />
          </g>
          
          {/* --- DRILL SHAFT (Auger) --- */}
          {/* The spinning shaft */}
          <line 
            x1="200" 
            y1="160" 
            x2="200" 
            y2="250" 
            stroke={primaryColor} 
            strokeWidth="16" 
            className={isDrilling ? 'animate-drill-auger' : ''}
            strokeDasharray="15 15"
            style={{ animationDuration: `${animSpeed}s`}}
          />
          
          {/* Drill Bit Head (Touching Ground) */}
          <path d="M 192 250 L 208 250 L 200 270 Z" fill={primaryColor} stroke="#1e293b" strokeWidth="1" />

          {/* Top Fan (Spinning on top) - Better Design */}
          <g transform="translate(200, 110)">
            {/* Fan Housing Base */}
            <path d="M -16 10 L 16 10 L 12 -2 L -12 -2 Z" fill="#334155" stroke="#1e293b" strokeWidth="1" />
            {/* Spindle */}
            <rect x="-2" y="-4" width="4" height="6" fill="#1e293b" />
            
            {/* Spinning Blades (Visualized as ellipse scaling) */}
            <ellipse 
               cx="0" 
               cy="4" 
               rx="12" 
               ry="3" 
               fill="#cbd5e1" 
               stroke="#475569"
               strokeWidth="0.5"
               className={isDrilling ? 'animate-pulse' : ''} 
               style={{ animationDuration: '0.1s' }}
            />
          </g>

          {/* Dirt Splatter particles */}
          {isDrilling && (
             <g>
                <circle cx="190" cy="245" r="2" fill="#5d4037" className="animate-ping" />
                <circle cx="210" cy="245" r="2" fill="#5d4037" className="animate-ping" style={{animationDelay: '0.1s'}} />
                <circle cx="195" cy="248" r="1.5" fill="#3e2723" className="animate-ping" style={{animationDelay: '0.05s'}} />
             </g>
          )}

        </svg>

        {/* Level Badge (Floating Overlay) */}
        <div className="absolute top-16 left-1/2 -translate-x-1/2 bg-slate-900/90 backdrop-blur px-4 py-2 rounded-full border border-slate-700 shadow-xl flex flex-col items-center">
           <span className="text-[10px] text-slate-400 uppercase tracking-widest">{levelText}</span>
           <span className="text-xl font-mono font-bold" style={{color: primaryColor}}>{level}</span>
        </div>
      </div>

      {/* Evolution Panel (Floating Overlay at Bottom) */}
      <div className="absolute bottom-24 w-full px-6 z-20 max-w-md pointer-events-none">
         {nextTier ? (
           <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-3 flex items-center justify-between backdrop-blur-sm pointer-events-auto shadow-2xl">
              <div className="flex flex-col">
                <span className="text-[10px] text-slate-500 uppercase font-bold">{evolutionText}</span>
                <div className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{backgroundColor: currentTier.color}}></div>
                   <span className="text-xs text-slate-400">x{currentTier.multiplier.toLocaleString()}</span>
                   <span className="text-slate-600">→</span>
                   <div className="w-3 h-3 rounded-full animate-pulse" style={{backgroundColor: nextTier.color}}></div>
                   <span className="text-xs text-white font-bold">x{nextTier.multiplier.toLocaleString()}</span>
                </div>
              </div>
              
              <button 
                onClick={onEvolve}
                disabled={!canEvolve}
                className={`
                  px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider flex flex-col items-end transition-all
                  ${canEvolve ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-500/30' : 'bg-slate-800 text-slate-500 border border-slate-700'}
                `}
              >
                <span>{evolveBtnText}</span>
                <span>${nextTier.cost.toLocaleString()}</span>
              </button>
           </div>
         ) : (
           <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-3 text-center text-xs text-slate-500 font-mono pointer-events-auto">
             MAX EVOLUTION REACHED
           </div>
         )}
      </div>

      {/* Manual Drill Button (Bottom Stick) */}
      <div className="w-full bg-slate-900 p-4 pb-6 z-30 shadow-[0_-5px_20px_rgba(0,0,0,0.5)] border-t border-slate-800">
        <button
          onClick={onManualDrill}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-900/40 border-b-4 border-orange-800 active:border-b-0 active:translate-y-1 transition-all flex flex-col items-center justify-center gap-1 group relative overflow-hidden max-w-lg mx-auto"
        >
          <span className="uppercase tracking-[0.2em] text-sm text-orange-200 z-10 relative">{drillText}</span>
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
      </div>
    </div>
  );
};

export default DrillRig;
