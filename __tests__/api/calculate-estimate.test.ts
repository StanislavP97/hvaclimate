import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const anthropicCreateMock = vi.fn();
const resendSendMock = vi.fn();

vi.mock("@anthropic-ai/sdk", () => ({
  default: class MockAnthropic {
    messages = { create: anthropicCreateMock };
  },
}));

vi.mock("resend", () => ({
  Resend: class MockResend {
    emails = { send: resendSendMock };
  },
}));

const centralPayload = {
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

const minisplitPayload = {
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

function anthropicTextResponse(json: Record<string, unknown>) {
  return { content: [{ type: "text", text: JSON.stringify(json) }] };
}

function postRequest(body: unknown) {
  return new Request("http://localhost/api/calculate-estimate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/calculate-estimate", () => {
  const originalApiKey = process.env.ANTHROPIC_API_KEY;

  beforeEach(() => {
    vi.resetModules();
    anthropicCreateMock.mockReset();
    resendSendMock.mockReset();
    resendSendMock.mockResolvedValue({ error: null });
    delete process.env.RESEND_API_KEY;
    process.env.ANTHROPIC_API_KEY = "test-key";
  });

  afterEach(() => {
    if (originalApiKey === undefined) {
      delete process.env.ANTHROPIC_API_KEY;
    } else {
      process.env.ANTHROPIC_API_KEY = originalApiKey;
    }
  });

  it("returns 200 with a full estimate for a valid central air payload", async () => {
    anthropicCreateMock.mockResolvedValue(
      anthropicTextResponse({
        estimated_low: 7800,
        estimated_high: 11500,
        monthly_payment: 0,
        system_name: "Carrier 96% Furnace + 18 SEER AC",
        factors: ["Home size", "Efficiency tier", "Labor rates"],
        recommendation: "Schedule a free in-home visit for exact pricing.",
      }),
    );

    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest(centralPayload));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.result.estimated_price).toBeTypeOf("number");
    expect(data.result.monthly_payment).toBeTypeOf("number");
    expect(Array.isArray(data.result.factors)).toBe(true);
    expect(data.result.recommendation).toBeTypeOf("string");
  });

  it("returns 200 for a valid mini split payload", async () => {
    anthropicCreateMock.mockResolvedValue(
      anthropicTextResponse({
        estimated_low: 5500,
        estimated_high: 9000,
        monthly_payment: 0,
        system_name: "Mitsubishi 2-Zone Mini Split",
        factors: ["Zone count", "Home size", "Efficiency tier"],
        recommendation: "A 2-zone system fits this home well.",
      }),
    );

    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest(minisplitPayload));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.result.system_name).toBe("Mitsubishi 2-Zone Mini Split");
  });

  it("returns 400 when required fields are missing", async () => {
    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest({ firstName: "John" }));
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.success).toBe(false);
  });

  it("returns 400 when phone is shorter than 7 characters", async () => {
    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest({ ...centralPayload, phone: "12345" }));

    expect(response.status).toBe(400);
  });

  it("returns 400 when email is missing", async () => {
    const { POST } = await import("@/app/api/calculate-estimate/route");
    const payload = { ...centralPayload } as Record<string, unknown>;
    delete payload.email;
    const response = await POST(postRequest(payload));

    expect(response.status).toBe(400);
  });

  it("returns 400 when systemPath is an invalid empty-like value", async () => {
    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest({ ...centralPayload, systemPath: "unknown" }));

    expect(response.status).toBe(400);
  });

  it("falls back to the static estimate with 200 when ANTHROPIC_API_KEY is not set", async () => {
    delete process.env.ANTHROPIC_API_KEY;

    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest(centralPayload));
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.result.system_name).toBe("Standard HVAC System");
    expect(anthropicCreateMock).not.toHaveBeenCalled();
  });

  it("computes estimated_price as the low/high midpoint rounded to the nearest $100", async () => {
    anthropicCreateMock.mockResolvedValue(
      anthropicTextResponse({
        estimated_low: 7800,
        estimated_high: 11500,
        monthly_payment: 0,
        system_name: "Test System",
        factors: ["a", "b", "c"],
        recommendation: "Test recommendation.",
      }),
    );

    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest(centralPayload));
    const data = await response.json();

    const expectedPrice = Math.round((7800 + 11500) / 2 / 100) * 100;
    expect(data.result.estimated_price).toBe(expectedPrice);
  });

  it("computes monthly_payment as estimated_price / 18, rounded", async () => {
    anthropicCreateMock.mockResolvedValue(
      anthropicTextResponse({
        estimated_low: 7800,
        estimated_high: 11500,
        monthly_payment: 0,
        system_name: "Test System",
        factors: ["a", "b", "c"],
        recommendation: "Test recommendation.",
      }),
    );

    const { POST } = await import("@/app/api/calculate-estimate/route");
    const response = await POST(postRequest(centralPayload));
    const data = await response.json();

    const expectedPayment = Math.round(data.result.estimated_price / 18);
    expect(data.result.monthly_payment).toBe(expectedPayment);
  });
});
