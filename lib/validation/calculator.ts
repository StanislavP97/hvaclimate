import { z } from "zod";

export const calculatorRequestSchema = z.object({
  systemPath: z.enum(["central", "minisplit", ""]),
  c_systemType: z.string(),
  c_homeSize: z.string(),
  c_currentSetup: z.string(),
  c_ducted: z.string(),
  c_equipmentLocation: z.string(),
  c_priorities: z.array(z.string()),
  c_efficiency: z.string(),
  c_electrical: z.string(),
  c_addOns: z.array(z.string()),
  c_financing: z.string(),
  c_timeline: z.string(),
  c_notes: z.string(),
  m_zones: z.string(),
  m_homeSize: z.string(),
  m_unitType: z.string(),
  m_scope: z.string(),
  m_heatingCooling: z.string(),
  m_electrical: z.string(),
  m_efficiency: z.string(),
  m_financing: z.string(),
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  phone: z.string().trim().min(10, "Phone is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  address: z.string().trim().min(3, "Address is required"),
});

export type CalculatorRequest = z.infer<typeof calculatorRequestSchema>;

export const estimateResultSchema = z.object({
  estimated_low: z.number(),
  estimated_high: z.number(),
  estimated_price: z.number().optional(),
  monthly_payment: z.number(),
  system_name: z.string(),
  factors: z.array(z.string()),
  recommendation: z.string(),
});
