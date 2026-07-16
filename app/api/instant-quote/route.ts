import { NextResponse } from "next/server";
import { Resend } from "resend";
import { instantQuoteRequestSchema } from "@/lib/validation/instant-quote";

const OFFICE_EMAIL = "Office@HVAClimate.com";

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

function officeEmailHtml(data: {
  contact: { name: string; phone: string; email: string };
  address: string;
  homeSize: string;
  currentSystem: string;
  selectedTier: string;
  selectedAddons: string[];
  priceRange: { min: number; max: number };
  submittedAt: string;
}) {
  const addonsList =
    data.selectedAddons.length > 0
      ? data.selectedAddons.map((a) => `<li>${a}</li>`).join("")
      : "<li>None selected</li>";

  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0D1B2A;">
    <h2 style="margin:0 0 16px;">New Instant Quote Lead</h2>
    <table style="width:100%;border-collapse:collapse;font-size:14px;">
      <tr><td style="padding:6px 0;font-weight:bold;">Name</td><td style="padding:6px 0;">${data.contact.name}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Phone</td><td style="padding:6px 0;">${data.contact.phone}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Email</td><td style="padding:6px 0;">${data.contact.email}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Address</td><td style="padding:6px 0;">${data.address}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Home Size</td><td style="padding:6px 0;">${HOME_SIZE_LABEL[data.homeSize] ?? data.homeSize}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Current System</td><td style="padding:6px 0;">${SYSTEM_LABEL[data.currentSystem] ?? data.currentSystem}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Selected Tier</td><td style="padding:6px 0;">${TIER_LABEL[data.selectedTier] ?? data.selectedTier}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;vertical-align:top;">Add-ons</td><td style="padding:6px 0;"><ul style="margin:0;padding-left:18px;">${addonsList}</ul></td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Price Range</td><td style="padding:6px 0;">$${data.priceRange.min.toLocaleString()} – $${data.priceRange.max.toLocaleString()}</td></tr>
      <tr><td style="padding:6px 0;font-weight:bold;">Submitted</td><td style="padding:6px 0;">${data.submittedAt}</td></tr>
    </table>
  </div>`;
}

function customerEmailHtml(data: {
  contact: { name: string };
  address: string;
  selectedTier: string;
  priceRange: { min: number; max: number };
}) {
  return `
  <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;color:#0D1B2A;">
    <h2 style="margin:0 0 12px;">Hi ${data.contact.name}, your estimate is ready!</h2>
    <p style="font-size:14px;color:#334155;margin:0 0 16px;">Address: ${data.address}</p>
    <p style="font-size:14px;color:#334155;margin:0 0 16px;">${TIER_LABEL[data.selectedTier] ?? data.selectedTier} system</p>
    <p style="font-size:20px;font-weight:bold;margin:0 0 16px;">Typical investment: $${data.priceRange.min.toLocaleString()} – $${data.priceRange.max.toLocaleString()}</p>
    <p style="font-size:14px;color:#334155;margin:0 0 16px;">Our team will contact you within 2 hours.</p>
    <p style="font-size:14px;color:#334155;margin:0 0 24px;">Phone: (360) 888-2217</p>
    <a href="https://www.hvaclimate.com/contact" style="display:inline-block;background:#F97316;color:#ffffff;padding:14px 28px;border-radius:10px;text-decoration:none;font-weight:bold;">Schedule Your Free Visit</a>
  </div>`;
}

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = instantQuoteRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 });
  }

  const data = parsed.data;
  const submittedAt = new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

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

  try {
    const resend = new Resend(apiKey);

    await resend.emails.send({
      from: OFFICE_EMAIL,
      to: OFFICE_EMAIL,
      replyTo: data.contact.email,
      subject: `🔔 New Instant Quote Lead — ${data.contact.name} · ${data.address}`,
      html: officeEmailHtml({ ...data, submittedAt }),
    });

    await resend.emails.send({
      from: OFFICE_EMAIL,
      to: data.contact.email,
      subject: `Your HVA Climate Estimate is Ready — $${data.priceRange.min.toLocaleString()} – $${data.priceRange.max.toLocaleString()}`,
      html: customerEmailHtml(data),
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ success: false, error: "Failed to send email" }, { status: 500 });
  }
}
