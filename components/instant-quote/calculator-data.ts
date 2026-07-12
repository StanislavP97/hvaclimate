import type {
  AddOns,
  CeilingHeight,
  EquipmentTier,
  HomeDetails,
  InsulationLevel,
  ProjectGoal,
  SizingResult,
} from "@/components/instant-quote/types";

const CEILING_FACTOR: Record<CeilingHeight, number> = {
  "8-9": 1,
  "9-10": 1.08,
  "10-plus": 1.18,
};

const INSULATION_FACTOR: Record<InsulationLevel, number> = {
  good: 0.92,
  average: 1,
  poor: 1.15,
};

export function calculateSizing(home: HomeDetails): SizingResult | null {
  const sqft = Number(home.sqft);
  if (!sqft || sqft <= 0) return null;

  const ceilingFactor = CEILING_FACTOR[home.ceilingHeight];
  const insulationFactor = INSULATION_FACTOR[home.insulation];

  const coolingTons = sqft * 0.0016 * ceilingFactor * insulationFactor;
  const heatingBtu = sqft * 35 * ceilingFactor * insulationFactor;

  return {
    coolingTons: coolingTons.toFixed(1),
    heatingBtu: Math.round(heatingBtu),
  };
}

export const PROJECT_GOAL_OPTIONS: { value: ProjectGoal; label: string }[] = [
  { value: "add-replace-ac", label: "Add or replace AC" },
  { value: "replace-ac-furnace", label: "Replace AC & gas furnace" },
  { value: "add-replace-heat-pump", label: "Add or replace heat pump" },
  { value: "dual-fuel", label: "Dual fuel (heat pump + gas furnace)" },
  { value: "replace-furnace-only", label: "Replace gas furnace only" },
];

export interface EquipmentOption {
  tier: EquipmentTier;
  label: string;
  description: string;
  price: number;
}

export const FURNACE_OPTIONS: EquipmentOption[] = [
  { tier: "good", label: "Good", description: "80% AFUE single-stage furnace", price: 3200 },
  { tier: "better", label: "Better", description: "95% AFUE two-stage furnace", price: 4600 },
  { tier: "best", label: "Best", description: "98% AFUE variable-speed furnace", price: 6200 },
];

export const AC_OPTIONS: EquipmentOption[] = [
  { tier: "good", label: "Good", description: "14 SEER2 single-stage AC", price: 3800 },
  { tier: "better", label: "Better", description: "16 SEER2 two-stage AC", price: 5400 },
  { tier: "best", label: "Best", description: "18+ SEER2 variable-speed AC", price: 7200 },
];

export const DEFAULT_ADD_ONS: AddOns = {
  extendedWarranty: false,
  emergencyHeatStrip: false,
  lineSet: false,
  aprilaire: false,
  iwave: false,
  condenserPad: false,
};

export const ADD_ON_PRICES = {
  extendedWarranty: 850,
  emergencyHeatStrip: 650,
  lineSet: 380,
  aprilaire: 450,
  iwave: 845,
  condenserPad: 162,
} as const;
