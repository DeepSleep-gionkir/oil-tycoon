
import React from 'react';
import { UpgradeStats, UpgradeType } from '../types';
import { FaLock } from 'react-icons/fa';

interface UpgradeCardProps {
  upgrade: UpgradeStats;
  name: string;
  description: string;
  canAfford: boolean;
  onBuy: (type: UpgradeType) => void;
  currentEffect: number;
  currentText: string;
  nextText: string;
  upgradeBtnText: string;
  isLocked: boolean;
  lockReason?: string;
}

const UpgradeCard: React.FC<UpgradeCardProps> = ({ 
  upgrade, 
  name, 
  description, 
  canAfford, 
  onBuy, 
  currentEffect,
  currentText,
  nextText,
  upgradeBtnText,
  isLocked,
  lockReason
}) => {
  const cost = Math.floor(upgrade.baseCost * Math.pow(upgrade.costMultiplier, upgrade.level));

  if (isLocked) {
    return (
      <div className="bg-slate-900/30 border border-slate-800 rounded-lg p-4 flex items-center justify-center relative overflow-hidden group">
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-slate-500">
           <FaLock className="w-6 h-6 mb-2 text-slate-600" />
           <span className="text-xs font-bold uppercase tracking-widest">{lockReason}</span>
        </div>
        {/* Blurred Content Preview */}
        <div className="opacity-20 blur-sm w-full select-none grayscale">
          <div className="flex justify-between items-start mb-1">
            <h4 className="font-tech text-slate-400 font-bold text-lg">{name}</h4>
          </div>
          <p className="text-xs text-slate-500 mb-3">{description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 flex flex-col justify-between hover:bg-slate-800 transition-colors">
      <div>
        <div className="flex justify-between items-start mb-1">
          <h4 className="font-tech text-amber-500 font-bold text-lg">{name}</h4>
          <span className="text-xs bg-slate-900 px-2 py-1 rounded text-slate-400">Lvl {upgrade.level}</span>
        </div>
        <p className="text-xs text-slate-400 mb-3 min-h-[2.5em]">{description}</p>
        
        <div className="flex items-center space-x-2 text-xs text-blue-300 font-mono mb-4">
          <span>{currentText}: +{currentEffect.toLocaleString()}</span>
          <span>→</span>
          <span className="text-green-400">{nextText}: +{(currentEffect + upgrade.effectMultiplier).toLocaleString()}</span>
        </div>
      </div>

      <button
        onClick={() => onBuy(upgrade.id)}
        disabled={!canAfford}
        className={`
          w-full py-2 px-4 rounded font-bold text-sm flex justify-between items-center
          transition-all duration-200
          ${canAfford 
            ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/20' 
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
        `}
      >
        <span>{upgradeBtnText}</span>
        <span>${cost.toLocaleString()}</span>
      </button>
    </div>
  );
};

export default UpgradeCard;
