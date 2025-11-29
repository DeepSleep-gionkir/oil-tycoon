
import { UpgradeType, UpgradeStats, DrillTierId, TierDef } from './types';

export const TICK_RATE_MS = 1000;
export const MARKET_UPDATE_MS = 2000;
export const AUTO_SAVE_MS = 10000;

// Economy Settings
export const INITIAL_MARKET_PRICE = 12; 
export const MIN_MARKET_PRICE = 5;
export const MAX_MARKET_PRICE = 35;

// BALANCED TIERS (Slower Start, Smooth Curve)
export const DRILL_TIERS: Record<DrillTierId, TierDef> = {
  [DrillTierId.RUSTY]:    { id: DrillTierId.RUSTY,    name: 'tierRusty',    multiplier: 1,               cost: 0,              color: '#94a3b8' }, 
  [DrillTierId.IRON]:     { id: DrillTierId.IRON,     name: 'tierIron',     multiplier: 4,               cost: 15000,          color: '#cbd5e1' }, // User requested: x4 for $15k
  [DrillTierId.TITANIUM]: { id: DrillTierId.TITANIUM, name: 'tierTitanium', multiplier: 12,              cost: 250000,         color: '#60a5fa' }, 
  [DrillTierId.GOLDEN]:   { id: DrillTierId.GOLDEN,   name: 'tierGolden',   multiplier: 40,              cost: 5000000,        color: '#facc15' }, 
  [DrillTierId.EMERALD]:  { id: DrillTierId.EMERALD,  name: 'tierEmerald',  multiplier: 150,             cost: 100000000,      color: '#34d399' }, 
  [DrillTierId.OBSIDIAN]: { id: DrillTierId.OBSIDIAN, name: 'tierObsidian', multiplier: 600,             cost: 2500000000,     color: '#c084fc' }, 
  [DrillTierId.QUANTUM]:  { id: DrillTierId.QUANTUM,  name: 'tierQuantum',  multiplier: 3000,            cost: 80000000000,    color: '#22d3ee' }, 
  [DrillTierId.PLASMA]:   { id: DrillTierId.PLASMA,   name: 'tierPlasma',   multiplier: 15000,           cost: 5000000000000,  color: '#f43f5e' }, 
  [DrillTierId.ANTIMATTER]:{id: DrillTierId.ANTIMATTER,name:'tierAntimatter',multiplier: 100000,         cost: 500000000000000,color: '#1e293b' },
  [DrillTierId.VOID]:     { id: DrillTierId.VOID,     name: 'tierVoid',     multiplier: 800000,          cost: 80000000000000000,color:'#000000' },
  [DrillTierId.COSMIC]:   { id: DrillTierId.COSMIC,   name: 'tierCosmic',   multiplier: 10000000,        cost: 9000000000000000000,color:'#ffffff'},
  [DrillTierId.INFINITY]: { id: DrillTierId.INFINITY, name: 'tierInfinity', multiplier: 1000000000,      cost: 9999999999999999999,color:'#ec4899'},
};

export const INITIAL_UPGRADES: Record<UpgradeType, UpgradeStats> = {
  // --- TIER 1: BASICS ---
  [UpgradeType.DRILL_BIT]: {
    id: UpgradeType.DRILL_BIT, category: 'BASIC', level: 1, baseCost: 150, costMultiplier: 1.5, effectMultiplier: 1, 
  },
  [UpgradeType.SAFETY_HELMET]: {
    id: UpgradeType.SAFETY_HELMET, category: 'BASIC', level: 0, baseCost: 300, costMultiplier: 1.4, effectMultiplier: 2,
    unlockCondition: { requiredUpgradeId: UpgradeType.DRILL_BIT, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.WORK_BOOTS]: {
    id: UpgradeType.WORK_BOOTS, category: 'BASIC', level: 0, baseCost: 600, costMultiplier: 1.4, effectMultiplier: 3,
    unlockCondition: { requiredUpgradeId: UpgradeType.SAFETY_HELMET, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.STORAGE]: {
    id: UpgradeType.STORAGE, category: 'BASIC', level: 0, baseCost: 500, costMultiplier: 1.8, effectMultiplier: 30, 
    unlockCondition: { requiredUpgradeId: UpgradeType.DRILL_BIT, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.MANUAL_PUMP]: {
    id: UpgradeType.MANUAL_PUMP, category: 'BASIC', level: 0, baseCost: 1000, costMultiplier: 1.6, effectMultiplier: 5, 
    unlockCondition: { requiredUpgradeId: UpgradeType.WORK_BOOTS, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.REINFORCED_HANDLE]: {
    id: UpgradeType.REINFORCED_HANDLE, category: 'BASIC', level: 0, baseCost: 2500, costMultiplier: 1.5, effectMultiplier: 10,
    unlockCondition: { requiredUpgradeId: UpgradeType.MANUAL_PUMP, requiredUpgradeLevel: 3 }
  },

  // --- TIER 2: INFRASTRUCTURE ---
  [UpgradeType.GRAVEL_ROAD]: {
    id: UpgradeType.GRAVEL_ROAD, category: 'BASIC', level: 0, baseCost: 3500, costMultiplier: 1.5, effectMultiplier: 0.5,
    unlockCondition: { moneyRequired: 2000 }
  },
  [UpgradeType.AUTO_PUMP]: {
    id: UpgradeType.AUTO_PUMP, category: 'BASIC', level: 0, baseCost: 5000, costMultiplier: 1.6, effectMultiplier: 2, 
    unlockCondition: { requiredUpgradeId: UpgradeType.GRAVEL_ROAD, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.FLOODLIGHTS]: {
    id: UpgradeType.FLOODLIGHTS, category: 'BASIC', level: 0, baseCost: 6000, costMultiplier: 1.5, effectMultiplier: 1.5,
    unlockCondition: { requiredUpgradeId: UpgradeType.AUTO_PUMP, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.STEEL_PIPE]: {
    id: UpgradeType.STEEL_PIPE, category: 'BASIC', level: 0, baseCost: 8000, costMultiplier: 1.6, effectMultiplier: 3, 
    unlockCondition: { requiredUpgradeId: UpgradeType.AUTO_PUMP, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.COFFEE_MACHINE]: {
    id: UpgradeType.COFFEE_MACHINE, category: 'BASIC', level: 0, baseCost: 9000, costMultiplier: 2.0, effectMultiplier: 5,
    unlockCondition: { requiredUpgradeId: UpgradeType.FLOODLIGHTS, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.IRON_TANK]: {
    id: UpgradeType.IRON_TANK, category: 'BASIC', level: 0, baseCost: 12000, costMultiplier: 1.9, effectMultiplier: 100, 
    unlockCondition: { requiredUpgradeId: UpgradeType.STORAGE, requiredUpgradeLevel: 5 }
  },

  // --- TIER 3: INDUSTRIALIZATION ---
  [UpgradeType.COPPER_WIRING]: {
    id: UpgradeType.COPPER_WIRING, category: 'BASIC', level: 0, baseCost: 15000, costMultiplier: 1.5, effectMultiplier: 2,
    unlockCondition: { requiredUpgradeId: UpgradeType.COFFEE_MACHINE, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.LUBRICANT]: {
    id: UpgradeType.LUBRICANT, category: 'BASIC', level: 0, baseCost: 18000, costMultiplier: 1.5, effectMultiplier: 2.5, 
    unlockCondition: { requiredUpgradeId: UpgradeType.AUTO_PUMP, requiredUpgradeLevel: 8 }
  },
  [UpgradeType.RUBBER_SEALS]: {
    id: UpgradeType.RUBBER_SEALS, category: 'BASIC', level: 0, baseCost: 22000, costMultiplier: 1.6, effectMultiplier: 3,
    unlockCondition: { requiredUpgradeId: UpgradeType.STEEL_PIPE, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.REFINERY]: {
    id: UpgradeType.REFINERY, category: 'BASIC', level: 0, baseCost: 30000, costMultiplier: 2.2, effectMultiplier: 0.05, 
    unlockCondition: { requiredUpgradeId: UpgradeType.IRON_TANK, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.HYDRAULIC_PRESS]: {
    id: UpgradeType.HYDRAULIC_PRESS, category: 'BASIC', level: 0, baseCost: 40000, costMultiplier: 1.7, effectMultiplier: 10,
    unlockCondition: { requiredUpgradeId: UpgradeType.LUBRICANT, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.MARKETING]: {
    id: UpgradeType.MARKETING, category: 'BASIC', level: 0, baseCost: 60000, costMultiplier: 2.5, effectMultiplier: 0.05, 
    unlockCondition: { requiredUpgradeId: UpgradeType.REFINERY, requiredUpgradeLevel: 1 }
  },

  // --- TIER 4: EXPANSION ---
  [UpgradeType.CHAIN_LINK_FENCE]: {
    id: UpgradeType.CHAIN_LINK_FENCE, category: 'BASIC', level: 0, baseCost: 70000, costMultiplier: 1.5, effectMultiplier: 5,
    unlockCondition: { requiredUpgradeId: UpgradeType.COPPER_WIRING, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.SECURITY_GUARD]: {
    id: UpgradeType.SECURITY_GUARD, category: 'BASIC', level: 0, baseCost: 85000, costMultiplier: 1.6, effectMultiplier: 10,
    unlockCondition: { requiredUpgradeId: UpgradeType.CHAIN_LINK_FENCE, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.MUD_PUMP]: {
    id: UpgradeType.MUD_PUMP, category: 'BASIC', level: 0, baseCost: 100000, costMultiplier: 1.7, effectMultiplier: 15, 
    unlockCondition: { requiredUpgradeId: UpgradeType.HYDRAULIC_PRESS, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.SAFETY_VALVE]: {
    id: UpgradeType.SAFETY_VALVE, category: 'BASIC', level: 0, baseCost: 150000, costMultiplier: 1.9, effectMultiplier: 30, 
    unlockCondition: { requiredUpgradeId: UpgradeType.MUD_PUMP, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.GENERATOR]: {
    id: UpgradeType.GENERATOR, category: 'BASIC', level: 0, baseCost: 250000, costMultiplier: 1.8, effectMultiplier: 25, 
    unlockCondition: { requiredUpgradeId: UpgradeType.SECURITY_GUARD, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.GEOLOGY_MAP]: {
    id: UpgradeType.GEOLOGY_MAP, category: 'BASIC', level: 0, baseCost: 500000, costMultiplier: 2.1, effectMultiplier: 50, 
    unlockCondition: { requiredUpgradeId: UpgradeType.GENERATOR, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.FRACKING]: {
    id: UpgradeType.FRACKING, category: 'BASIC', level: 0, baseCost: 1000000, costMultiplier: 2.5, effectMultiplier: 100,
    unlockCondition: { requiredUpgradeId: UpgradeType.SAFETY_VALVE, requiredUpgradeLevel: 5 }
  },

  // --- TIER 5: CORPORATE ---
  [UpgradeType.BREAK_ROOM]: {
    id: UpgradeType.BREAK_ROOM, category: 'BASIC', level: 0, baseCost: 1200000, costMultiplier: 1.5, effectMultiplier: 20,
    unlockCondition: { requiredUpgradeId: UpgradeType.COFFEE_MACHINE, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.SHIFT_WORK]: {
    id: UpgradeType.SHIFT_WORK, category: 'BASIC', level: 0, baseCost: 1500000, costMultiplier: 1.6, effectMultiplier: 50,
    unlockCondition: { requiredUpgradeId: UpgradeType.BREAK_ROOM, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.HR_DEPARTMENT]: {
    id: UpgradeType.HR_DEPARTMENT, category: 'BASIC', level: 0, baseCost: 2000000, costMultiplier: 1.8, effectMultiplier: 80,
    unlockCondition: { requiredUpgradeId: UpgradeType.SHIFT_WORK, requiredUpgradeLevel: 2 }
  },

  // --- SPECIAL / ADVANCED ---
  [UpgradeType.DIAMOND_BIT]: {
    id: UpgradeType.DIAMOND_BIT, category: 'SPECIAL', level: 0, baseCost: 3000000, costMultiplier: 3.5, effectMultiplier: 500, 
    unlockCondition: { requiredUpgradeId: UpgradeType.DRILL_BIT, requiredUpgradeLevel: 20 }
  },
  [UpgradeType.CEMENT_BASE]: {
    id: UpgradeType.CEMENT_BASE, category: 'SPECIAL', level: 0, baseCost: 4000000, costMultiplier: 2.0, effectMultiplier: 200,
    unlockCondition: { requiredUpgradeId: UpgradeType.FRACKING, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.STEEL_BEAMS]: {
    id: UpgradeType.STEEL_BEAMS, category: 'SPECIAL', level: 0, baseCost: 5500000, costMultiplier: 2.2, effectMultiplier: 300,
    unlockCondition: { requiredUpgradeId: UpgradeType.CEMENT_BASE, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.COMPUTER_CONTROL]: {
    id: UpgradeType.COMPUTER_CONTROL, category: 'SPECIAL', level: 0, baseCost: 7000000, costMultiplier: 2.0, effectMultiplier: 400,
    unlockCondition: { requiredUpgradeId: UpgradeType.GENERATOR, requiredUpgradeLevel: 10 }
  },
  [UpgradeType.DEEP_SCAN]: {
    id: UpgradeType.DEEP_SCAN, category: 'SPECIAL', level: 0, baseCost: 12000000, costMultiplier: 2.8, effectMultiplier: 1000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.GEOLOGY_MAP, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.RESERVOIR_EXPANSION]: {
    id: UpgradeType.RESERVOIR_EXPANSION, category: 'SPECIAL', level: 0, baseCost: 20000000, costMultiplier: 3.5, effectMultiplier: 2000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.STORAGE, requiredUpgradeLevel: 20 }
  },
  [UpgradeType.PUMP_JACK_TURBO]: {
    id: UpgradeType.PUMP_JACK_TURBO, category: 'SPECIAL', level: 0, baseCost: 40000000, costMultiplier: 3.0, effectMultiplier: 3000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.COMPUTER_CONTROL, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.EXPANDED_TANKS]: {
    id: UpgradeType.EXPANDED_TANKS, category: 'SPECIAL', level: 0, baseCost: 80000000, costMultiplier: 4.5, effectMultiplier: 10000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.RESERVOIR_EXPANSION, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.COOLING_SYSTEM]: {
    id: UpgradeType.COOLING_SYSTEM, category: 'SPECIAL', level: 0, baseCost: 150000000, costMultiplier: 2.8, effectMultiplier: 5000,
    unlockCondition: { requiredUpgradeId: UpgradeType.PUMP_JACK_TURBO, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.SATELLITE_LINK]: {
    id: UpgradeType.SATELLITE_LINK, category: 'SPECIAL', level: 0, baseCost: 300000000, costMultiplier: 3.0, effectMultiplier: 0.15, 
    unlockCondition: { requiredUpgradeId: UpgradeType.DEEP_SCAN, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.ACCOUNTING_FIRM]: {
    id: UpgradeType.ACCOUNTING_FIRM, category: 'SPECIAL', level: 0, baseCost: 500000000, costMultiplier: 2.5, effectMultiplier: 0.05,
    unlockCondition: { requiredUpgradeId: UpgradeType.HR_DEPARTMENT, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.LEGAL_TEAM]: {
    id: UpgradeType.LEGAL_TEAM, category: 'SPECIAL', level: 0, baseCost: 800000000, costMultiplier: 3.0, effectMultiplier: 0.05,
    unlockCondition: { requiredUpgradeId: UpgradeType.ACCOUNTING_FIRM, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.UNION_DEAL]: {
    id: UpgradeType.UNION_DEAL, category: 'SPECIAL', level: 0, baseCost: 1000000000, costMultiplier: 5.0, effectMultiplier: 10000, // Efficiency boost
    unlockCondition: { requiredUpgradeId: UpgradeType.SHIFT_WORK, requiredUpgradeLevel: 10 }
  },
  [UpgradeType.OFFSHORE_RIG]: {
    id: UpgradeType.OFFSHORE_RIG, category: 'SPECIAL', level: 0, baseCost: 1500000000, costMultiplier: 3.8, effectMultiplier: 50000, 
    unlockCondition: { moneyRequired: 500000000 }
  },
  [UpgradeType.PIPELINE_NETWORK]: {
    id: UpgradeType.PIPELINE_NETWORK, category: 'SPECIAL', level: 0, baseCost: 5000000000, costMultiplier: 4.2, effectMultiplier: 200000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.OFFSHORE_RIG, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.POLITICAL_LOBBY]: {
    id: UpgradeType.POLITICAL_LOBBY, category: 'SPECIAL', level: 0, baseCost: 20000000000, costMultiplier: 5.0, effectMultiplier: 0.25,
    unlockCondition: { requiredUpgradeId: UpgradeType.MARKETING, requiredUpgradeLevel: 10 }
  },
  [UpgradeType.EXPORT_CONTRACT]: {
    id: UpgradeType.EXPORT_CONTRACT, category: 'SPECIAL', level: 0, baseCost: 50000000000, costMultiplier: 5.5, effectMultiplier: 0.6, 
    unlockCondition: { requiredUpgradeId: UpgradeType.PIPELINE_NETWORK, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.STOCK_OPTIONS]: {
    id: UpgradeType.STOCK_OPTIONS, category: 'SPECIAL', level: 0, baseCost: 100000000000, costMultiplier: 3.0, effectMultiplier: 0.1,
    unlockCondition: { requiredUpgradeId: UpgradeType.LEGAL_TEAM, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.CONGLOMERATE_MERGER]: {
    id: UpgradeType.CONGLOMERATE_MERGER, category: 'SPECIAL', level: 0, baseCost: 500000000000, costMultiplier: 10.0, effectMultiplier: 5000000,
    unlockCondition: { requiredUpgradeId: UpgradeType.STOCK_OPTIONS, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.WORLD_BANK_LOAN]: {
    id: UpgradeType.WORLD_BANK_LOAN, category: 'SPECIAL', level: 0, baseCost: 1000000000000, costMultiplier: 2.0, effectMultiplier: 10000000,
    unlockCondition: { requiredUpgradeId: UpgradeType.CONGLOMERATE_MERGER, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.AI_MINING]: {
    id: UpgradeType.AI_MINING, category: 'SPECIAL', level: 0, baseCost: 2000000000000, costMultiplier: 4.5, effectMultiplier: 10000000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.EXPORT_CONTRACT, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.FUSION_REACTOR]: {
    id: UpgradeType.FUSION_REACTOR, category: 'SPECIAL', level: 0, baseCost: 10000000000000, costMultiplier: 3.5, effectMultiplier: 50000000,
    unlockCondition: { requiredUpgradeId: UpgradeType.COOLING_SYSTEM, requiredUpgradeLevel: 10 }
  },
  [UpgradeType.ORBITAL_LASER]: {
    id: UpgradeType.ORBITAL_LASER, category: 'SPECIAL', level: 0, baseCost: 50000000000000, costMultiplier: 5.0, effectMultiplier: 250000000,
    unlockCondition: { requiredUpgradeId: UpgradeType.FUSION_REACTOR, requiredUpgradeLevel: 3 }
  },
  [UpgradeType.ASTEROID_MINING]: {
    id: UpgradeType.ASTEROID_MINING, category: 'SPECIAL', level: 0, baseCost: 250000000000000, costMultiplier: 6.0, effectMultiplier: 1000000000,
    unlockCondition: { requiredUpgradeId: UpgradeType.ORBITAL_LASER, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.DYSON_SPHERE]: {
    id: UpgradeType.DYSON_SPHERE, category: 'SPECIAL', level: 0, baseCost: 2000000000000000, costMultiplier: 10.0, effectMultiplier: 5000000000,
    unlockCondition: { requiredUpgradeId: UpgradeType.ASTEROID_MINING, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.QUANTUM_DRILL]: {
    id: UpgradeType.QUANTUM_DRILL, category: 'SPECIAL', level: 0, baseCost: 20000000000000000, costMultiplier: 10.0, effectMultiplier: 25000000000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.AI_MINING, requiredUpgradeLevel: 5 }
  },
  [UpgradeType.NANOBOT_REPAIR]: {
    id: UpgradeType.NANOBOT_REPAIR, category: 'SPECIAL', level: 0, baseCost: 100000000000000000, costMultiplier: 5.0, effectMultiplier: 100000000000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.QUANTUM_DRILL, requiredUpgradeLevel: 2 }
  },
  [UpgradeType.REALITY_WARP]: {
    id: UpgradeType.REALITY_WARP, category: 'SPECIAL', level: 0, baseCost: 200000000000000000, costMultiplier: 15.0, effectMultiplier: 999999999999,
    unlockCondition: { requiredUpgradeId: UpgradeType.DYSON_SPHERE, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.TIME_COMPRESSION]: {
    id: UpgradeType.TIME_COMPRESSION, category: 'SPECIAL', level: 0, baseCost: 2000000000000000000, costMultiplier: 20.0, effectMultiplier: 9000000000000,
    unlockCondition: { requiredUpgradeId: UpgradeType.REALITY_WARP, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.MATTER_SYNTHESIS]: {
    id: UpgradeType.MATTER_SYNTHESIS, category: 'SPECIAL', level: 0, baseCost: 5000000000000000000, costMultiplier: 50.0, effectMultiplier: 50000000000000, 
    unlockCondition: { requiredUpgradeId: UpgradeType.TIME_COMPRESSION, requiredUpgradeLevel: 1 }
  },
  [UpgradeType.UNIVERSAL_SIPHON]: {
    id: UpgradeType.UNIVERSAL_SIPHON, category: 'SPECIAL', level: 0, baseCost: 9000000000000000000, costMultiplier: 100.0, effectMultiplier: 999999999999999,
    unlockCondition: { requiredUpgradeId: UpgradeType.MATTER_SYNTHESIS, requiredUpgradeLevel: 1 }
  }
};

export const TRANSLATIONS = {
  en: {
    title: "OIL TYCOON",
    edition: "INFINITY",
    treasury: "Treasury",
    storage: "Storage",
    storageFull: "FULL",
    marketPrice: "Price",
    marketPriceUnit: "/ bbl",
    sellOil: "SELL OIL",
    perSecond: "bbl/s",
    total: "Mined",
    rigLevel: "Drill Lvl",
    drill: "DRILL",
    upgrades: "Tech Tree",
    current: "Now",
    next: "Next",
    upgrade: "Buy",
    sold: "Sold",
    for: "for",
    purchased: "Bought",
    warningStorage: "Storage Full!",
    chartTitle: "Market Index",
    chartPrice: "Price",
    locked: "LOCKED",
    reqMoney: "Req $",
    reqLvl: "Req Lvl",
    evolution: "Evolution",
    evolve: "UPGRADE RIG",
    multiplier: "Mult",
    tabs: { market: "Market", drill: "Drill", upgrade: "Tech" },
    upgradeTabs: { basic: "BASIC", special: "SPECIAL" },
    tiers: {
      tierRusty: "Rusty Auger",
      tierIron: "Iron Auger",
      tierTitanium: "Titanium Auger",
      tierGolden: "Golden Auger",
      tierEmerald: "Emerald Auger",
      tierObsidian: "Obsidian Auger",
      tierQuantum: "Quantum Auger",
      tierPlasma: "Plasma Drill",
      tierAntimatter: "Antimatter Drill",
      tierVoid: "Void Drill",
      tierCosmic: "Cosmic Drill",
      tierInfinity: "Infinity Drill",
    },
    upgradesInfo: {
      [UpgradeType.DRILL_BIT]: { name: 'Iron Bit', description: 'Harder bits for better manual mining.' },
      [UpgradeType.STORAGE]: { name: 'Storage Tank', description: 'Basic oil containment.' },
      [UpgradeType.MANUAL_PUMP]: { name: 'Hand Crank', description: 'Improved leverage for manual pumping.' },
      [UpgradeType.REINFORCED_HANDLE]: { name: 'Steel Handle', description: 'Doesn\'t break under pressure.' },
      [UpgradeType.AUTO_PUMP]: { name: 'Auto Pump', description: 'Basic automated extraction motor.' },
      [UpgradeType.STEEL_PIPE]: { name: 'Steel Pipe', description: 'Wider pipes allow better flow.' },
      [UpgradeType.IRON_TANK]: { name: 'Iron Tank', description: 'Sturdier tank holds more oil.' },
      [UpgradeType.LUBRICANT]: { name: 'Lubricant', description: 'Reduces friction in the pump.' },
      [UpgradeType.REFINERY]: { name: 'Refinery', description: 'Refines crude for better market prices.' },
      [UpgradeType.HYDRAULIC_PRESS]: { name: 'Hydraulic Press', description: 'Crushes rock layers efficiently.' },
      [UpgradeType.MARKETING]: { name: 'Lobbying', description: 'Political influence to keep prices up.' },
      [UpgradeType.MUD_PUMP]: { name: 'Mud Pump', description: 'High pressure fluid circulation.' },
      [UpgradeType.SAFETY_VALVE]: { name: 'Safety Valve', description: 'Prevents blowouts, allowing aggressive drilling.' },
      [UpgradeType.GENERATOR]: { name: 'Diesel Gen', description: 'More power for all systems.' },
      [UpgradeType.GEOLOGY_MAP]: { name: 'Seismic Map', description: 'Locates deeper, richer pockets.' },
      [UpgradeType.FRACKING]: { name: 'Fracking', description: 'Hydraulic fracturing for massive yields.' },
      [UpgradeType.DIAMOND_BIT]: { name: 'Diamond Bit', description: 'Unbreakable bits for extreme mining.' },
      [UpgradeType.COMPUTER_CONTROL]: { name: 'AI Controller', description: 'Optimizes drill speed automatically.' },
      [UpgradeType.DEEP_SCAN]: { name: 'Deep Scan', description: 'Sonar tech to find the abyss.' },
      [UpgradeType.RESERVOIR_EXPANSION]: { name: 'Reservoir Exp.', description: 'Taps into secondary pockets.' },
      [UpgradeType.PUMP_JACK_TURBO]: { name: 'Turbocharger', description: 'Forced induction for the pump motor.' },
      [UpgradeType.EXPANDED_TANKS]: { name: 'Mega Silo', description: 'Industrial scale storage.' },
      [UpgradeType.COOLING_SYSTEM]: { name: 'Liquid Cool', description: 'Keeps machinery running at 110%.' },
      [UpgradeType.SATELLITE_LINK]: { name: 'Sat Link', description: 'Real-time global market data.' },
      [UpgradeType.OFFSHORE_RIG]: { name: 'Offshore Rig', description: 'Deep sea extraction platform.' },
      [UpgradeType.PIPELINE_NETWORK]: { name: 'Pipeline Net', description: 'Continental transport infrastructure.' },
      [UpgradeType.POLITICAL_LOBBY]: { name: 'Presidential Aid', description: 'Direct line to the top.' },
      [UpgradeType.EXPORT_CONTRACT]: { name: 'Global Deal', description: 'Exclusive international sales rights.' },
      [UpgradeType.AI_MINING]: { name: 'AI Swarm', description: 'Self-replicating mining drones.' },
      [UpgradeType.FUSION_REACTOR]: { name: 'Fusion Core', description: 'Unlimited clean energy.' },
      [UpgradeType.ORBITAL_LASER]: { name: 'Orbital Laser', description: 'Vaporizes rock from space.' },
      [UpgradeType.ASTEROID_MINING]: { name: 'Asteroid Miner', description: 'Imports oil from space rocks.' },
      [UpgradeType.DYSON_SPHERE]: { name: 'Dyson Sphere', description: 'Harnesses the sun for drilling.' },
      [UpgradeType.QUANTUM_DRILL]: { name: 'Quantum Drill', description: 'Drills through space-time.' },
      [UpgradeType.NANOBOT_REPAIR]: { name: 'Nanobots', description: 'Machines that fix themselves.' },
      [UpgradeType.REALITY_WARP]: { name: 'Reality Warp', description: 'Bends physics to extract more.' },
      [UpgradeType.TIME_COMPRESSION]: { name: 'Time Compression', description: 'Mines 1000 years of oil in a second.' },
      [UpgradeType.MATTER_SYNTHESIS]: { name: 'Synthesis', description: 'Creates oil from nothing.' },
      [UpgradeType.UNIVERSAL_SIPHON]: { name: 'Uni Siphon', description: 'Drains the multiverse.' },
      [UpgradeType.SAFETY_HELMET]: { name: 'Safety Helmet', description: 'Protects workers from falling debris.' },
      [UpgradeType.WORK_BOOTS]: { name: 'Work Boots', description: 'Better grip for faster manual work.' },
      [UpgradeType.GRAVEL_ROAD]: { name: 'Gravel Road', description: 'Trucks can move slightly faster.' },
      [UpgradeType.FLOODLIGHTS]: { name: 'Floodlights', description: '24/7 operations are now visible.' },
      [UpgradeType.COFFEE_MACHINE]: { name: 'Coffee Machine', description: 'Keeps the crew awake.' },
      [UpgradeType.COPPER_WIRING]: { name: 'Copper Wiring', description: 'Better electrical conductivity.' },
      [UpgradeType.RUBBER_SEALS]: { name: 'Rubber Seals', description: 'Prevents minor oil leaks.' },
      [UpgradeType.CHAIN_LINK_FENCE]: { name: 'Chain Fence', description: 'Keeps stray animals away.' },
      [UpgradeType.SECURITY_GUARD]: { name: 'Security Guard', description: 'Prevents oil theft.' },
      [UpgradeType.BREAK_ROOM]: { name: 'Break Room', description: 'Happy workers drill harder.' },
      [UpgradeType.SHIFT_WORK]: { name: 'Shift Work', description: '3-shift system for non-stop work.' },
      [UpgradeType.HR_DEPARTMENT]: { name: 'HR Dept', description: 'Optimizes workforce efficiency.' },
      [UpgradeType.CEMENT_BASE]: { name: 'Cement Base', description: 'Stable foundation for heavier machines.' },
      [UpgradeType.STEEL_BEAMS]: { name: 'Steel Beams', description: 'Structural integrity for larger rigs.' },
      [UpgradeType.ACCOUNTING_FIRM]: { name: 'Accounting', description: 'Finds tax loopholes.' },
      [UpgradeType.LEGAL_TEAM]: { name: 'Legal Team', description: 'Sues competitors into oblivion.' },
      [UpgradeType.UNION_DEAL]: { name: 'Union Deal', description: 'Prevents strikes, ensures steady output.' },
      [UpgradeType.STOCK_OPTIONS]: { name: 'Stock Options', description: 'Motivates upper management.' },
      [UpgradeType.CONGLOMERATE_MERGER]: { name: 'Merger', description: 'Buy out the competition.' },
      [UpgradeType.WORLD_BANK_LOAN]: { name: 'World Bank Loan', description: 'Massive capital injection.' },
    }
  },
  ko: {
    title: "석유 타이쿤",
    edition: "INFINITY",
    treasury: "자금",
    storage: "저장고",
    storageFull: "가득 참",
    marketPrice: "유가",
    marketPriceUnit: "/ 1 bbl",
    sellOil: "전량 판매",
    perSecond: "bbl/초",
    total: "총 채굴",
    rigLevel: "드릴 레벨",
    drill: "채굴",
    upgrades: "기술 연구",
    current: "현재",
    next: "다음",
    upgrade: "연구",
    sold: "판매:",
    for: "수익:",
    purchased: "구매:",
    warningStorage: "저장고가 가득 찼습니다!",
    chartTitle: "국제 유가 지수",
    chartPrice: "가격",
    locked: "잠금",
    reqMoney: "필요: $",
    reqLvl: "필요 Lv",
    evolution: "드릴 진화",
    evolve: "진화",
    multiplier: "배율",
    tabs: { market: "거래소", drill: "채굴장", upgrade: "연구소" },
    upgradeTabs: { basic: "기본 기술", special: "특수 설비" },
    tiers: {
      tierRusty: "녹슨 오거",
      tierIron: "강철 오거",
      tierTitanium: "티타늄 오거",
      tierGolden: "황금 오거",
      tierEmerald: "에메랄드 오거",
      tierObsidian: "흑요석 오거",
      tierQuantum: "퀀텀 오거",
      tierPlasma: "플라즈마 드릴",
      tierAntimatter: "반물질 드릴",
      tierVoid: "공허의 드릴",
      tierCosmic: "코스믹 드릴",
      tierInfinity: "인피니티 드릴",
    },
    upgradesInfo: {
      [UpgradeType.DRILL_BIT]: { name: '강철 비트', description: '수동 채굴 효율을 높입니다.' },
      [UpgradeType.STORAGE]: { name: '저장 탱크', description: '석유 저장 용량을 늘립니다.' },
      [UpgradeType.MANUAL_PUMP]: { name: '수동 크랭크', description: '지렛대 원리로 수동 채굴량을 늘립니다.' },
      [UpgradeType.REINFORCED_HANDLE]: { name: '강화 손잡이', description: '부러지지 않는 손잡이입니다.' },
      [UpgradeType.AUTO_PUMP]: { name: '자동 펌프', description: '초당 자동으로 석유를 퍼올립니다.' },
      [UpgradeType.STEEL_PIPE]: { name: '강철 파이프', description: '더 넓은 파이프로 흐름을 개선합니다.' },
      [UpgradeType.IRON_TANK]: { name: '중형 탱크', description: '더 많은 석유를 보관합니다.' },
      [UpgradeType.LUBRICANT]: { name: '공업용 윤활유', description: '마찰을 줄여 기계 효율을 높입니다.' },
      [UpgradeType.REFINERY]: { name: '정유 시설', description: '불순물을 제거해 판매가를 높입니다.' },
      [UpgradeType.HYDRAULIC_PRESS]: { name: '유압 프레스', description: '암반을 으깨어 길을 엽니다.' },
      [UpgradeType.MARKETING]: { name: '로비 활동', description: '정치력을 발휘해 유가 하락을 방어합니다.' },
      [UpgradeType.MUD_PUMP]: { name: '머드 펌프', description: '고압 유체를 순환시켜 채굴 속도를 높입니다.' },
      [UpgradeType.SAFETY_VALVE]: { name: '안전 밸브', description: '과압을 방지해 공격적인 채굴을 가능케 합니다.' },
      [UpgradeType.GENERATOR]: { name: '디젤 발전기', description: '모든 시스템에 더 강력한 전력을 공급합니다.' },
      [UpgradeType.GEOLOGY_MAP]: { name: '지질 탐사도', description: '숨겨진 유전을 찾아 자동 채굴량을 늘립니다.' },
      [UpgradeType.FRACKING]: { name: '수압 파쇄', description: '지층을 파괴하여 석유를 강제로 뽑아냅니다.' },
      [UpgradeType.DIAMOND_BIT]: { name: '다이아몬드 비트', description: '절대 부러지지 않는 비트입니다.' },
      [UpgradeType.COMPUTER_CONTROL]: { name: 'AI 제어 장치', description: '최적의 속도로 드릴을 제어합니다.' },
      [UpgradeType.DEEP_SCAN]: { name: '심층 스캔', description: '소나 기술로 심해 유전을 탐지합니다.' },
      [UpgradeType.RESERVOIR_EXPANSION]: { name: '저장고 확장', description: '지하 동굴을 저장고로 활용합니다.' },
      [UpgradeType.PUMP_JACK_TURBO]: { name: '터보 차저', description: '모터에 강제 흡기 장치를 달아 폭주합니다.' },
      [UpgradeType.EXPANDED_TANKS]: { name: '메가 사일로', description: '산업 단지 규모의 거대 저장소입니다.' },
      [UpgradeType.COOLING_SYSTEM]: { name: '수랭식 쿨러', description: '과열 없이 기계를 120% 가동합니다.' },
      [UpgradeType.SATELLITE_LINK]: { name: '위성 링크', description: '전 세계 유가 정보를 실시간 수신합니다.' },
      [UpgradeType.OFFSHORE_RIG]: { name: '해상 시추선', description: '대륙붕 너머의 검은 황금을 노립니다.' },
      [UpgradeType.PIPELINE_NETWORK]: { name: '송유관 네트워크', description: '대륙 횡단 수송망을 구축합니다.' },
      [UpgradeType.POLITICAL_LOBBY]: { name: '대통령 핫라인', description: '국가 차원의 지원을 받습니다.' },
      [UpgradeType.EXPORT_CONTRACT]: { name: '독점 수출 계약', description: '국가급 거래로 판매 수익을 극대화합니다.' },
      [UpgradeType.AI_MINING]: { name: 'AI 군집 드론', description: '스스로 복제하며 채굴하는 로봇 군단입니다.' },
      [UpgradeType.FUSION_REACTOR]: { name: '핵융합 코어', description: '무한한 청정 에너지를 공급합니다.' },
      [UpgradeType.ORBITAL_LASER]: { name: '궤도 레이저', description: '우주에서 지각을 뚫어버립니다.' },
      [UpgradeType.ASTEROID_MINING]: { name: '소행성 채굴', description: '우주에서 석유를 가져옵니다.' },
      [UpgradeType.DYSON_SPHERE]: { name: '다이슨 스피어', description: '태양 에너지를 채굴에 쏟아붓습니다.' },
      [UpgradeType.QUANTUM_DRILL]: { name: '퀀텀 드릴', description: '시공간을 뚫고 석유를 가져옵니다.' },
      [UpgradeType.NANOBOT_REPAIR]: { name: '나노봇 수리', description: '손상된 부품이 스스로 재생됩니다.' },
      [UpgradeType.REALITY_WARP]: { name: '현실 조작', description: '물리 법칙을 무시하고 석유를 창조합니다.' },
      [UpgradeType.TIME_COMPRESSION]: { name: '시간 압축', description: '1000년치 석유를 1초만에 캡니다.' },
      [UpgradeType.MATTER_SYNTHESIS]: { name: '물질 합성', description: '무에서 유를 창조합니다.' },
      [UpgradeType.UNIVERSAL_SIPHON]: { name: '우주 사이펀', description: '다중 우주의 자원을 빨아들입니다.' },
      [UpgradeType.SAFETY_HELMET]: { name: '안전모', description: '직원들의 안전을 보장하여 효율을 높입니다.' },
      [UpgradeType.WORK_BOOTS]: { name: '작업화', description: '미끄러지지 않아 작업 속도가 빨라집니다.' },
      [UpgradeType.GRAVEL_ROAD]: { name: '자갈 도로', description: '수송 트럭의 이동 속도가 소폭 상승합니다.' },
      [UpgradeType.FLOODLIGHTS]: { name: '야간 조명', description: '24시간 작업을 가능하게 합니다.' },
      [UpgradeType.COFFEE_MACHINE]: { name: '커피 머신', description: '직원들의 졸음을 쫓아 생산성을 높입니다.' },
      [UpgradeType.COPPER_WIRING]: { name: '구리 배선', description: '전력 손실을 줄여 기계 효율을 높입니다.' },
      [UpgradeType.RUBBER_SEALS]: { name: '고무 패킹', description: '파이프의 미세한 누유를 막습니다.' },
      [UpgradeType.CHAIN_LINK_FENCE]: { name: '철조망', description: '야생동물의 침입을 막습니다.' },
      [UpgradeType.SECURITY_GUARD]: { name: '경비원', description: '기름 도둑을 감시합니다.' },
      [UpgradeType.BREAK_ROOM]: { name: '휴게실', description: '휴식 후 더 열심히 일하게 합니다.' },
      [UpgradeType.SHIFT_WORK]: { name: '3교대 근무', description: '쉬지 않고 공장을 돌립니다.' },
      [UpgradeType.HR_DEPARTMENT]: { name: '인사팀', description: '적재적소에 인력을 배치합니다.' },
      [UpgradeType.CEMENT_BASE]: { name: '시멘트 기초', description: '무거운 기계를 안정적으로 지지합니다.' },
      [UpgradeType.STEEL_BEAMS]: { name: 'H-빔 보강', description: '더 거대한 구조물을 세웁니다.' },
      [UpgradeType.ACCOUNTING_FIRM]: { name: '회계 법인', description: '세금을 절약하여 수익을 남깁니다.' },
      [UpgradeType.LEGAL_TEAM]: { name: '법무팀', description: '경쟁사의 소송을 방어합니다.' },
      [UpgradeType.UNION_DEAL]: { name: '노조 협약', description: '파업 없이 안정적인 생산을 보장합니다.' },
      [UpgradeType.STOCK_OPTIONS]: { name: '스톡 옵션', description: '임원진의 동기 부여를 극대화합니다.' },
      [UpgradeType.CONGLOMERATE_MERGER]: { name: '기업 합병', description: '경쟁사를 인수하여 시장을 장악합니다.' },
      [UpgradeType.WORLD_BANK_LOAN]: { name: '세계은행 차관', description: '국가급 프로젝트 자금을 조달합니다.' },
    }
  }
};
