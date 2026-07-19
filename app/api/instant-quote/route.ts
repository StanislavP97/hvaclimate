import { NextResponse } from "next/server";
import { Resend } from "resend";
import { instantQuoteRequestSchema } from "@/lib/validation/instant-quote";

const leadEmail = process.env.LEAD_EMAIL ?? "Office@HVAClimate.com";

const TIER_LABEL: Record<string, string> = {
  silver: "Silver",
  gold: "Gold",
  platinum: "Platinum",
};

const HOME_SIZE_LABEL: Record<string, string> = {
  small: "Under 1,500 sq ft",
  medium: "1,500 – 2,500 sq ft",
  large: "Over 2,500 sq ft",
};

const SYSTEM_LABEL: Record<string, string> = {
  gas: "Gas Furnace",
  electric: "Electric Furnace / Heat Pump",
  unsure: "Unsure",
};

const SERVICE_TYPE_LABEL: Record<string, string> = {
  replace: "Replace / upgrade",
  repair: "Repair",
  maintenance: "Maintenance",
  unsure: "Not sure yet",
};

const HOME_SIZE_DETAIL_LABEL: Record<string, string> = {
  small: "Small (under 1,500 sq ft)",
  medium: "Medium (1,500–2,500 sq ft)",
  large: "Large (2,500+ sq ft)",
};

interface PropertyDataInput {
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

function formatSubmittedAt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    timeZone: "America/Los_Angeles",
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
}

function propertyValueHtml(propertyData: PropertyDataInput) {
  const parts: string[] = [];

  if (propertyData.propertyValue != null) {
    const hasRange = propertyData.propertyValueLow != null && propertyData.propertyValueHigh != null;
    parts.push(`
      <p style="margin:10px 0 0;">🏷️ Est. market value: $${propertyData.propertyValue.toLocaleString("en-US")}${
        hasRange
          ? `<br/><span style="color:#64748b;font-size:13px;">Range: $${propertyData.propertyValueLow!.toLocaleString("en-US")} – $${propertyData.propertyValueHigh!.toLocaleString("en-US")}</span>`
          : ""
      }</p>`);
  }

  if (propertyData.rentEstimate != null) {
    parts.push(
      `<p style="margin:8px 0 0;">💰 Est. rental value: $${propertyData.rentEstimate.toLocaleString("en-US")}/mo</p>`,
    );
  }

  return parts.join("");
}

function propertyDataSectionHtml(propertyData: PropertyDataInput | null | undefined, homeSize: string) {
  if (propertyData?.source === "rentcast") {
    return `
    <tr><td style="padding:16px 24px 0;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:bold;color:#15803d;">✅ Auto-verified from public records</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#334155;">
        ${propertyData.squareFootage != null ? `<tr><td style="padding:3px 0;">🏠 Square footage</td><td style="padding:3px 0;text-align:right;">${propertyData.squareFootage.toLocaleString()} sq ft</td></tr>` : ""}
        ${propertyData.yearBuilt != null ? `<tr><td style="padding:3px 0;">📅 Year built</td><td style="padding:3px 0;text-align:right;">${propertyData.yearBuilt}</td></tr>` : ""}
        ${propertyData.bedrooms != null || propertyData.bathrooms != null ? `<tr><td style="padding:3px 0;">🛏 Bedrooms / Bathrooms</td><td style="padding:3px 0;text-align:right;">${propertyData.bedrooms ?? "?"} / ${propertyData.bathrooms ?? "?"}</td></tr>` : ""}
        ${propertyData.heatingType ? `<tr><td style="padding:3px 0;">🔥 Heating system</td><td style="padding:3px 0;text-align:right;">${propertyData.heatingType}</td></tr>` : ""}
      </table>
      ${propertyValueHtml(propertyData)}
    </td></tr>`;
  }

  return `
    <tr><td style="padding:16px 24px 0;">
      <p style="margin:0 0 10px;font-size:13px;font-weight:bold;color:#b45309;">⚠️ Property data not found — entered manually</p>
      <table style="width:100%;border-collapse:collapse;font-size:14px;color:#334155;">
        <tr><td style="padding:3px 0;">Home size</td><td style="padding:3px 0;text-align:right;">${HOME_SIZE_LABEL[homeSize] ?? homeSize}</td></tr>
      </table>
    </td></tr>`;
}

function officeEmailHtml(data: {
  contact: { name: string; phone: string; email: string };
  address: string;
  serviceType?: string | null;
  homeSize: string;
  currentSystem: string;
  selectedTier: string;
  selectedAddons: string[];
  priceRange: { min: number; max: number };
  monthlyPayment: number;
  submittedAt: string;
  propertyData?: PropertyDataInput | null;
}) {
  const addonsList =
    data.selectedAddons.length > 0
      ? data.selectedAddons.join(" • ")
      : "None";

  const housecallUrl = `https://app.housecallpro.com/customers/new?name=${encodeURIComponent(
    data.contact.name,
  )}&phone=${encodeURIComponent(data.contact.phone)}&email=${encodeURIComponent(
    data.contact.email,
  )}&address=${encodeURIComponent(data.address)}`;

  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0D1B2A;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:0 24px;">
        <h2 style="margin:20px 0 4px;font-size:20px;">🔔 New Lead</h2>
        <p style="margin:0 0 16px;font-size:13px;color:#64748b;">${SERVICE_TYPE_LABEL[data.serviceType ?? ""] ?? "Unspecified"}</p>
      </td></tr>

      <tr><td style="padding:0 24px;">
        <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-left:4px solid #2563EB;font-size:14px;">
          <tr><td style="padding:12px 16px;">
            👤 ${data.contact.name}<br/>
            📞 ${data.contact.phone}<br/>
            ✉️ ${data.contact.email}
          </td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:16px 24px 0;font-size:14px;">
        📍 ${data.address}
      </td></tr>

      ${propertyDataSectionHtml(data.propertyData, data.homeSize)}

      <tr><td style="padding:20px 24px 0;">
        <p style="margin:0 0 6px;font-size:13px;color:#64748b;">Current system: ${SYSTEM_LABEL[data.currentSystem] ?? data.currentSystem}</p>
      </td></tr>

      <tr><td style="padding:16px 24px 0;">
        <table style="width:100%;border-collapse:collapse;background:#0d1b2a;color:#ffffff;border-radius:8px;font-size:14px;">
          <tr><td style="padding:16px;">
            <p style="margin:0 0 8px;">Service: ${SERVICE_TYPE_LABEL[data.serviceType ?? ""] ?? "Not specified"}</p>
            ${data.propertyData?.source !== "rentcast" ? `<p style="margin:0 0 8px;">Home size: ${HOME_SIZE_DETAIL_LABEL[data.homeSize] ?? data.homeSize}</p>` : ""}
            <p style="margin:0 0 8px;font-weight:bold;">Selected package: ${TIER_LABEL[data.selectedTier] ?? data.selectedTier}</p>
            <p style="margin:0 0 8px;">Add-ons: ${addonsList}</p>
            <p style="margin:0 0 8px;">Price range: $${data.priceRange.min.toLocaleString()} – $${data.priceRange.max.toLocaleString()}</p>
            <p style="margin:0;">Est. monthly payment: $${data.monthlyPayment.toLocaleString()}/mo</p>
          </td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:16px 24px 0;font-size:12px;color:#94a3b8;">
        Submitted: ${data.submittedAt}
      </td></tr>

      <tr><td style="padding:24px;">
        <a href="${housecallUrl}" style="display:inline-block;background:#2563EB;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Open in Housecall Pro →</a>
      </td></tr>
    </table>
  </div>`;
}

function customerEmailHtml(data: {
  contact: { name: string };
  address: string;
  selectedTier: string;
  priceRange: { min: number; max: number };
  monthlyPayment: number;
}) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;color:#0D1B2A;">
    <table style="width:100%;border-collapse:collapse;">
      <tr><td style="padding:20px 24px 0;">
        <h2 style="margin:0 0 12px;font-size:20px;">Hi ${data.contact.name},</h2>
        <p style="margin:0 0 16px;font-size:14px;color:#334155;">Your estimate for ${data.address} is ready.</p>
      </td></tr>

      <tr><td style="padding:0 24px;">
        <table style="width:100%;border-collapse:collapse;background:#f8fafc;border-radius:8px;font-size:14px;color:#334155;">
          <tr><td style="padding:16px;">
            <p style="margin:0 0 6px;">Package: ${TIER_LABEL[data.selectedTier] ?? data.selectedTier}</p>
            <p style="margin:0 0 6px;font-weight:bold;font-size:18px;color:#0D1B2A;">Estimated investment: $${data.priceRange.min.toLocaleString()} – $${data.priceRange.max.toLocaleString()}</p>
            <p style="margin:0;">Monthly payment option: from $${data.monthlyPayment.toLocaleString()}/mo</p>
          </td></tr>
        </table>
      </td></tr>

      <tr><td style="padding:16px 24px 0;font-size:14px;color:#334155;">
        <p style="margin:0;">Our team will contact you within 2 hours to confirm details and schedule a free in-home visit.</p>
      </td></tr>

      <tr><td style="padding:16px 24px 0;font-size:14px;color:#334155;">
        📞 (360) 888-2217<br/>
        ✉️ Office@HVAClimate.com
      </td></tr>

      <tr><td style="padding:20px 24px;">
        <a href="https://www.hvaclimate.com/contact" style="display:inline-block;background:#2563EB;color:#ffffff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:bold;font-size:14px;">Schedule Your Free Visit →</a>
      </td></tr>

      <tr><td style="padding:0 24px 20px;">
        <p style="margin:0;font-size:12px;color:#94a3b8;">
          These are estimated price ranges for typical installations in the Vancouver WA / Portland OR area.
          Actual pricing may vary based on your home's specific conditions.
          A free in-home visit is required to confirm exact pricing.
        </p>
      </td></tr>
    </table>
  </div>`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = instantQuoteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const data = parsed.data;
  const submittedAt = formatSubmittedAt(new Date().toISOString());

  // TODO: Housecall Pro CRM integration
  // When HOUSECALL_PRO_API_KEY is available:
  // POST https://api.housecallpro.com/customers
  // POST https://api.housecallpro.com/jobs
  // Data: name, phone, email, address, job description with tier + addons

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log("[instant-quote] RESEND_API_KEY not set, logging submission:", data);
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);

  console.log("[InstantQuote] Sending emails to:", leadEmail, data.contact.email);

  const results = await Promise.allSettled([
    resend.emails.send({
      from: "HVA Climate <onboarding@resend.dev>",
      to: leadEmail,
      replyTo: data.contact.email,
      subject: `🔔 New Lead — ${data.contact.name} · ${SERVICE_TYPE_LABEL[data.serviceType ?? ""] ?? "Unspecified"} · ${TIER_LABEL[data.selectedTier] ?? data.selectedTier} · $${data.priceRange.min.toLocaleString()}–$${data.priceRange.max.toLocaleString()}`,
      html: officeEmailHtml({ ...data, submittedAt, propertyData: data.propertyData }),
    }),
    resend.emails.send({
      from: "HVA Climate <onboarding@resend.dev>",
      to: data.contact.email,
      subject: `Your HVA Climate Estimate — $${data.priceRange.min.toLocaleString()}–$${data.priceRange.max.toLocaleString()}`,
      html: customerEmailHtml(data),
    }),
  ]);

  console.log("[InstantQuote] Email results:", JSON.stringify(results));

  const [officeResult, customerResult] = results;

  if (officeResult.status === "rejected") {
    console.error("[InstantQuote] Email failed:", officeResult.reason);
  }
  if (customerResult.status === "rejected") {
    console.error("[InstantQuote] Email failed:", customerResult.reason);
  }

  return NextResponse.json({ success: true });
}
