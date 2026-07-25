export type SystemPath = "central" | "minisplit";

export interface CalculatorState {
  systemPath: SystemPath | "";
  // Central Air
  c_systemType: string;
  c_homeSize: string;
  c_currentSetup: string;
  c_ducted: string;
  c_equipmentLocation: string;
  c_priorities: string[];
  c_efficiency: string;
  c_electrical: string;
  c_addOns: string[];
  c_financing: string;
  c_timeline: string;
  c_notes: string;
  // Mini Split
  m_zones: string;
  m_homeSize: string;
  m_unitType: string;
  m_scope: string;
  m_heatingCooling: string;
  m_electrical: string;
  m_efficiency: string;
  m_financing: string;
  // Contact
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
}

export const initialCalculatorState: CalculatorState = {
  systemPath: "",
  c_systemType: "",
  c_homeSize: "",
  c_currentSetup: "",
  c_ducted: "",
  c_equipmentLocation: "",
  c_priorities: [],
  c_efficiency: "",
  c_electrical: "",
  c_addOns: [],
  c_financing: "",
  c_timeline: "",
  c_notes: "",
  m_zones: "",
  m_homeSize: "",
  m_unitType: "",
  m_scope: "",
  m_heatingCooling: "",
  m_electrical: "",
  m_efficiency: "",
  m_financing: "",
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  address: "",
};

export interface EstimateResult {
  estimated_low: number;
  estimated_high: number;
  estimated_price: number;
  monthly_payment: number;
  system_name: string;
  factors: string[];
  recommendation: string;
}

export function toggleMultiSelectValue(current: string[], value: string): string[] {
  return current.includes(value) ? current.filter((item) => item !== value) : [...current, value];
}
