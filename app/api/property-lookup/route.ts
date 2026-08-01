import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

interface PropertyLookupResult {
  found: boolean;
  squareFootage: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  heatingType: string | null;
  propertyType: string | null;
  propertyValue?: number;
  propertyValueLow?: number;
  propertyValueHigh?: number;
  rentEstimate?: number;
}

const NOT_FOUND_RESULT: PropertyLookupResult = {
  found: false,
  squareFootage: null,
  yearBuilt: null,
  bedrooms: null,
  bathrooms: null,
  heatingType: null,
  propertyType: null,
};

interface RentCastProperty {
  squareFootage?: number;
  yearBuilt?: number;
  bedrooms?: number;
  bathrooms?: number;
  propertyType?: string;
  features?: {
    heatingType?: string;
  };
  rentEstimate?: number;
}

interface RentCastAvmResponse {
  price?: number;
  priceRangeLow?: number;
  priceRangeHigh?: number;
}

async function fetchAvm(address: string) {
  const res = await fetch(
    `https://api.rentcast.io/v1/avm/value?address=${encodeURIComponent(address)}`,
    {
      headers: {
        "X-Api-Key": process.env.RENTCAST_API_KEY!,
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(3000),
    },
  );

  if (!res.ok) return null;
  return (await res.json()) as RentCastAvmResponse;
}

export async function GET(request: Request) {
  const ip = getClientIp(request);
  if (!checkRateLimit(ip, 5)) {
    return Response.json({ found: false, error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address || address.length > 200) return Response.json({ found: false });

  try {
    const [propertyResult, avmResult] = await Promise.allSettled([
      fetch(
        `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}&limit=1`,
        {
          headers: {
            "X-Api-Key": process.env.RENTCAST_API_KEY!,
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(3000),
        },
      ).then((res) => (res.ok ? res.json() : null)),
      fetchAvm(address),
    ]);

    const data = propertyResult.status === "fulfilled" ? propertyResult.value : null;
    const property: RentCastProperty | undefined = Array.isArray(data) ? data[0] : data;

    if (!property) return Response.json(NOT_FOUND_RESULT);

    const avm = avmResult.status === "fulfilled" ? avmResult.value : null;

    return Response.json({
      found: true,
      squareFootage: property.squareFootage || null,
      yearBuilt: property.yearBuilt || null,
      bedrooms: property.bedrooms || null,
      bathrooms: property.bathrooms || null,
      heatingType: property.features?.heatingType || null,
      propertyType: property.propertyType || null,
      ...(avm?.price != null && { propertyValue: avm.price }),
      ...(avm?.priceRangeLow != null && { propertyValueLow: avm.priceRangeLow }),
      ...(avm?.priceRangeHigh != null && { propertyValueHigh: avm.priceRangeHigh }),
      ...(property.rentEstimate != null && { rentEstimate: property.rentEstimate }),
    });
  } catch {
    return Response.json(NOT_FOUND_RESULT);
  }
}
