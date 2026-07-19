"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { AddressAutocomplete } from "@/components/instant-quote/AddressAutocomplete";
import { STEP2_OPTIONS } from "@/components/instant-quote/quiz-data";
import { isValidAddress } from "@/components/instant-quote/validation";
import type { CurrentSystem, HomeSize, PropertyData } from "@/components/instant-quote/types";

interface QuizStep2HomeSizeProps {
  address: string;
  value: HomeSize | null;
  onNext: (
    address: string,
    value: HomeSize,
    propertyData?: PropertyData | null,
    currentSystem?: CurrentSystem | null,
  ) => void;
}

interface PropertyLookupResponse {
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

function sizeFromSquareFootage(squareFootage: number | null): HomeSize {
  if (squareFootage == null) return "medium";
  if (squareFootage < 1500) return "small";
  if (squareFootage <= 2500) return "medium";
  return "large";
}

function systemFromHeatingType(heatingType: string | null): CurrentSystem {
  if (!heatingType) return "unsure";
  const normalized = heatingType.toUpperCase();
  if (normalized.includes("HEAT PUMP")) return "electric";
  if (normalized.includes("GAS") || normalized.includes("FORCED AIR")) return "gas";
  return "unsure";
}

export function QuizStep2HomeSize({ address, value, onNext }: QuizStep2HomeSizeProps) {
  const [selected, setSelected] = useState<HomeSize | null>(value);
  const [addressValue, setAddressValue] = useState(address);
  const [touched, setTouched] = useState(false);

  const [lookupState, setLookupState] = useState<"idle" | "loading" | "found" | "not-found">(
    "idle",
  );
  const [property, setProperty] = useState<PropertyLookupResponse | null>(null);
  const [manualEntry, setManualEntry] = useState(false);

  const addressValid = isValidAddress(addressValue);
  const canProceed = !!selected && addressValid;

  async function runLookup(fullAddress: string) {
    setLookupState("loading");
    try {
      const response = await fetch(
        `/api/property-lookup?address=${encodeURIComponent(fullAddress)}`,
      );
      const data = (await response.json()) as PropertyLookupResponse;

      if (data.found) {
        setProperty(data);
        setLookupState("found");
      } else {
        setLookupState("not-found");
      }
    } catch {
      setLookupState("not-found");
    }
  }

  function handleAddressSelect(formattedAddress: string) {
    setAddressValue(formattedAddress);
    setManualEntry(false);
    void runLookup(formattedAddress);
  }

  function handleConfirmProperty() {
    if (!property) return;

    const propertyData: PropertyData = {
      squareFootage: property.squareFootage,
      yearBuilt: property.yearBuilt,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      heatingType: property.heatingType,
      source: "rentcast",
      ...(property.propertyValue != null && { propertyValue: property.propertyValue }),
      ...(property.propertyValueLow != null && { propertyValueLow: property.propertyValueLow }),
      ...(property.propertyValueHigh != null && { propertyValueHigh: property.propertyValueHigh }),
      ...(property.rentEstimate != null && { rentEstimate: property.rentEstimate }),
    };

    const autoSize = sizeFromSquareFootage(property.squareFootage);
    const autoSystem = systemFromHeatingType(property.heatingType);

    onNext(addressValue, autoSize, propertyData, autoSystem);
  }

  function handleManualEntry() {
    setManualEntry(true);
  }

  function handleNext() {
    setTouched(true);
    if (selected && addressValid) {
      const propertyData: PropertyData | null = manualEntry
        ? {
            squareFootage: null,
            yearBuilt: null,
            bedrooms: null,
            bathrooms: null,
            heatingType: null,
            source: "manual",
          }
        : null;
      onNext(addressValue, selected, propertyData);
    }
  }

  const showManualFlow = manualEntry || lookupState === "not-found" || lookupState === "idle";
  const showPropertyCard = lookupState === "found" && property && !manualEntry;
  const isLookingUp = lookupState === "loading";

  return (
    <div>
      <h2 className="mb-2 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[25px] font-extrabold text-[#0D1B2A] max-sm:text-[19px]">
        First, what&apos;s your service address?
      </h2>
      <p className="mb-4 text-center text-[15px] text-[#64748b] max-sm:text-[13px]">
        Helps us check local permits and utility rebates in your area
      </p>

      <div className="mb-4 max-sm:mb-3">
        <AddressAutocomplete
          value={addressValue}
          onChange={(next) => {
            setAddressValue(next);
            setLookupState("idle");
            setManualEntry(false);
          }}
          onAddressSelect={handleAddressSelect}
        />
        {touched && !addressValid && (
          <p className="mt-1 text-xs text-[#ef4444]">Please enter your service address.</p>
        )}
      </div>

      {isLookingUp && (
        <div className="mb-7 flex items-center justify-center gap-2 max-sm:mb-5">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#2563EB]/30 border-t-[#2563EB]" />
          <p className="text-sm font-semibold text-[#0D1B2A]">
            Looking up your home details...
          </p>
        </div>
      )}

      {lookupState === "not-found" && (
        <div
          className="mb-7 max-sm:mb-5"
          style={{ border: "1px solid #e2e7ee", borderRadius: 12, padding: 20, background: "#f8fafc" }}
        >
          <p className="font-[Plus_Jakarta_Sans,sans-serif] text-[15px] font-bold text-[#64748b]">
            ℹ We couldn&apos;t auto-detect your home details
          </p>
          <p className="mt-1 text-sm text-[#94a3b8]">Answer 2 quick questions below</p>
        </div>
      )}

      {showPropertyCard && property && (
        <div
          className="mb-7 max-sm:mb-5"
          style={{ border: "1px solid #bbf7d0", borderRadius: 12, padding: 20, background: "#f0fdf4" }}
        >
          <p className="mb-3 font-[Plus_Jakarta_Sans,sans-serif] text-[15px] font-bold text-[#15803d]">
            ✓ We found your home!
          </p>
          <div className="space-y-1.5 text-sm text-[#334155]">
            {property.squareFootage != null && <p>🏠 {property.squareFootage.toLocaleString()} sq ft</p>}
            {property.yearBuilt != null && <p>📅 Built in {property.yearBuilt}</p>}
            {property.heatingType && <p>🌡 {property.heatingType}</p>}
            {(property.bedrooms != null || property.bathrooms != null) && (
              <p>
                🛏 {property.bedrooms != null && `${property.bedrooms} bed`}
                {property.bedrooms != null && property.bathrooms != null && " · "}
                {property.bathrooms != null && `${property.bathrooms} bath`}
              </p>
            )}
          </div>

          <div className="mt-4 flex flex-col gap-2.5 sm:flex-row">
            <button
              type="button"
              onClick={handleConfirmProperty}
              className="group flex flex-1 items-center justify-center gap-2 rounded-[10px] bg-[#2563EB] py-3 text-center font-[Plus_Jakarta_Sans,sans-serif] text-sm font-bold text-white hover:bg-[#1d4ed8]"
            >
              <span>Looks right</span>
              <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
            </button>
            <button
              type="button"
              onClick={handleManualEntry}
              className="flex-1 rounded-[10px] border border-[#e2e8f0] py-3 text-center font-[Plus_Jakarta_Sans,sans-serif] text-sm font-bold text-[#334155] hover:border-[#2563EB]/60"
            >
              Edit manually
            </button>
          </div>
        </div>
      )}

      {showManualFlow && (
        <>
          <h2 className="mb-2 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[25px] font-extrabold text-[#0D1B2A] max-sm:text-[19px]">
            What is the approximate size of your home?
          </h2>
          <p className="mb-7 text-center text-[15px] text-[#64748b] max-sm:text-[13px]">
            Living space only — skip unfinished basements or garages
          </p>

          <div className="mb-7 grid grid-cols-3 gap-3.5 max-sm:mb-5 max-sm:grid-cols-1 max-sm:gap-2.5">
            {STEP2_OPTIONS.map((opt) => {
              const isSelected = selected === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setSelected(opt.id)}
                  className={`relative min-h-20 rounded-2xl p-[22px] text-left transition-colors max-sm:flex max-sm:min-h-0 max-sm:items-center max-sm:gap-3 max-sm:rounded-[14px] max-sm:p-3.5 ${
                    isSelected
                      ? "border-2 border-[#2563EB] bg-[#eaf1ff]"
                      : "border border-[#eaeef3] bg-white hover:border-[#2563EB]/60"
                  }`}
                >
                  {opt.badge && (
                    <span className="absolute -top-2.5 right-3 rounded-full bg-[#2563EB] px-2.5 py-1 font-[Plus_Jakarta_Sans,sans-serif] text-[11px] font-bold text-white max-sm:hidden">
                      Most Common
                    </span>
                  )}
                  {isSelected && (
                    <span className="absolute right-3.5 top-3.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-[#2563EB] text-xs text-white max-sm:static max-sm:ml-auto max-sm:h-5 max-sm:w-5">
                      ✓
                    </span>
                  )}
                  <div className="mb-2.5 text-[28px] max-sm:mb-0 max-sm:text-[22px]">
                    {opt.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="mb-1 font-[Plus_Jakarta_Sans,sans-serif] text-[15px] font-bold text-[#0D1B2A] max-sm:mb-0 max-sm:text-sm">
                      {opt.title}
                    </div>
                    <div className="text-[12.5px] leading-snug text-[#64748b] max-sm:text-xs">
                      {opt.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceed || isLookingUp}
            className={`group flex w-full min-h-[60px] items-center justify-center gap-2 rounded-[11px] py-4 text-center font-[Plus_Jakarta_Sans,sans-serif] text-[15.5px] font-bold transition-colors ${
              canProceed && !isLookingUp
                ? "cursor-pointer bg-[#2563EB] text-white shadow-[0_8px_20px_rgba(37,99,235,.3)] hover:bg-[#1d4ed8]"
                : "cursor-not-allowed bg-[#e2e8f0] text-[#94a3b8]"
            }`}
          >
            <span>Next</span>
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </>
      )}
    </div>
  );
}
