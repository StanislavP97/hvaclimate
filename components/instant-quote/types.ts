export type ServiceType = "repair" | "replace";
export type HomeSize = "small" | "medium" | "large";
export type CurrentSystem = "gas" | "electric" | "unsure";
export type SystemTier = "silver" | "gold" | "platinum";
export type AddOnId = "thermostat" | "purifier" | "surge" | "warranty";

export interface ContactInfo {
  formName: string;
  formPhone: string;
  formEmail: string;
  smsOptIn: boolean;
}

export type Addons = Record<AddOnId, boolean>;

export interface PropertyData {
  squareFootage: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  heatingType: string | null;
  source: "rentcast" | "manual";
  propertyValue?: number;
  propertyValueLow?: number;
  propertyValueHigh?: number;
  rentEstimate?: number;
}

export interface QuizState {
  step: number;
  serviceType: ServiceType | null;
  address: string;
  homeSize: HomeSize | null;
  currentSystem: CurrentSystem | null;
  contact: ContactInfo;
  gateUnlocked: boolean;
  selectedTier: SystemTier;
  addons: Addons;
  propertyData: PropertyData | null;
}

export interface PriceRange {
  low: number;
  high: number;
}

export interface TierMeta {
  tier: SystemTier;
  label: string;
  accent: string;
  headerBg: string;
  headerColor: string;
  afue: string;
  priceLow: number;
  priceHigh: number;
  monthly: number;
  mostPopular?: boolean;
  bullets: string[];
}
