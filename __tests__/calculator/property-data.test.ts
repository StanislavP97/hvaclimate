import { describe, expect, it } from "vitest";
import { toPropertyData } from "@/components/calculator/steps/ContactStep";
import { hasVerifiedPropertyData } from "@/types/calculator";

describe("toPropertyData", () => {
  it("returns null when the lookup found no property", () => {
    expect(toPropertyData({ found: false })).toBeNull();
  });

  it("drops null fields and tags the source", () => {
    expect(
      toPropertyData({ found: true, squareFootage: 1800, yearBuilt: null, bedrooms: 3, heatingType: null }),
    ).toEqual({ source: "rentcast", squareFootage: 1800, bedrooms: 3 });
  });

  it("returns null when only non-sizing fields came back", () => {
    expect(toPropertyData({ found: true, bedrooms: 3, bathrooms: 2 })).toBeNull();
  });
});

describe("hasVerifiedPropertyData", () => {
  it("is false for null and empty data", () => {
    expect(hasVerifiedPropertyData(null)).toBe(false);
    expect(hasVerifiedPropertyData(undefined)).toBe(false);
    expect(hasVerifiedPropertyData({ source: "rentcast" })).toBe(false);
  });

  it("is true when a sizing signal is present", () => {
    expect(hasVerifiedPropertyData({ squareFootage: 1800 })).toBe(true);
    expect(hasVerifiedPropertyData({ yearBuilt: 1994 })).toBe(true);
    expect(hasVerifiedPropertyData({ heatingType: "Forced Air" })).toBe(true);
  });
});
