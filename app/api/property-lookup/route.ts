interface PropertyLookupResult {
  found: boolean;
  squareFootage: number | null;
  yearBuilt: number | null;
  bedrooms: number | null;
  bathrooms: number | null;
  heatingType: string | null;
  propertyType: string | null;
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
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) return Response.json({ found: false });

  try {
    const res = await fetch(
      `https://api.rentcast.io/v1/properties?address=${encodeURIComponent(address)}&limit=1`,
      {
        headers: {
          "X-Api-Key": process.env.RENTCAST_API_KEY!,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(3000),
      },
    );

    if (!res.ok) return Response.json(NOT_FOUND_RESULT);

    const data = await res.json();
    const property: RentCastProperty | undefined = Array.isArray(data) ? data[0] : data;

    if (!property) return Response.json(NOT_FOUND_RESULT);

    return Response.json({
      found: true,
      squareFootage: property.squareFootage || null,
      yearBuilt: property.yearBuilt || null,
      bedrooms: property.bedrooms || null,
      bathrooms: property.bathrooms || null,
      heatingType: property.features?.heatingType || null,
      propertyType: property.propertyType || null,
    });
  } catch {
    return Response.json(NOT_FOUND_RESULT);
  }
}
