import type {
  AddOnId,
  Addons,
  CurrentSystem,
  HomeSize,
  ServiceType,
  SystemTier,
  TierMeta,
} from "@/components/instant-quote/types";

export const TIER_META: Record<SystemTier, TierMeta> = {
  silver: {
    tier: "silver",
    label: "SILVER · GOOD",
    accent: "#64748b",
    headerBg: "#f1f5f9",
    headerColor: "#0D1B2A",
    afue: "80% AFUE",
    priceLow: 3800,
    priceHigh: 4800,
    monthly: 68,
    bullets: [
      "Standard efficiency gas furnace",
      "Professional installation",
      "10-year parts warranty",
      "Basic thermostat included",
    ],
  },
  gold: {
    tier: "gold",
    label: "GOLD · BETTER",
    accent: "#2563EB",
    headerBg: "#2563EB",
    headerColor: "#ffffff",
    afue: "96% AFUE",
    priceLow: 4800,
    priceHigh: 6400,
    monthly: 89,
    mostPopular: true,
    bullets: [
      "High-efficiency gas furnace",
      "Professional installation + duct check",
      "10-year parts & labor warranty",
      "Smart thermostat compatible",
    ],
  },
  platinum: {
    tier: "platinum",
    label: "PLATINUM · BEST",
    accent: "#F97316",
    headerBg: "#F97316",
    headerColor: "#ffffff",
    afue: "98% AFUE",
    priceLow: 6400,
    priceHigh: 9000,
    monthly: 115,
    bullets: [
      "Premium variable-speed furnace",
      "Full installation + air quality check",
      "Lifetime heat exchanger warranty",
      "Ecobee smart thermostat included",
    ],
  },
};

export interface AddOnMeta {
  id: AddOnId;
  label: string;
  price: number;
  icon: string;
  desc: string;
}

export const ADDON_META: AddOnMeta[] = [
  {
    id: "thermostat",
    label: "Smart Thermostat (Ecobee)",
    price: 250,
    icon: "🌡",
    desc: "Control from anywhere. Saves avg. $180/year on energy bills.",
  },
  {
    id: "purifier",
    label: "Air Purifier / UV Light",
    price: 1200,
    icon: "💨",
    desc: "Removes 99.9% of airborne pathogens. Ideal for allergy sufferers.",
  },
  {
    id: "surge",
    label: "Surge Protector",
    price: 180,
    icon: "⚡",
    desc: "Protects your system from power surges.",
  },
  {
    id: "warranty",
    label: "Extended 10-year Labor Warranty",
    price: 850,
    icon: "🛡",
    desc: "Parts AND labor covered for a decade.",
  },
];

export const DEFAULT_ADDONS: Addons = {
  thermostat: false,
  purifier: false,
  surge: false,
  warranty: false,
};

export interface StepOption<T extends string> {
  id: T;
  emoji: string;
  title: string;
  sub: string;
  iconBg?: string;
  iconColor?: string;
  badge?: boolean;
}

export const STEP1_OPTIONS: StepOption<ServiceType>[] = [
  {
    id: "repair",
    emoji: "🔧",
    title: "My system needs repair or tune-up",
    sub: "Something's broken or not working efficiently",
    iconBg: "#fff1e8",
    iconColor: "#F97316",
  },
  {
    id: "replace",
    emoji: "🏠",
    title: "I want to replace or upgrade my system",
    sub: "Ready for a new, more efficient system",
    iconBg: "#eaf1ff",
    iconColor: "#2563EB",
  },
];

export const STEP2_OPTIONS: StepOption<HomeSize>[] = [
  { id: "small", emoji: "🏡", title: "Under 1,500 sq ft", sub: "Smaller home or condo" },
  {
    id: "medium",
    emoji: "🏠",
    title: "1,500 – 2,500 sq ft",
    sub: "Average family home",
    badge: true,
  },
  { id: "large", emoji: "🏘", title: "Over 2,500 sq ft", sub: "Larger home" },
];

export const STEP3_OPTIONS: StepOption<CurrentSystem>[] = [
  { id: "gas", emoji: "🔥", title: "Gas Furnace", sub: "Natural gas heating" },
  {
    id: "electric",
    emoji: "⚡",
    title: "Electric Furnace or Heat Pump",
    sub: "Electric heating",
  },
  { id: "unsure", emoji: "❓", title: "I'm not sure", sub: "We'll help you choose" },
];

export const SIZE_LABEL: Record<HomeSize, string> = {
  small: "under 1,500 sq ft",
  medium: "1,500–2,500 sq ft",
  large: "over 2,500 sq ft",
};

export const SYSTEM_LABEL: Record<CurrentSystem, string> = {
  gas: "gas heating",
  electric: "electric heating",
  unsure: "an unknown system",
};

export const PROGRESS_LABELS = ["Service Type", "Home Size", "Your System", "Unlock"];
