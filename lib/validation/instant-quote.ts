import { z } from "zod";

const propertyDataSchema = z
  .object({
    squareFootage: z.number().nullable(),
    yearBuilt: z.number().nullable(),
    bedrooms: z.number().nullable(),
    bathrooms: z.number().nullable(),
    heatingType: z.string().nullable(),
    source: z.enum(["rentcast", "manual"]),
  })
  .nullable()
  .optional();

export const instantQuoteRequestSchema = z.object({
  contact: z.object({
    name: z.string().trim().min(2, "Name is required"),
    phone: z.string().trim().min(10, "Phone is required"),
    email: z.string().trim().min(1, "Email is required").email("Enter a valid email"),
  }),
  address: z.string().trim().min(5, "Address is required"),
  homeSize: z.enum(["small", "medium", "large"]),
  currentSystem: z.enum(["gas", "electric", "unsure"]),
  selectedTier: z.enum(["silver", "gold", "platinum"]),
  selectedAddons: z.array(z.string()),
  priceRange: z.object({
    min: z.number(),
    max: z.number(),
  }),
  monthlyPayment: z.number(),
  propertyData: propertyDataSchema,
});

export type InstantQuoteRequest = z.infer<typeof instantQuoteRequestSchema>;
