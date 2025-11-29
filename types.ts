
export enum UpgradeType {
  // --- TIER 1: SURVIVAL & BASICS ---
  DRILL_BIT = 'DRILL_BIT', 
  STORAGE = 'STORAGE',     
  MANUAL_PUMP = 'MANUAL_PUMP',
  REINFORCED_HANDLE = 'REINFORCED_HANDLE',
  SAFETY_HELMET = 'SAFETY_HELMET', // New
  WORK_BOOTS = 'WORK_BOOTS', // New

  // --- TIER 2: INFRASTRUCTURE ---
  GRAVEL_ROAD = 'GRAVEL_ROAD', // New
  FLOODLIGHTS = 'FLOODLIGHTS', // New
  AUTO_PUMP = 'AUTO_PUMP', 
  STEEL_PIPE = 'STEEL_PIPE',
  IRON_TANK = 'IRON_TANK',
  COFFEE_MACHINE = 'COFFEE_MACHINE', // New

  // --- TIER 3: INDUSTRIALIZATION ---
  COPPER_WIRING = 'COPPER_WIRING', // New
  LUBRICANT = 'LUBRICANT',      
  REFINERY = 'REFINERY',   
  MARKETING = 'MARKETING',
  HYDRAULIC_PRESS = 'HYDRAULIC_PRESS',
  RUBBER_SEALS = 'RUBBER_SEALS', // New

  // --- TIER 4: EXPANSION ---
  CHAIN_LINK_FENCE = 'CHAIN_LINK_FENCE', // New
  SECURITY_GUARD = 'SECURITY_GUARD', // New
  SAFETY_VALVE = 'SAFETY_VALVE', 
  MUD_PUMP = 'MUD_PUMP',
  GENERATOR = 'GENERATOR',
  GEOLOGY_MAP = 'GEOLOGY_MAP',   
  FRACKING = 'FRACKING',

  // --- TIER 5: CORPORATE ---
  BREAK_ROOM = 'BREAK_ROOM', // New
  SHIFT_WORK = 'SHIFT_WORK', // New
  HR_DEPARTMENT = 'HR_DEPARTMENT', // New
  DIAMOND_BIT = 'DIAMOND_BIT',      
  DEEP_SCAN = 'DEEP_SCAN',
  RESERVOIR_EXPANSION = 'RESERVOIR_EXPANSION',
  COMPUTER_CONTROL = 'COMPUTER_CONTROL',

  // --- TIER 6: ADVANCED TECH ---
  CEMENT_BASE = 'CEMENT_BASE', // New
  STEEL_BEAMS = 'STEEL_BEAMS', // New
  PUMP_JACK_TURBO = 'PUMP_JACK_TURBO', 
  EXPANDED_TANKS = 'EXPANDED_TANKS',   
  COOLING_SYSTEM = 'COOLING_SYSTEM',
  SATELLITE_LINK = 'SATELLITE_LINK',

  // --- TIER 7: GLOBAL BIZ ---
  ACCOUNTING_FIRM = 'ACCOUNTING_FIRM', // New
  LEGAL_TEAM = 'LEGAL_TEAM', // New
  UNION_DEAL = 'UNION_DEAL', // New
  OFFSHORE_RIG = 'OFFSHORE_RIG',
  PIPELINE_NETWORK = 'PIPELINE_NETWORK',
  EXPORT_CONTRACT = 'EXPORT_CONTRACT',
  POLITICAL_LOBBY = 'POLITICAL_LOBBY',

  // --- TIER 8: CONGLOMERATE ---
  STOCK_OPTIONS = 'STOCK_OPTIONS', // New
  CONGLOMERATE_MERGER = 'CONGLOMERATE_MERGER', // New
  WORLD_BANK_LOAN = 'WORLD_BANK_LOAN', // New
  AI_MINING = 'AI_MINING', 
  QUANTUM_DRILL = 'QUANTUM_DRILL',
  NANOBOT_REPAIR = 'NANOBOT_REPAIR',
  FUSION_REACTOR = 'FUSION_REACTOR',

  // --- TIER 9: SCI-FI ---
  ORBITAL_LASER = 'ORBITAL_LASER',
  ASTEROID_MINING = 'ASTEROID_MINING',
  DYSON_SPHERE = 'DYSON_SPHERE',
  
  // --- TIER 10: GOD MODE ---
  REALITY_WARP = 'REALITY_WARP',
  TIME_COMPRESSION = 'TIME_COMPRESSION',
  MATTER_SYNTHESIS = 'MATTER_SYNTHESIS',
  UNIVERSAL_SIPHON = 'UNIVERSAL_SIPHON'
}

export type UpgradeCategory = 'BASIC' | 'SPECIAL';

export interface UnlockCondition {
  moneyRequired?: number;
  requiredUpgradeId?: UpgradeType;
  requiredUpgradeLevel?: number;
}

export interface UpgradeStats {
  id: UpgradeType;
  category: UpgradeCategory;
  level: number;
  baseCost: number;
  costMultiplier: number;
  effectMultiplier: number;
  unlockCondition?: UnlockCondition;
}

export enum DrillTierId {
  RUSTY = 'RUSTY',
  IRON = 'IRON',
  TITANIUM = 'TITANIUM',
  GOLDEN = 'GOLDEN',
  EMERALD = 'EMERALD',
  OBSIDIAN = 'OBSIDIAN',
  QUANTUM = 'QUANTUM',
  PLASMA = 'PLASMA',
  ANTIMATTER = 'ANTIMATTER',
  VOID = 'VOID',
  COSMIC = 'COSMIC',
  INFINITY = 'INFINITY',
}

export interface TierDef {
  id: DrillTierId;
  name: string; // Key for translation
  multiplier: number;
  cost: number;
  color: string; // Hex code for SVG fill
}

export interface GameState {
  money: number;
  oil: number;
  totalOilMined: number;
  startTime: number;
  drillTier: DrillTierId;
}

export interface MarketPoint {
  time: string;
  price: number;
}

export interface Notification {
  id: number;
  message: string;
  type: 'success' | 'warning' | 'info';
}

export type Language = 'en' | 'ko';
