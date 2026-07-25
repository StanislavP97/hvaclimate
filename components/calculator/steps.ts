import {
  AlertTriangle,
  AlignEndHorizontal,
  ArrowDown,
  ArrowUp,
  Building2,
  Calendar,
  CalendarDays,
  Car,
  CheckCircle,
  Flame,
  Grid3x3,
  Home,
  HelpCircle,
  Layout,
  Monitor,
  Plug,
  PlusSquare,
  Search,
  Settings,
  Thermometer,
  Wind,
  XCircle,
  Zap,
  DoorOpen,
  type LucideIcon,
} from "lucide-react";
import type { CalculatorState } from "@/types/calculator";

export type StepKind = "cards" | "multiselect" | "list" | "contact" | "path";

export interface CardOption {
  label: string;
  icon: LucideIcon;
}

export interface StepConfig {
  id: string;
  percent: number;
  kind: StepKind;
  title: string;
  subtitle?: string;
  field?: keyof CalculatorState;
  cardOptions?: CardOption[];
  listOptions?: string[];
  note?: (state: CalculatorState) => string | null;
}

const homeSizeOptions: CardOption[] = [
  { label: "Under 1,000 sq ft", icon: Home },
  { label: "1,001–1,400 sq ft", icon: Home },
  { label: "1,401–1,800 sq ft", icon: Home },
  { label: "1,801–2,200 sq ft", icon: Home },
  { label: "2,201–2,500 sq ft", icon: Home },
  { label: "2,501–2,800 sq ft", icon: Home },
  { label: "2,801–3,500 sq ft", icon: Home },
  { label: "3,501+ sq ft", icon: Home },
  { label: "Not sure", icon: HelpCircle },
];

export const CENTRAL_STEPS: StepConfig[] = [
  {
    id: "c2",
    percent: 16,
    kind: "cards",
    field: "c_systemType",
    title: "What type of system are you interested in?",
    cardOptions: [
      { label: "Furnace Only", icon: Flame },
      { label: "Air Conditioner (AC) Only", icon: Wind },
      { label: "Air Handler + Heat Pump", icon: Zap },
      { label: "Furnace + AC", icon: Settings },
      { label: "Not Sure — Help Me Choose", icon: HelpCircle },
    ],
    note: (state) =>
      state.c_systemType === "Air Handler + Heat Pump"
        ? "ℹ️ Air Handler + Heat Pump systems work best when replaced together — matching components ensures efficiency and warranty."
        : null,
  },
  {
    id: "c3",
    percent: 24,
    kind: "cards",
    field: "c_homeSize",
    title: "What is the approximate size of your home?",
    cardOptions: homeSizeOptions,
  },
  {
    id: "c4",
    percent: 32,
    kind: "cards",
    field: "c_currentSetup",
    title: "What best describes your current setup?",
    cardOptions: [
      { label: "Furnace only", icon: Flame },
      { label: "Furnace + AC", icon: Settings },
      { label: "Heat pump + air handler", icon: Zap },
      { label: "Ductless / mini split", icon: Wind },
      { label: "Electric baseboard / wall heaters", icon: Plug },
      { label: "Not sure", icon: HelpCircle },
    ],
  },
  {
    id: "c5",
    percent: 40,
    kind: "cards",
    field: "c_ducted",
    title: "Is your home currently ducted?",
    cardOptions: [
      { label: "Yes", icon: CheckCircle },
      { label: "No", icon: XCircle },
      { label: "Not sure", icon: HelpCircle },
    ],
  },
  {
    id: "c6",
    percent: 48,
    kind: "cards",
    field: "c_equipmentLocation",
    title: "Where is your indoor equipment located?",
    subtitle: "This helps us size your system correctly",
    cardOptions: [
      { label: "Garage", icon: Car },
      { label: "Crawlspace", icon: ArrowDown },
      { label: "Attic", icon: ArrowUp },
      { label: "Closet / utility room", icon: DoorOpen },
      { label: "Basement", icon: Building2 },
      { label: "Not sure", icon: HelpCircle },
    ],
  },
  {
    id: "c7",
    percent: 56,
    kind: "multiselect",
    field: "c_priorities",
    title: "What is most important to you?",
    subtitle: "Select all that apply, then tap Continue",
    listOptions: [
      "Lowest upfront cost",
      "Better energy efficiency",
      "Lower utility bills",
      "Better comfort",
      "Quieter system",
      "Strong heating performance in winter",
      "Long-term reliability",
      "Not sure",
    ],
  },
  {
    id: "c8",
    percent: 64,
    kind: "list",
    field: "c_efficiency",
    title: "Standard or higher-efficiency equipment?",
    listOptions: ["Standard efficiency", "High efficiency", "Premium / variable speed", "Not sure"],
  },
  {
    id: "c9",
    percent: 72,
    kind: "cards",
    field: "c_electrical",
    title: "Do you know if your electrical panel may need upgrades?",
    cardOptions: [
      { label: "No, should be fine", icon: CheckCircle },
      { label: "Yes, it may need work", icon: AlertTriangle },
      { label: "Not sure", icon: HelpCircle },
    ],
  },
  {
    id: "c10",
    percent: 80,
    kind: "multiselect",
    field: "c_addOns",
    title: "Would you like to include any of the following?",
    subtitle: "Select all that apply, then tap Continue",
    listOptions: [
      "Smart thermostat",
      "Air filtration upgrade",
      "Air purifier / indoor air quality options",
      "Humidity control",
      "None of the above",
      "Not sure",
    ],
  },
  {
    id: "c11",
    percent: 88,
    kind: "list",
    field: "c_financing",
    title: "Are you interested in financing?",
    listOptions: ["Yes", "No", "Maybe / I'd like to learn more"],
  },
  {
    id: "c12",
    percent: 92,
    kind: "cards",
    field: "c_timeline",
    title: "When are you looking to complete this project?",
    cardOptions: [
      { label: "ASAP", icon: Zap },
      { label: "Within 30 days", icon: Calendar },
      { label: "Within 1–3 months", icon: CalendarDays },
      { label: "Just gathering pricing for now", icon: Search },
    ],
  },
  {
    id: "c13",
    percent: 96,
    kind: "contact",
    title: "Almost done — how do we reach you?",
    subtitle: "Your free AI estimate is just one step away",
  },
];

export const MINISPLIT_STEPS: StepConfig[] = [
  {
    id: "m2",
    percent: 18,
    kind: "cards",
    field: "m_zones",
    title: "How many zones do you need?",
    subtitle: "A zone = one indoor unit in one room or area",
    cardOptions: [
      { label: "1 Zone", icon: Wind },
      { label: "2 Zones", icon: Wind },
      { label: "3 Zones", icon: Wind },
      { label: "4 Zones", icon: Wind },
      { label: "5+ Zones", icon: Wind },
      { label: "Not sure", icon: HelpCircle },
    ],
  },
  {
    id: "m3",
    percent: 28,
    kind: "cards",
    field: "m_homeSize",
    title: "What is the approximate size of your home?",
    cardOptions: homeSizeOptions,
  },
  {
    id: "m4",
    percent: 38,
    kind: "cards",
    field: "m_unitType",
    title: "What type of indoor units are you interested in?",
    cardOptions: [
      { label: "Wall mounted", icon: Monitor },
      { label: "Ceiling cassette", icon: Layout },
      { label: "Floor mounted", icon: AlignEndHorizontal },
      { label: "Ducted mini split", icon: Wind },
      { label: "Not sure", icon: HelpCircle },
    ],
  },
  {
    id: "m5",
    percent: 48,
    kind: "cards",
    field: "m_scope",
    title: "What is this installation for?",
    cardOptions: [
      { label: "Whole home", icon: Home },
      { label: "Addition / ADU", icon: PlusSquare },
      { label: "Garage", icon: Car },
      { label: "Upstairs only", icon: ArrowUp },
      { label: "Specific rooms", icon: Grid3x3 },
    ],
  },
  {
    id: "m6",
    percent: 58,
    kind: "cards",
    field: "m_heatingCooling",
    title: "Do you need heating and cooling?",
    cardOptions: [
      { label: "Yes — both heating and cooling", icon: Thermometer },
      { label: "Cooling only", icon: Wind },
      { label: "Not sure", icon: HelpCircle },
    ],
  },
  {
    id: "m7",
    percent: 68,
    kind: "list",
    field: "m_electrical",
    title: "Is electrical available near the install area?",
    listOptions: ["Yes", "No", "Not sure"],
  },
  {
    id: "m8",
    percent: 78,
    kind: "list",
    field: "m_efficiency",
    title: "What level of efficiency are you interested in?",
    listOptions: ["Standard efficiency", "High efficiency", "Hyper Heat / cold climate rated", "Not sure"],
  },
  {
    id: "m9",
    percent: 88,
    kind: "list",
    field: "m_financing",
    title: "Are you interested in financing?",
    listOptions: ["Yes", "No", "Maybe / I'd like to learn more"],
  },
  {
    id: "m10",
    percent: 96,
    kind: "contact",
    title: "Almost done — how do we reach you?",
    subtitle: "Your free AI estimate is just one step away",
  },
];
