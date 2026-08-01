"use client";

import { useEffect, useRef } from "react";

export interface PlaceDetails {
  formattedAddress: string;
  streetNumber: string;
  route: string;
  city: string;
  state: string;
  zip: string;
  lat?: number;
  lng?: number;
}

interface AddressAutocompleteProps {
  onAddressSelect: (address: string, details: PlaceDetails) => void;
  value: string;
  onChange: (value: string) => void;
}

// Vancouver WA / Portland OR bounding box, used to bias (not restrict) results.
const AREA_BOUNDS = {
  south: 45.4,
  west: -122.7,
  north: 45.8,
  east: -122.4,
};

interface GoogleMapsAddressComponent {
  long_name: string;
  short_name: string;
  types: string[];
}

interface GoogleMapsPlaceResult {
  formatted_address?: string;
  address_components?: GoogleMapsAddressComponent[];
  geometry?: { location?: { lat(): number; lng(): number } };
}

interface GoogleMapsAutocomplete {
  addListener(event: "place_changed", handler: () => void): void;
  getPlace(): GoogleMapsPlaceResult;
}

interface GoogleMapsNamespace {
  maps: {
    places: {
      Autocomplete: new (
        input: HTMLInputElement,
        options?: {
          componentRestrictions?: { country: string };
          bounds?: { south: number; west: number; north: number; east: number };
          fields?: string[];
        },
      ) => GoogleMapsAutocomplete;
    };
    LatLngBounds: new (
      sw: { lat: number; lng: number },
      ne: { lat: number; lng: number },
    ) => unknown;
  };
}

declare global {
  interface Window {
    google?: GoogleMapsNamespace;
  }
}

let placesScriptPromise: Promise<void> | null = null;

function loadPlacesScript(apiKey: string): Promise<void> {
  if (window.google?.maps?.places) return Promise.resolve();
  if (placesScriptPromise) return placesScriptPromise;

  placesScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.setAttribute("loading", "async");
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Places script"));
    document.head.appendChild(script);
  });

  return placesScriptPromise;
}

function extractComponent(
  components: GoogleMapsAddressComponent[] | undefined,
  type: string,
): string {
  return components?.find((c) => c.types.includes(type))?.long_name ?? "";
}

function extractComponentShort(
  components: GoogleMapsAddressComponent[] | undefined,
  type: string,
): string {
  return components?.find((c) => c.types.includes(type))?.short_name ?? "";
}

export function AddressAutocomplete({ onAddressSelect, value, onChange }: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const onAddressSelectRef = useRef(onAddressSelect);

  useEffect(() => {
    onAddressSelectRef.current = onAddressSelect;
  }, [onAddressSelect]);

  useEffect(() => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;
    if (!apiKey || !inputRef.current) return;

    let cancelled = false;

    loadPlacesScript(apiKey).then(() => {
      if (cancelled || !inputRef.current || !window.google?.maps?.places) return;

      const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
        componentRestrictions: { country: "us" },
        bounds: AREA_BOUNDS,
        fields: ["formatted_address", "address_components", "geometry"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        const components = place.address_components;
        const formattedAddress = place.formatted_address ?? "";

        const details: PlaceDetails = {
          formattedAddress,
          streetNumber: extractComponent(components, "street_number"),
          route: extractComponent(components, "route"),
          city: extractComponent(components, "locality"),
          state: extractComponentShort(components, "administrative_area_level_1"),
          zip: extractComponent(components, "postal_code"),
          lat: place.geometry?.location?.lat(),
          lng: place.geometry?.location?.lng(),
        };

        onAddressSelectRef.current(formattedAddress, details);
      });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="123 Main St, Vancouver, WA 98682"
      aria-label="Service address"
      type="text"
      className="h-12 w-full rounded-[10px] border-[1.5px] border-[#e2e7ee] px-4 font-sans text-base text-[#0D1B2A] outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-[#2563EB]/20"
    />
  );
}
