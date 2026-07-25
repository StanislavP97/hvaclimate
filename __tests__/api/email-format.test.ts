import { describe, expect, it } from "vitest";
import { leadEmailHtml, leadEmailSubject } from "@/app/api/calculate-estimate/route";
import type { CalculatorRequest } from "@/lib/validation/calculator";
import type { EstimateResult } from "@/types/calculator";

const centralState: CalculatorRequest = {
  systemPath: "central",
  c_systemType: "Furnace + AC",
  c_homeSize: "1,801–2,200 sq ft",
  c_currentSetup: "Furnace only",
  c_ducted: "Yes",
  c_equipmentLocation: "Garage",
  c_priorities: ["Lower utility bills", "Better comfort"],
  c_efficiency: "High efficiency",
  c_electrical: "No, should be fine",
  c_addOns: ["Smart thermostat"],
  c_financing: "Yes",
  c_timeline: "Within 30 days",
  c_notes: "System stopped working last week",
  m_zones: "",
  m_homeSize: "",
  m_unitType: "",
  m_scope: "",
  m_heatingCooling: "",
  m_electrical: "",
  m_efficiency: "",
  m_financing: "",
  firstName: "John",
  lastName: "Smith",
  phone: "3608882217",
  email: "john@test.com",
  address: "123 Main St, Vancouver WA 98661",
};

const minisplitState: CalculatorRequest = {
  systemPath: "minisplit",
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
  m_zones: "2 Zones",
  m_homeSize: "1,401–1,800 sq ft",
  m_unitType: "Wall mounted",
  m_scope: "Whole home",
  m_heatingCooling: "Yes — both heating and cooling",
  m_electrical: "Yes",
  m_efficiency: "High efficiency",
  m_financing: "No",
  firstName: "Jane",
  lastName: "Doe",
  phone: "3608882217",
  email: "jane@test.com",
  address: "456 Oak Ave, Portland OR 97201",
};

const result: EstimateResult = {
  estimated_low: 7800,
  estimated_high: 11500,
  estimated_price: 9700,
  monthly_payment: 539,
  system_name: "Carrier 96% Furnace + 18 SEER AC",
  factors: ["Home size", "Efficiency tier", "Labor rates"],
  recommendation: "Schedule a free in-home visit for exact pricing.",
};

describe("leadEmailHtml", () => {
  it("contains the customer's first and last name", () => {
    const html = leadEmailHtml(centralState, result);
    expect(html).toContain("John");
    expect(html).toContain("Smith");
  });

  it("contains the estimated price formatted with a dollar sign", () => {
    const html = leadEmailHtml(centralState, result);
    expect(html).toContain(`$${result.estimated_price.toLocaleString()}`);
  });

  it("contains the system name", () => {
    const html = leadEmailHtml(centralState, result);
    expect(html).toContain(result.system_name);
  });

  it("contains the monthly payment", () => {
    const html = leadEmailHtml(centralState, result);
    expect(html).toContain(`$${result.monthly_payment.toLocaleString()}`);
  });

  it("shows human-readable labels for the central path, not raw field names", () => {
    const html = leadEmailHtml(centralState, result);

    expect(html).toContain("System type");
    expect(html).toContain("Home size");
    expect(html).toContain("Current setup");
    expect(html).toContain("Has ductwork");
    expect(html).toContain("Equipment location");
    expect(html).toContain("Top priorities");
    expect(html).toContain("Efficiency level");
    expect(html).toContain("Electrical panel");
    expect(html).toContain("Add-ons wanted");
    expect(html).toContain("Financing interest");
    expect(html).toContain("Timeline");
    expect(html).toContain("Notes");

    expect(html).not.toContain("c_systemType");
    expect(html).not.toContain("c_homeSize");
    expect(html).not.toContain("c_ducted");
    expect(html).not.toContain("c_equipmentLocation");
  });

  it("shows human-readable labels and values for the mini split path", () => {
    const html = leadEmailHtml(minisplitState, result);

    expect(html).toContain("Number of zones");
    expect(html).toContain("2 Zones");
    expect(html).toContain("Unit type");
    expect(html).toContain("Wall mounted");
    expect(html).toContain("Installation for");
    expect(html).toContain("Whole home");
    expect(html).toContain("Heating & cooling");
    expect(html).toContain("Electrical ready");
    expect(html).toContain("Efficiency level");
    expect(html).toContain("Financing interest");

    expect(html).not.toContain("m_zones");
    expect(html).not.toContain("m_homeSize");
    expect(html).not.toContain("m_unitType");
  });

  it("does not render central-only fields for a mini split lead", () => {
    const html = leadEmailHtml(minisplitState, result);
    expect(html).not.toContain("System type");
    expect(html).not.toContain("Has ductwork");
  });

  it("has a max-width of 640px on the email container", () => {
    const html = leadEmailHtml(centralState, result);
    expect(html).toContain("max-width:640px");
  });
});

describe("leadEmailSubject", () => {
  it("includes the customer's first name and the estimated price", () => {
    const subject = leadEmailSubject(centralState, result);
    expect(subject).toContain(centralState.firstName);
    expect(subject).toContain(`$${result.estimated_price.toLocaleString()}`);
  });
});
