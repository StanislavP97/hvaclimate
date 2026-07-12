export type WizardStep = "address" | "contact" | "price";

export type CeilingHeight = "8-9" | "9-10" | "10-plus";
export type InsulationLevel = "good" | "average" | "poor";
export type SunExposure = "shaded" | "average" | "lots-of-glass";
export type Ductwork = "yes" | "no" | "not-sure";
export type ProjectGoal =
  | "add-replace-ac"
  | "replace-ac-furnace"
  | "add-replace-heat-pump"
  | "dual-fuel"
  | "replace-furnace-only";

export interface HomeDetails {
  sqft: string;
  ceilingHeight: CeilingHeight;
  occupants: string;
  insulation: InsulationLevel;
  sunExposure: SunExposure;
  openConcept: boolean;
}

export interface SystemDetails {
  ductwork: Ductwork;
  projectGoal: ProjectGoal;
  preferredBrand: string;
}

export interface SizingResult {
  coolingTons: string;
  heatingBtu: number;
}

export type EquipmentTier = "good" | "better" | "best";

export interface AddOns {
  extendedWarranty: boolean;
  emergencyHeatStrip: boolean;
  lineSet: boolean;
  aprilaire: boolean;
  iwave: boolean;
  condenserPad: boolean;
}
