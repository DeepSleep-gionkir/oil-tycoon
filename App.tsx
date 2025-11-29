
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FaBolt, FaBox, FaChartLine, FaIndustry } from 'react-icons/fa';
import { GameState, UpgradeType, UpgradeStats, MarketPoint, Notification, Language, UpgradeCategory, DrillTierId } from './types';
import { INITIAL_UPGRADES, TICK_RATE_MS, MARKET_UPDATE_MS, INITIAL_MARKET_PRICE, MIN_MARKET_PRICE, MAX_MARKET_PRICE, TRANSLATIONS, DRILL_TIERS } from './constants';
import MarketChart from './components/MarketChart';
import DrillRig from './components/DrillRig';
import UpgradeCard from './components/UpgradeCard';

type Tab = 'market' | 'drill' | 'upgrade';

const App: React.FC = () => {
  // --- State ---
  const [lang, setLang] = useState<Language>('ko'); 
  const t = TRANSLATIONS[lang] || TRANSLATIONS['en']; 
  const [activeTab, setActiveTab] = useState<Tab>('drill');
  const [upgradeCategory, setUpgradeCategory] = useState<UpgradeCategory>('BASIC');

  const [gameState, setGameState] = useState<GameState>({
    money: 0,
    oil: 0,
    totalOilMined: 0,
    startTime: Date.now(),
    drillTier: DrillTierId.RUSTY,
  });

  const [upgrades, setUpgrades] = useState<Record<UpgradeType, UpgradeStats>>(INITIAL_UPGRADES);
  const [marketPrice, setMarketPrice] = useState<number>(INITIAL_MARKET_PRICE);
  const [marketHistory, setMarketHistory] = useState<MarketPoint[]>([]);
  const [isDrilling, setIsDrilling] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const drillTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // --- Derived Stats (with Global Multiplier) ---
  const currentTierDef = DRILL_TIERS[gameState.drillTier] || DRILL_TIERS[DrillTierId.RUSTY];
  const globalMultiplier = currentTierDef.multiplier;

  const getEffect = (type: UpgradeType) => {
      const u = upgrades[type];
      if (!u) return 0; 
      return u.level * u.effectMultiplier;
  };

  // Manual Power
  const manualDrillPowerBase = 1 + 
    getEffect(UpgradeType.DRILL_BIT) + 
    getEffect(UpgradeType.MANUAL_PUMP) +
    getEffect(UpgradeType.REINFORCED_HANDLE) +
    getEffect(UpgradeType.SAFETY_HELMET) +
    getEffect(UpgradeType.WORK_BOOTS) +
    getEffect(UpgradeType.STEEL_PIPE) +
    getEffect(UpgradeType.SAFETY_VALVE) +
    getEffect(UpgradeType.DIAMOND_BIT);
    
  const manualDrillPower = manualDrillPowerBase * globalMultiplier;

  // Auto Power
  const autoProductionBase = 
    getEffect(UpgradeType.AUTO_PUMP) +
    getEffect(UpgradeType.GRAVEL_ROAD) + 
    getEffect(UpgradeType.FLOODLIGHTS) +
    getEffect(UpgradeType.COFFEE_MACHINE) +
    getEffect(UpgradeType.COPPER_WIRING) +
    getEffect(UpgradeType.LUBRICANT) + 
    getEffect(UpgradeType.RUBBER_SEALS) +
    getEffect(UpgradeType.MUD_PUMP) +
    getEffect(UpgradeType.HYDRAULIC_PRESS) +
    getEffect(UpgradeType.GENERATOR) +
    getEffect(UpgradeType.GEOLOGY_MAP) + 
    getEffect(UpgradeType.FRACKING) +
    getEffect(UpgradeType.DEEP_SCAN) +
    getEffect(UpgradeType.COMPUTER_CONTROL) + 
    getEffect(UpgradeType.PUMP_JACK_TURBO) +
    getEffect(UpgradeType.COOLING_SYSTEM) +
    getEffect(UpgradeType.OFFSHORE_RIG) +
    getEffect(UpgradeType.PIPELINE_NETWORK) +
    getEffect(UpgradeType.AI_MINING) +
    getEffect(UpgradeType.FUSION_REACTOR) +
    getEffect(UpgradeType.ORBITAL_LASER) + 
    getEffect(UpgradeType.ASTEROID_MINING) +
    getEffect(UpgradeType.DYSON_SPHERE) +
    getEffect(UpgradeType.QUANTUM_DRILL) +
    getEffect(UpgradeType.NANOBOT_REPAIR) +
    getEffect(UpgradeType.REALITY_WARP) +
    getEffect(UpgradeType.TIME_COMPRESSION) +
    getEffect(UpgradeType.MATTER_SYNTHESIS) +
    getEffect(UpgradeType.UNIVERSAL_SIPHON) +
    getEffect(UpgradeType.UNION_DEAL) +          
    getEffect(UpgradeType.CONGLOMERATE_MERGER) + 
    getEffect(UpgradeType.WORLD_BANK_LOAN);      
    
  const autoProduction = autoProductionBase * globalMultiplier;

  // Storage (Base 30)
  const maxStorage = 
    30 + 
    getEffect(UpgradeType.STORAGE) + 
    getEffect(UpgradeType.IRON_TANK) +
    getEffect(UpgradeType.RESERVOIR_EXPANSION) + 
    getEffect(UpgradeType.EXPANDED_TANKS) +
    getEffect(UpgradeType.CEMENT_BASE) +
    getEffect(UpgradeType.STEEL_BEAMS);

  // Price Bonus
  const refineryBonus = 1 + 
    getEffect(UpgradeType.REFINERY) + 
    getEffect(UpgradeType.SATELLITE_LINK) + 
    getEffect(UpgradeType.POLITICAL_LOBBY) + 
    getEffect(UpgradeType.EXPORT_CONTRACT) + 
    getEffect(UpgradeType.ACCOUNTING_FIRM) +
    getEffect(UpgradeType.LEGAL_TEAM) +
    getEffect(UpgradeType.STOCK_OPTIONS);
    
  const marketingFloor = MIN_MARKET_PRICE * (1 + getEffect(UpgradeType.MARKETING));

  // --- Helpers ---
  const addNotification = (message: string, type: 'success' | 'warning' | 'info' = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev.slice(-4), { id, message, type }]); 
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 3000);
  };

  const getUpgradeCost = (type: UpgradeType) => {
    const u = upgrades[type];
    if (!u) return 9999999999999;
    return Math.floor(u.baseCost * Math.pow(u.costMultiplier, u.level));
  };

  const handleBuyUpgrade = (type: UpgradeType) => {
    const cost = getUpgradeCost(type);
    if (gameState.money >= cost) {
      setGameState(prev => ({ ...prev, money: prev.money - cost }));
      setUpgrades(prev => ({
        ...prev,
        [type]: { ...prev[type], level: prev[type].level + 1 }
      }));
      
      // Safety check for translation
      const info = t.upgradesInfo[type];
      const upgradeName = info ? info.name : type;
      addNotification(`${t.purchased} ${upgradeName}`, 'success');
    }
  };

  const handleEvolve = () => {
    const tiers = Object.values(DRILL_TIERS);
    const currentIndex = tiers.findIndex(tier => tier.id === gameState.drillTier);
    if (currentIndex < tiers.length - 1) {
      const nextTier = tiers[currentIndex + 1];
      if (gameState.money >= nextTier.cost) {
        setGameState(prev => ({
          ...prev,
          money: prev.money - nextTier.cost,
          drillTier: nextTier.id
        }));
        
        // Safety check for tier name
        const tierNameKey = nextTier.name as keyof typeof t.tiers;
        const tierName = t.tiers[tierNameKey] || nextTier.name;
        addNotification(`${t.evolution} ${tierName}!`, 'success');
      }
    }
  };

  const addOil = useCallback((amount: number, currentStorageMax: number) => {
    setGameState(prev => {
      if (prev.oil >= currentStorageMax) return prev; 
      const space = currentStorageMax - prev.oil;
      const added = Math.min(space, amount);
      if (added <= 0) return prev;
      
      return {
        ...prev,
        oil: prev.oil + added,
        totalOilMined: prev.totalOilMined + added
      };
    });
  }, []); 

  const sellOil = () => {
    if (gameState.oil <= 0) return;
    
    const finalPricePerBarrel = marketPrice * refineryBonus;
    const earned = Math.floor(gameState.oil * finalPricePerBarrel);
    const amountSold = gameState.oil;

    setGameState(prev => ({
      ...prev,
      money: prev.money + earned,
      oil: 0
    }));

    addNotification(`${t.sold} ${amountSold.toFixed(1)} bbl (${t.for} $${earned.toLocaleString()})`, 'success');
  };

  const handleManualDrill = () => {
    if (gameState.oil >= maxStorage) {
      addNotification(t.warningStorage, 'warning');
      return;
    }
    
    setIsDrilling(true);
    addOil(manualDrillPower, maxStorage);

    if (drillTimeoutRef.current) clearTimeout(drillTimeoutRef.current);
    drillTimeoutRef.current = setTimeout(() => setIsDrilling(false), 500);
  };

  useEffect(() => {
    if (autoProduction <= 0) return;
    const interval = setInterval(() => {
      addOil(autoProduction, maxStorage);
    }, TICK_RATE_MS);
    return () => clearInterval(interval);
  }, [autoProduction, maxStorage, addOil]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketPrice(prev => {
        const volatility = 10;
        const change = (Math.random() - 0.5) * volatility;
        let newPrice = prev + change;
        newPrice = Math.max(marketingFloor, Math.min(MAX_MARKET_PRICE, newPrice));
        return Number(newPrice.toFixed(2));
      });
    }, MARKET_UPDATE_MS);
    return () => clearInterval(interval);
  }, [marketingFloor]);

  useEffect(() => {
    setMarketHistory(prev => {
      const now = new Date();
      const timeStr = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
      const newPoint = { time: timeStr, price: marketPrice };
      const newHistory = [...prev, newPoint];
      return newHistory.length > 20 ? newHistory.slice(1) : newHistory;
    });
  }, [marketPrice]);

  const getNextTier = () => {
    const tiers = Object.values(DRILL_TIERS);
    const currentIndex = tiers.findIndex(tier => tier.id === gameState.drillTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
  };

  const checkUnlock = (u: UpgradeStats): { locked: boolean, hidden: boolean, reason?: string } => {
    if (u.level > 0) return { locked: false, hidden: false };
    if (!u.unlockCondition) return { locked: false, hidden: false };

    if (u.unlockCondition.requiredUpgradeId) {
      const reqUpgrade = upgrades[u.unlockCondition.requiredUpgradeId];
      // Safety check: if required upgrade doesn't exist in state, hide this one
      if (!reqUpgrade) return { locked: true, hidden: true }; 
      
      const reqLvl = u.unlockCondition.requiredUpgradeLevel || 1;
      
      if (reqUpgrade.level < reqLvl) {
         return { locked: true, hidden: true, reason: 'Parent Tech Missing' };
      }
    }

    if (u.unlockCondition.moneyRequired && gameState.money < u.unlockCondition.moneyRequired) {
       return { 
         locked: true, 
         hidden: false,
         reason: `${t.reqMoney}${u.unlockCondition.moneyRequired.toLocaleString()}` 
       };
    }
    
    return { locked: false, hidden: false };
  };

  const renderMarketPanel = () => (
    <div className="space-y-4 lg:space-y-6 h-full flex flex-col">
      <div className="hidden lg:block bg-slate-800 p-4 rounded-lg border border-slate-700">
        <h2 className="text-slate-400 text-xs uppercase tracking-wide font-bold mb-1">{t.treasury}</h2>
        <div className="text-3xl text-emerald-400 font-mono font-bold">${gameState.money.toLocaleString()}</div>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg border border-slate-700">
        <div className="flex justify-between items-end mb-1">
          <h2 className="text-slate-400 text-xs uppercase tracking-wide font-bold">{t.storage}</h2>
          <span className="text-xs text-slate-500">{gameState.oil.toFixed(0)} / {maxStorage}</span>
        </div>
        <div className="w-full bg-slate-950 h-4 rounded-full overflow-hidden border border-slate-600 relative mb-4">
          <div 
            className={`h-full transition-all duration-300 ${storagePercent > 90 ? 'bg-red-500' : 'bg-amber-500'}`} 
            style={{ width: `${storagePercent}%` }}
          ></div>
        </div>
        {storagePercent >= 100 && <div className="text-red-400 text-xs mb-2 animate-pulse font-bold text-center">{t.storageFull}</div>}

        <div className="flex justify-between items-center border-b border-slate-700 pb-2 mb-3">
          <span className="text-slate-400 text-sm">{t.marketPrice}</span>
          <div className="text-right">
            <span className="text-xl font-bold text-amber-300 font-mono block">${marketPrice.toFixed(2)}</span>
            <span className="text-xs text-slate-500 uppercase tracking-tight block">{t.marketPriceUnit}</span>
          </div>
        </div>
         <button
          onClick={sellOil}
          disabled={gameState.oil <= 0}
          className={`
            w-full py-3 rounded font-bold text-lg uppercase tracking-wider
            transition-all duration-200 active:scale-95
            ${gameState.oil > 0 
              ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/20' 
              : 'bg-slate-700 text-slate-500 cursor-not-allowed'}
          `}
        >
          {t.sellOil}
        </button>
      </div>

      <div className="flex-1 min-h-[200px]">
        <MarketChart data={marketHistory} chartTitle={t.chartTitle} priceLabel={t.chartPrice} />
      </div>
    </div>
  );

  const renderDrillPanel = () => {
    const nextTier = getNextTier();
    return (
      <div className="relative h-full flex flex-col">
         <div className="absolute top-0 left-0 w-full p-4 flex justify-between z-10 pointer-events-none">
           <div className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg text-xs text-slate-300 border border-slate-700 shadow-xl flex items-center">
             <FaBolt className="text-amber-500 mr-2" /> 
             {(autoProduction).toFixed(1)} {t.perSecond}
           </div>
           <div className="bg-slate-900/80 backdrop-blur px-3 py-1 rounded-lg text-xs text-slate-300 border border-slate-700 shadow-xl">
             {t.total}: {gameState.totalOilMined.toFixed(0)}
           </div>
         </div>
  
         <div className="flex-1 flex flex-col justify-center">
           <DrillRig 
             isDrilling={isDrilling} 
             onManualDrill={handleManualDrill} 
             level={upgrades[UpgradeType.DRILL_BIT]?.level || 1}
             drillText={t.drill}
             levelText={t.rigLevel}
             currentTier={currentTierDef}
             nextTier={nextTier}
             onEvolve={handleEvolve}
             canEvolve={nextTier ? gameState.money >= nextTier.cost : false}
             evolutionText={t.evolution}
             evolveBtnText={t.evolve}
           />
         </div>
      </div>
    );
  };

  const renderUpgradePanel = () => {
    const filteredUpgrades = (Object.values(upgrades) as UpgradeStats[])
      .filter((u) => u.category === upgradeCategory)
      .map(u => {
        const { locked, hidden, reason } = checkUnlock(u);
        return { ...u, locked, hidden, reason };
      })
      .filter(u => !u.hidden) 
      .sort((a, b) => {
        if (a.locked !== b.locked) return a.locked ? 1 : -1;
        return 0;
      });

    return (
      <div className="flex flex-col h-full">
        <h2 className="text-xl font-tech text-white mb-4 hidden lg:flex items-center gap-2 sticky top-0 bg-slate-900 z-10 py-2">
          <FaIndustry className="text-amber-500" />
          {t.upgrades}
        </h2>

        <div className="flex bg-slate-800 p-1 rounded-lg mb-4 shrink-0">
          <button
            onClick={() => setUpgradeCategory('BASIC')}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded transition-colors ${upgradeCategory === 'BASIC' ? 'bg-slate-600 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {t.upgradeTabs.basic}
          </button>
          <button
            onClick={() => setUpgradeCategory('SPECIAL')}
            className={`flex-1 py-2 text-xs font-bold uppercase rounded transition-colors ${upgradeCategory === 'SPECIAL' ? 'bg-amber-700 text-white shadow' : 'text-slate-400 hover:text-slate-200'}`}
          >
            {t.upgradeTabs.special}
          </button>
        </div>

        <div className="space-y-4 pb-4 overflow-y-auto flex-1">
          {filteredUpgrades.length === 0 && (
             <div className="text-center text-slate-500 text-xs py-10 italic">
               More technology will appear as you progress...
             </div>
          )}
          {filteredUpgrades.map((u) => {
             let currentVal = 0;
             // Calculate current effect for display
             const effectMult = u.effectMultiplier;
             if (u.id === UpgradeType.REFINERY || 
                 u.id === UpgradeType.MARKETING ||
                 u.id === UpgradeType.SATELLITE_LINK ||
                 u.id === UpgradeType.POLITICAL_LOBBY) {
                // Percentage based or special logic
                currentVal = u.level * effectMult * 100;
             } else {
                currentVal = u.level * effectMult;
             }

             // Robust Translation Fallback
             const info = t.upgradesInfo[u.id] || { name: u.id, description: '...' };
             
             return (
              <UpgradeCard
                key={u.id}
                upgrade={u}
                name={info.name}
                description={info.description}
                canAfford={gameState.money >= getUpgradeCost(u.id)}
                onBuy={handleBuyUpgrade}
                currentEffect={currentVal}
                currentText={t.current}
                nextText={t.next}
                upgradeBtnText={t.upgrade}
                isLocked={u.locked}
                lockReason={u.reason}
              />
            );
          })}
        </div>
      </div>
    );
  };

  const storagePercent = maxStorage > 0 ? (gameState.oil / maxStorage) * 100 : 0;

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden">
      
      <div className="fixed top-16 lg:top-4 right-4 z-[60] space-y-2 pointer-events-none w-full max-w-sm px-4 lg:px-0">
        {notifications.map(n => (
          <div key={n.id} className={`
            px-4 py-3 rounded shadow-lg border-l-4 pointer-events-auto animate-bounce backdrop-blur-md
            ${n.type === 'success' ? 'bg-slate-800/90 border-green-500 text-green-100' : ''}
            ${n.type === 'warning' ? 'bg-slate-800/90 border-red-500 text-red-100' : ''}
            ${n.type === 'info' ? 'bg-slate-800/90 border-blue-500 text-blue-100' : ''}
          `}>
            {n.message}
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row h-full">

        <aside className="hidden lg:flex w-1/3 lg:w-1/4 bg-slate-900 border-r border-slate-800 p-6 flex-col overflow-y-auto shrink-0 z-20">
          <header className="mb-6">
            <h1 className="text-3xl font-bold text-amber-500 font-tech">{t.title}</h1>
            <span className="text-slate-400 text-xs tracking-widest block">{t.edition}</span>
             <button 
               onClick={() => setLang(prev => prev === 'en' ? 'ko' : 'en')}
               className="mt-2 bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 py-1 px-3 rounded border border-slate-600 transition-colors"
             >
               {lang === 'en' ? '🇰🇷 KO' : '🇺🇸 EN'}
             </button>
          </header>
          {renderMarketPanel()}
        </aside>

        <main className="hidden lg:block w-full lg:w-2/4 bg-slate-950 relative border-r border-slate-800">
           {renderDrillPanel()}
        </main>

        <aside className="hidden lg:block w-full lg:w-1/4 bg-slate-900 p-6 overflow-hidden border-t lg:border-t-0 border-slate-800">
          {renderUpgradePanel()}
        </aside>

        <div className="lg:hidden flex-1 flex flex-col relative overflow-hidden">
          
          <div className="bg-slate-900 border-b border-slate-800 p-3 flex justify-between items-center z-30 shadow-md">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500 font-bold tracking-wider">{t.treasury}</span>
              <span className="text-emerald-400 font-mono font-bold text-lg">${gameState.money.toLocaleString()}</span>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="flex flex-col text-right">
                <span className="text-xs text-slate-500 font-bold tracking-wider">{t.storage}</span>
                <span className={`font-mono text-sm ${storagePercent >= 100 ? 'text-red-400 animate-pulse' : 'text-slate-300'}`}>
                  {gameState.oil.toFixed(0)} / {maxStorage}
                </span>
              </div>
              <button 
                 onClick={() => setLang(prev => prev === 'en' ? 'ko' : 'en')}
                 className="bg-slate-800 text-xs text-slate-300 py-1 px-2 rounded border border-slate-700"
               >
                 {lang === 'en' ? 'KO' : 'EN'}
               </button>
            </div>
          </div>

          <div className={`flex-1 relative ${activeTab === 'drill' ? 'overflow-hidden' : 'overflow-y-auto p-4 pb-20'}`}>
            {activeTab === 'market' && renderMarketPanel()}
            {activeTab === 'drill' && (
               <div className="absolute inset-x-0 top-0 bottom-16">
                 {renderDrillPanel()}
               </div>
            )}
            {activeTab === 'upgrade' && renderUpgradePanel()}
          </div>

          <div className="absolute bottom-0 left-0 w-full bg-slate-900 border-t border-slate-800 h-16 flex justify-around items-center z-40 pb-safe">
            <button 
              onClick={() => setActiveTab('market')}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'market' ? 'text-amber-500 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaChartLine className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wide">{t.tabs.market}</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('drill')}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'drill' ? 'text-amber-500 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <div className={`p-2 rounded-full -mt-6 border-4 border-slate-900 ${activeTab === 'drill' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-400'}`}>
                <FaIndustry className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wide mt-1">{t.tabs.drill}</span>
            </button>

            <button 
              onClick={() => setActiveTab('upgrade')}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors ${activeTab === 'upgrade' ? 'text-amber-500 bg-slate-800/50' : 'text-slate-500 hover:text-slate-300'}`}
            >
              <FaBox className="w-6 h-6 mb-1" />
              <span className="text-[10px] font-bold uppercase tracking-wide">{t.tabs.upgrade}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default App;
