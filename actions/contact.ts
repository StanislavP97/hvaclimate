"use server";

import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validation/contact";
import type { ContactFormData, ContactFormResult } from "@/types/contact";

const OFFICE_EMAIL = "Office@HVAClimate.com";

export async function submitContactForm(
  _prevState: ContactFormResult | null,
  formData: FormData,
): Promise<ContactFormResult> {
  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    service: formData.get("service") || undefined,
    address: formData.get("address"),
    message: formData.get("message") || undefined,
    smsConsent: formData.get("smsConsent") === "on",
  });

  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
    for (const issue of parsed.error.issues) {
      const field = issue.path[0] as keyof ContactFormData;
      if (!fieldErrors[field]) fieldErrors[field] = issue.message;
    }
    return { success: false, error: "Please fix the errors below.", fieldErrors };
  }

  const data = parsed.data;

  try {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
      console.log("[contact form] RESEND_API_KEY not set, logging submission:", data);
      return { success: true, data };
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: OFFICE_EMAIL,
      to: OFFICE_EMAIL,
      replyTo: data.email,
      subject: `New contact form submission from ${data.name}${data.service ? ` - ${data.service}` : ""}`,
      text: [
        `Name: ${data.name}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Service: ${data.service ?? "-"}`,
        `Address: ${data.address}`,
        `SMS consent: ${data.smsConsent ? "Yes" : "No"}`,
        "",
        "Message:",
        data.message ?? "-",
      ].join("\n"),
    });

    if (error) {
      return { success: false, error: "Failed to send message. Please try again." };
    }

    return { success: true, data };
  } catch {
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
