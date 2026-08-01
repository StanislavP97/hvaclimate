import { NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { calculatorRequestSchema, estimateResultSchema } from "@/lib/validation/calculator";
import type { CalculatorRequest } from "@/lib/validation/calculator";
import type { EstimateResult } from "@/types/calculator";
import { escapeHtml } from "@/lib/html-escape";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const leadEmail = process.env.LEAD_EMAIL ?? "Office@HVAClimate.com";

const FALLBACK_RESULT: EstimateResult = {
  estimated_low: 6500,
  estimated_high: 9500,
  estimated_price: 8000,
  monthly_payment: 444,
  system_name: "Standard HVAC System",
  factors: [
    "Home size and layout complexity",
    "Selected equipment type and efficiency",
    "Local Vancouver WA labor rates",
    "Permit and inspection requirements",
  ],
  recommendation:
    "Based on your answers, we recommend scheduling a free in-home assessment for an exact quote. Our team will evaluate your specific home conditions and provide precise pricing with no obligation.",
};

const SYSTEM_PROMPT = `You are an HVAC cost estimation expert for the Vancouver WA and Portland OR metro area (Pacific Northwest).
Based on the customer quiz answers, provide a realistic cost estimate.
Respond ONLY with valid JSON — no markdown, no explanation, no code blocks.
Format:
{
  "estimated_low": number,
  "estimated_high": number,
  "monthly_payment": number,
  "system_name": string,
  "factors": string[],
  "recommendation": string
}
Rules:
- All prices in USD whole numbers (no decimals)
- monthly_payment = Math.round(estimated_low / 60)
- system_name: short specific name e.g. "Carrier 96% Furnace + 18 SEER AC"
- factors: array of exactly 3-4 strings explaining the main price drivers
- recommendation: 2-3 sentences with specific, actionable advice
- Use realistic 2024-2025 Pacific Northwest installed prices:
    Central furnace only:        $3,500 – $6,000
    Central AC only:             $3,000 – $5,500
    Furnace + AC combo:          $6,500 – $12,000
    Heat pump + air handler:     $7,000 – $14,000
    Mini split 1 zone:           $3,500 – $6,000
    Mini split 2 zones:          $5,500 – $9,000
    Mini split 3 zones:          $7,000 – $12,000
    Mini split 4+ zones:         $10,000 – $16,000
- Increase estimate if:
    home is large (2,500+ sq ft): +10–20%
    premium/variable speed efficiency: +15–25%
    electrical panel work needed: +$1,500–$3,000
    add-ons selected (each): +$350–$800
    attic or crawlspace location (harder install): +$500–$1,500
- Decrease estimate if:
    small home (under 1,200 sq ft): -10%
    standard efficiency selected: base price
    simple closet/basement location: no adjustment`;

async function getEstimate(state: CalculatorRequest): Promise<EstimateResult> {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.log("[Calculator] No API key, using fallback estimate");
    return FALLBACK_RESULT;
  }

  try {
    const client = new Anthropic();
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1000,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: JSON.stringify(state) }],
    });

    const block = response.content[0];
    if (block.type !== "text") {
      throw new Error("Unexpected response content type");
    }

    const parsed = estimateResultSchema.parse(JSON.parse(block.text));
    parsed.estimated_price = Math.round((parsed.estimated_low + parsed.estimated_high) / 2 / 100) * 100;
    parsed.monthly_payment = Math.round(parsed.estimated_price / 18);
    return parsed as EstimateResult;
  } catch (error) {
    console.error("[Calculator] Anthropic error:", error);
    return FALLBACK_RESULT;
  }
}

const CENTRAL_FIELD_LABELS: Array<[keyof CalculatorRequest, string]> = [
  ["c_systemType", "System type"],
  ["c_homeSize", "Home size"],
  ["c_currentSetup", "Current setup"],
  ["c_ducted", "Has ductwork"],
  ["c_equipmentLocation", "Equipment location"],
  ["c_priorities", "Top priorities"],
  ["c_efficiency", "Efficiency level"],
  ["c_electrical", "Electrical panel"],
  ["c_addOns", "Add-ons wanted"],
  ["c_financing", "Financing interest"],
  ["c_timeline", "Timeline"],
  ["c_notes", "Notes"],
];

const MINISPLIT_FIELD_LABELS: Array<[keyof CalculatorRequest, string]> = [
  ["m_zones", "Number of zones"],
  ["m_homeSize", "Home size"],
  ["m_unitType", "Unit type"],
  ["m_scope", "Installation for"],
  ["m_heatingCooling", "Heating & cooling"],
  ["m_electrical", "Electrical ready"],
  ["m_efficiency", "Efficiency level"],
  ["m_financing", "Financing interest"],
];

function quizAnswersRowsHtml(state: CalculatorRequest) {
  const labels = state.systemPath === "minisplit" ? MINISPLIT_FIELD_LABELS : CENTRAL_FIELD_LABELS;

  return labels
    .map(([field, label], index) => {
      const rawValue = state[field];
      const value = Array.isArray(rawValue) ? rawValue.join(", ") : String(rawValue);
      const displayValue = value.trim() === "" ? "None" : escapeHtml(value);
      const rowBg = index % 2 === 0 ? "#ffffff" : "#f8fafc";
      return `
        <tr style="background:${rowBg};">
          <td style="padding:10px 16px;width:180px;color:#64748b;font-size:13px;vertical-align:top;">${label}</td>
          <td style="padding:10px 16px;color:#0d1b2a;font-size:13px;font-weight:bold;text-align:right;">${displayValue}</td>
        </tr>`;
    })
    .join("");
}

export function leadEmailHtml(state: CalculatorRequest, result: EstimateResult) {
  const firstName = escapeHtml(state.firstName);
  const lastName = escapeHtml(state.lastName);
  const phone = escapeHtml(state.phone);
  const email = escapeHtml(state.email);
  const address = escapeHtml(state.address);

  const housecallUrl = `https://app.housecallpro.com/customers/new?name=${encodeURIComponent(
    `${state.firstName} ${state.lastName}`,
  )}&phone=${encodeURIComponent(state.phone)}&email=${encodeURIComponent(
    state.email,
  )}&address=${encodeURIComponent(state.address)}`;

  return `
  <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#0D1B2A;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="background:#0d1b2a;padding:24px;">
        <p style="margin:0 0 6px;font-size:13px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;">⚡ New Calculator Lead</p>
        <h2 style="margin:0;font-size:22px;color:#ffffff;">${firstName} ${lastName}</h2>
      </td></tr>

      <tr><td style="background:#f8fafc;padding:20px 24px;font-size:14px;color:#334155;">
        📞 ${phone}<br/>
        ✉️ ${email}<br/>
        📍 ${address}
      </td></tr>

      <tr><td style="padding:20px 24px 0;">
        <table style="width:100%;border-collapse:collapse;background:#0d1b2a;border-radius:8px;">
          <tr><td style="padding:20px;text-align:center;">
            <p style="margin:0 0 8px;font-size:11px;font-weight:bold;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Estimated System Cost</p>
            <p style="margin:0 0 6px;font-size:32px;font-weight:bold;color:#2563EB;">$${result.estimated_price.toLocaleString()} ± 10%</p>
            <p style="margin:0 0 4px;font-size:13px;color:#cbd5e1;">${result.system_name}</p>
            <p style="margin:0;font-size:12px;color:#94a3b8;">From $${result.monthly_payment.toLocaleString()}/mo · 0% for 18 months</p>
          </td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:24px 24px 0;">
        <h3 style="margin:0 0 12px;font-size:14px;color:#0d1b2a;">What the customer told us</h3>
        <table style="width:100%;border-collapse:collapse;">
          ${quizAnswersRowsHtml(state)}
        </table>
      </td></tr>

      <tr><td style="padding:24px;text-align:center;">
        <a href="${housecallUrl}" style="display:inline-block;background:#2563EB;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Open in Housecall Pro →</a>
        <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;">Sent from HVA Climate Control Calculator</p>
      </td></tr>
    </table>
  </div>`;
}

export function leadEmailSubject(state: CalculatorRequest, result: EstimateResult) {
  return `🔔 New Estimate Lead — ${state.firstName} ${state.lastName} · ${result.system_name} · $${result.estimated_price.toLocaleString()}`;
}

async function sendLeadEmail(state: CalculatorRequest, result: EstimateResult) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log("[calculate-estimate] RESEND_API_KEY not set, skipping lead email");
    return;
  }

  const resend = new Resend(apiKey);
  const sendResult = await resend.emails.send({
    from: "HVA Climate <onboarding@resend.dev>",
    to: leadEmail,
    replyTo: state.email,
    subject: leadEmailSubject(state, result),
    html: leadEmailHtml(state, result),
  });

  if (sendResult.error) {
    console.error("[calculate-estimate] Lead email failed:", sendResult.error);
  }
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip, 10)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  console.log("[Calculator] Request received");
  const body = await request.json();
  console.log("[Calculator] Body:", JSON.stringify(body));

  const parsed = calculatorRequestSchema.safeParse(body);

  if (!parsed.success) {
    console.error("[Calculator] Validation failed:", JSON.stringify(parsed.error.issues));
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const state = parsed.data;
  const result = await getEstimate(state);

  await sendLeadEmail(state, result);

  return NextResponse.json({ success: true, result });
}
