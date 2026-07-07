import type { ContactFormData } from "@/lib/validation/contact";

export type { ContactFormData };

export type ContactFormResult =
  | { success: true; data: ContactFormData }
  | {
      success: false;
      error: string;
      fieldErrors?: Partial<Record<keyof ContactFormData, string>>;
    };
