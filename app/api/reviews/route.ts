import { NextResponse } from "next/server";
import { fetchGoogleReviews } from "@/lib/google-reviews";

export const revalidate = 86400;

export async function GET() {
  const data = await fetchGoogleReviews();
  return NextResponse.json(data);
}
