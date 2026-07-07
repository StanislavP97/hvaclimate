import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  phone: z.string().trim().min(1, "Phone is required"),
  service: z.string().trim().optional(),
  address: z.string().trim().min(1, "Address is required"),
  message: z.string().trim().optional(),
  smsConsent: z.boolean(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
