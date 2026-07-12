"use client";

import { useMemo, useState } from "react";
import { RadioCardGroup } from "@/components/instant-quote/RadioCardGroup";
import { ScheduleModal } from "@/components/instant-quote/ScheduleModal";
import { SectionLabel } from "@/components/instant-quote/SectionLabel";
import { EstimatedCapacityCard } from "@/components/instant-quote/EstimatedCapacityCard";
import {
  AC_OPTIONS,
  ADD_ON_PRICES,
  DEFAULT_ADD_ONS,
  FURNACE_OPTIONS,
  PROJECT_GOAL_OPTIONS,
  calculateSizing,
} from "@/components/instant-quote/calculator-data";
import type {
  AddOns,
  CeilingHeight,
  Ductwork,
  EquipmentTier,
  HomeDetails,
  InsulationLevel,
  ProjectGoal,
  SunExposure,
  SystemDetails,
} from "@/components/instant-quote/types";

const DEFAULT_HOME: HomeDetails = {
  sqft: "",
  ceilingHeight: "8-9",
  occupants: "2",
  insulation: "average",
  sunExposure: "average",
  openConcept: false,
};

const DEFAULT_SYSTEM: SystemDetails = {
  ductwork: "not-sure",
  projectGoal: "replace-ac-furnace",
  preferredBrand: "",
};

export function ComfortSizingCalculator() {
  const [home, setHome] = useState<HomeDetails>(DEFAULT_HOME);
  const [system, setSystem] = useState<SystemDetails>(DEFAULT_SYSTEM);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [furnaceTier, setFurnaceTier] = useState<EquipmentTier>("better");
  const [acTier, setAcTier] = useState<EquipmentTier>("better");
  const [addOns, setAddOns] = useState<AddOns>(DEFAULT_ADD_ONS);
  const [showModal, setShowModal] = useState(false);

  const result = useMemo(() => calculateSizing(home), [home]);
  const isHeatPump =
    system.projectGoal === "add-replace-heat-pump" || system.projectGoal === "dual-fuel";

  const selectedFurnace = FURNACE_OPTIONS.find((o) => o.tier === furnaceTier)!;
  const selectedAc = AC_OPTIONS.find((o) => o.tier === acTier)!;

  const total = useMemo(() => {
    let sum = selectedFurnace.price + selectedAc.price;
    if (addOns.extendedWarranty) sum += ADD_ON_PRICES.extendedWarranty;
    if (isHeatPump || addOns.emergencyHeatStrip) sum += ADD_ON_PRICES.emergencyHeatStrip;
    if (addOns.lineSet) sum += ADD_ON_PRICES.lineSet;
    if (addOns.aprilaire) sum += ADD_ON_PRICES.aprilaire;
    if (addOns.iwave) sum += ADD_ON_PRICES.iwave;
    if (addOns.condenserPad) sum += ADD_ON_PRICES.condenserPad;
    return sum;
  }, [selectedFurnace, selectedAc, addOns, isHeatPump]);

  const low = Math.round((total * 0.92) / 50) * 50;
  const high = Math.round((total * 1.08) / 50) * 50;

  function toggleAddOn(key: keyof AddOns) {
    setAddOns((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <section className="bg-[#f9fafb] py-16">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#172345] sm:text-3xl">
            Comfort Sizing Calculator
          </h1>
          <p className="mt-2 text-[#374151]">
            Tell us about your home and we&apos;ll estimate the heating and cooling capacity
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="rounded-[20px] border border-[#e6ebf1] bg-white p-6 sm:p-8">
              <SectionLabel>YOUR HOME</SectionLabel>

              <div className="mt-6 space-y-6">
                <div>
                  <label
                    htmlFor="sqft"
                    className="mb-2 block text-sm font-medium text-[#172345]"
                  >
                    Conditioned square footage
                  </label>
                  <input
                    id="sqft"
                    type="number"
                    min={0}
                    value={home.sqft}
                    onChange={(e) => setHome((h) => ({ ...h, sqft: e.target.value }))}
                    placeholder="e.g. 1800"
                    className="w-full max-w-xs rounded-xl border border-[#e6ebf1] px-4 py-3 text-[#172345] placeholder:text-[#9ca3af] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-[#172345]">Ceiling height</p>
                  <RadioCardGroup<CeilingHeight>
                    name="ceilingHeight"
                    value={home.ceilingHeight}
                    onChange={(v) => setHome((h) => ({ ...h, ceilingHeight: v }))}
                    options={[
                      { value: "8-9", label: "8–9 ft standard" },
                      { value: "9-10", label: "9–10 ft" },
                      { value: "10-plus", label: "10 ft+ or vaulted" },
                    ]}
                  />
                </div>

                <div>
                  <label
                    htmlFor="occupants"
                    className="mb-2 block text-sm font-medium text-[#172345]"
                  >
                    People in the home
                  </label>
                  <input
                    id="occupants"
                    type="number"
                    min={1}
                    value={home.occupants}
                    onChange={(e) => setHome((h) => ({ ...h, occupants: e.target.value }))}
                    className="w-full max-w-xs rounded-xl border border-[#e6ebf1] px-4 py-3 text-[#172345] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-[#172345]">
                    Insulation &amp; windows
                  </p>
                  <RadioCardGroup<InsulationLevel>
                    name="insulation"
                    value={home.insulation}
                    onChange={(v) => setHome((h) => ({ ...h, insulation: v }))}
                    options={[
                      { value: "good", label: "Good" },
                      { value: "average", label: "Average" },
                      { value: "poor", label: "Poor" },
                    ]}
                  />
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium text-[#172345]">Sun exposure</p>
                  <RadioCardGroup<SunExposure>
                    name="sunExposure"
                    value={home.sunExposure}
                    onChange={(v) => setHome((h) => ({ ...h, sunExposure: v }))}
                    options={[
                      { value: "shaded", label: "Mostly shaded" },
                      { value: "average", label: "Average" },
                      { value: "lots-of-glass", label: "Lots of south/west-facing glass" },
                    ]}
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-sm text-[#374151]">
                  <input
                    type="checkbox"
                    checked={home.openConcept}
                    onChange={(e) => setHome((h) => ({ ...h, openConcept: e.target.checked }))}
                    className="mt-0.5 h-4 w-4 rounded border-[#e6ebf1] text-[#2563EB] focus:ring-[#2563EB]/20"
                  />
                  Open-concept kitchen or great room adds extra load
                </label>
              </div>

              <hr className="my-8 border-[#e6ebf1]" />

              <SectionLabel>YOUR SYSTEM</SectionLabel>

              <div className="mt-6 space-y-6">
                <div>
                  <p className="mb-2 text-sm font-medium text-[#172345]">Existing ductwork</p>
                  <RadioCardGroup<Ductwork>
                    name="ductwork"
                    value={system.ductwork}
                    onChange={(v) => setSystem((s) => ({ ...s, ductwork: v }))}
                    options={[
                      { value: "yes", label: "Yes" },
                      { value: "no", label: "No" },
                      { value: "not-sure", label: "Not sure" },
                    ]}
                  />
                </div>

                <div>
                  <label
                    htmlFor="goal"
                    className="mb-2 block text-sm font-medium text-[#172345]"
                  >
                    What are you trying to do?
                  </label>
                  <select
                    id="goal"
                    value={system.projectGoal}
                    onChange={(e) =>
                      setSystem((s) => ({ ...s, projectGoal: e.target.value as ProjectGoal }))
                    }
                    className="w-full rounded-xl border border-[#e6ebf1] px-4 py-3 text-[#172345] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  >
                    {PROJECT_GOAL_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="brand"
                    className="mb-2 block text-sm font-medium text-[#172345]"
                  >
                    Preferred brand <span className="text-[#9ca3af]">(optional)</span>
                  </label>
                  <input
                    id="brand"
                    type="text"
                    value={system.preferredBrand}
                    onChange={(e) =>
                      setSystem((s) => ({ ...s, preferredBrand: e.target.value }))
                    }
                    placeholder="e.g. Carrier, Trane, Lennox"
                    className="w-full rounded-xl border border-[#e6ebf1] px-4 py-3 text-[#172345] placeholder:text-[#9ca3af] focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20"
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={() => setHasCalculated(true)}
                disabled={!home.sqft}
                className="mt-8 w-full rounded-xl bg-[#F97316] px-6 py-3 font-medium text-white transition-colors hover:bg-[#ea580c] disabled:cursor-not-allowed disabled:opacity-50"
              >
                Calculate my equipment size
              </button>
            </div>

            {hasCalculated && result && (
              <div className="mt-6 rounded-[20px] border border-[#e6ebf1] bg-white p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-[#172345]">
                  Step 1 — Select your furnace
                </h3>
                <div className="mt-4 space-y-3">
                  {FURNACE_OPTIONS.map((option) => (
                    <label
                      key={option.tier}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                        furnaceTier === option.tier
                          ? "border-[#2563EB] bg-[#2563EB]/5"
                          : "border-[#e6ebf1] hover:border-[#2563EB]/50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="furnaceTier"
                          checked={furnaceTier === option.tier}
                          onChange={() => setFurnaceTier(option.tier)}
                          className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB]/20"
                        />
                        <span>
                          <span className="block font-medium text-[#172345]">
                            {option.label}
                          </span>
                          <span className="block text-sm text-[#374151]">
                            {option.description}
                          </span>
                        </span>
                      </span>
                      <span className="font-semibold text-[#172345]">
                        ${option.price.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>

                <h3 className="mt-8 text-lg font-semibold text-[#172345]">
                  Step 2 — Select your AC tier
                </h3>
                <div className="mt-4 space-y-3">
                  {AC_OPTIONS.map((option) => (
                    <label
                      key={option.tier}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition-colors ${
                        acTier === option.tier
                          ? "border-[#2563EB] bg-[#2563EB]/5"
                          : "border-[#e6ebf1] hover:border-[#2563EB]/50"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="acTier"
                          checked={acTier === option.tier}
                          onChange={() => setAcTier(option.tier)}
                          className="h-4 w-4 text-[#2563EB] focus:ring-[#2563EB]/20"
                        />
                        <span>
                          <span className="block font-medium text-[#172345]">
                            {option.label}
                          </span>
                          <span className="block text-sm text-[#374151]">
                            {option.description}
                          </span>
                        </span>
                      </span>
                      <span className="font-semibold text-[#172345]">
                        ${option.price.toLocaleString()}
                      </span>
                    </label>
                  ))}
                </div>

                <hr className="my-8 border-[#e6ebf1]" />

                <h3 className="text-lg font-semibold text-[#172345]">Add-ons</h3>
                <div className="mt-4 space-y-3">
                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e6ebf1] p-4">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.extendedWarranty}
                        onChange={() => toggleAddOn("extendedWarranty")}
                        className="h-4 w-4 rounded border-[#e6ebf1] text-[#2563EB] focus:ring-[#2563EB]/20"
                      />
                      10-year extended labor warranty
                    </span>
                    <span className="font-medium text-[#172345]">
                      +${ADD_ON_PRICES.extendedWarranty}
                    </span>
                  </label>

                  <label
                    className={`flex items-center justify-between rounded-xl border border-[#e6ebf1] p-4 ${
                      isHeatPump ? "opacity-70" : "cursor-pointer"
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={isHeatPump || addOns.emergencyHeatStrip}
                        disabled={isHeatPump}
                        onChange={() => toggleAddOn("emergencyHeatStrip")}
                        className="h-4 w-4 rounded border-[#e6ebf1] text-[#2563EB] focus:ring-[#2563EB]/20"
                      />
                      Emergency heat strip
                      {isHeatPump && (
                        <span className="text-xs text-[#9ca3af]">(required for heat pump)</span>
                      )}
                    </span>
                    <span className="font-medium text-[#172345]">
                      +${ADD_ON_PRICES.emergencyHeatStrip}
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e6ebf1] p-4">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.lineSet}
                        onChange={() => toggleAddOn("lineSet")}
                        className="h-4 w-4 rounded border-[#e6ebf1] text-[#2563EB] focus:ring-[#2563EB]/20"
                      />
                      Line set
                    </span>
                    <span className="font-medium text-[#172345]">+${ADD_ON_PRICES.lineSet}</span>
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e6ebf1] p-4">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.aprilaire}
                        onChange={() => toggleAddOn("aprilaire")}
                        className="h-4 w-4 rounded border-[#e6ebf1] text-[#2563EB] focus:ring-[#2563EB]/20"
                      />
                      AprilAire® Media Air Cleaner
                    </span>
                    <span className="font-medium text-[#172345]">
                      +${ADD_ON_PRICES.aprilaire}
                    </span>
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e6ebf1] p-4">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.iwave}
                        onChange={() => toggleAddOn("iwave")}
                        className="h-4 w-4 rounded border-[#e6ebf1] text-[#2563EB] focus:ring-[#2563EB]/20"
                      />
                      iWave® Air Cleaner
                    </span>
                    <span className="font-medium text-[#172345]">+${ADD_ON_PRICES.iwave}</span>
                  </label>

                  <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#e6ebf1] p-4">
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={addOns.condenserPad}
                        onChange={() => toggleAddOn("condenserPad")}
                        className="h-4 w-4 rounded border-[#e6ebf1] text-[#2563EB] focus:ring-[#2563EB]/20"
                      />
                      Composite condenser pad
                    </span>
                    <span className="font-medium text-[#172345]">
                      +${ADD_ON_PRICES.condenserPad}
                    </span>
                  </label>
                </div>

                <hr className="my-8 border-[#e6ebf1]" />

                <div className="text-center">
                  <p className="text-sm text-[#374151]">Estimated installed price</p>
                  <p className="mt-1 text-3xl font-semibold text-[#172345]">
                    ${low.toLocaleString()} – ${high.toLocaleString()}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setShowModal(true)}
                  className="mt-6 w-full rounded-xl bg-[#F97316] px-6 py-3 font-medium text-white transition-colors hover:bg-[#ea580c]"
                >
                  Get my price &amp; schedule →
                </button>

                <div className="mt-4 flex flex-col items-center gap-2 text-sm">
                  <a href="tel:3608882217" className="text-[#2563EB] hover:underline">
                    Call (360) 888-2217
                  </a>
                  <button
                    type="button"
                    onClick={() => alert("Coming soon")}
                    className="text-[#374151] underline underline-offset-2 hover:text-[#2563EB]"
                  >
                    ↓ Download my estimate summary (PDF)
                  </button>
                </div>
              </div>
            )}

            <p className="mt-8 text-center text-xs text-[#9ca3af]">
              This calculator gives a rule-of-thumb estimate based on the details you provide. It
              is not a substitute for a Manual J load calculation or an in-home assessment, and
              actual equipment sizing and pricing may vary.
            </p>
          </div>

          <EstimatedCapacityCard result={hasCalculated ? result : null} />
        </div>
      </div>

      {showModal && <ScheduleModal onClose={() => setShowModal(false)} />}
    </section>
  );
}
