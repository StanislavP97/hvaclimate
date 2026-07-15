"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Home,
  Flame,
  Zap,
  HelpCircle,
  MapPin,
  Star,
  ShieldCheck,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { SystemTierCard } from "@/components/instant-quote/SystemTierCard";
import { AddOnCheckbox } from "@/components/instant-quote/AddOnCheckbox";
import {
  ADDON_META,
  DEFAULT_ADDONS,
  SIZE_LABEL,
  SYSTEM_LABEL,
  TIER_META,
} from "@/components/instant-quote/quiz-data";
import type {
  Addons,
  CurrentSystem,
  HomeSize,
  SystemTier,
} from "@/components/instant-quote/types";

interface LivingProposalProps {
  homeSize: HomeSize | null;
  currentSystem: CurrentSystem | null;
  onSchedule: () => void;
  onCall: () => void;
}

const SYSTEM_ICON: Record<CurrentSystem, LucideIcon> = {
  gas: Flame,
  electric: Zap,
  unsure: HelpCircle,
};

const SYSTEM_SUMMARY: Record<CurrentSystem, string> = {
  gas: "Gas furnace replacement",
  electric: "Electric furnace / heat pump replacement",
  unsure: "System replacement (type TBD)",
};

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

export function LivingProposal({
  homeSize,
  currentSystem,
  onSchedule,
  onCall,
}: LivingProposalProps) {
  const [selectedTier, setSelectedTier] = useState<SystemTier>("gold");
  const [addons, setAddons] = useState<Addons>(DEFAULT_ADDONS);

  const tier = TIER_META[selectedTier];
  const countLow = useCountUp(tier.priceLow);
  const countHigh = useCountUp(tier.priceHigh);

  const tiersList = useMemo(() => Object.values(TIER_META), []);

  function toggleAddon(id: keyof Addons) {
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  const resolvedSize = homeSize ?? "medium";
  const resolvedSystem = currentSystem ?? "gas";
  const SystemIcon = SYSTEM_ICON[resolvedSystem];

  const resultSubtitle = `Based on your ${SIZE_LABEL[resolvedSize]} home with ${SYSTEM_LABEL[resolvedSystem]} · Vancouver, WA`;

  return (
    <div className="relative bg-white">
      {/* RESULT HEADER */}
      <div className="bg-[#f1f5f9] px-12 py-10 text-center max-sm:px-[18px] max-sm:py-6">
        <div className="mx-auto max-w-2xl">
          <span className="mb-4 inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-4 py-1.5 font-[Plus_Jakarta_Sans,sans-serif] text-[13px] font-bold text-[#15803d] max-sm:mb-2.5 max-sm:px-3 max-sm:text-[11.5px]">
            ✓ Estimate Ready — Valid for 10 days
          </span>
          <h2 className="mb-2 font-[Plus_Jakarta_Sans,sans-serif] text-[36px] font-extrabold text-[#0D1B2A] max-sm:text-xl">
            Your Personalized HVAC Estimate
          </h2>
          <p className="text-[15px] text-[#64748b] max-sm:text-[12.5px]">{resultSubtitle}</p>
        </div>
      </div>

      {/* INVESTMENT RANGE */}
      <div className="bg-white px-12 pt-11 max-sm:px-[18px] max-sm:pt-5">
        <div className="mx-auto grid w-full max-w-[900px] grid-cols-[1.2fr_1fr] overflow-hidden rounded-[20px] border border-[#eaeef3] bg-white shadow-[0_10px_30px_rgba(13,27,42,.06)] max-sm:grid-cols-1">
          <div className="p-9 text-center max-sm:p-[22px]">
            <div className="mb-3 text-xs font-bold uppercase tracking-[.1em] text-[#94a3b8] max-sm:mb-2">
              Typical Investment For A Home Like Yours
            </div>
            <div className="font-[Plus_Jakarta_Sans,sans-serif] text-[64px] font-extrabold leading-none text-[#0D1B2A] max-sm:text-[36px]">
              ${countLow.toLocaleString()} – ${countHigh.toLocaleString()}
            </div>
            <p className="mx-2 my-3 text-[14.5px] text-[#64748b] max-sm:hidden">
              Includes equipment + installation + permits + 10-year warranty
            </p>
            <p className="text-sm font-semibold text-[#2563EB] max-sm:mt-2 max-sm:text-xs">
              or as low as ${tier.monthly}/mo for 60 months
            </p>
          </div>

          <div className="border-l border-[#eaeef3] bg-[#f8fafc] p-6 text-left max-sm:border-l-0 max-sm:border-t">
            <p className="mb-4 text-[13px] font-medium text-[#64748b]">Your selection summary:</p>
            <ul className="space-y-3 text-sm text-[#334155]">
              <li className="flex items-center gap-2.5">
                <Home size={16} className="flex-none text-[#2563EB]" />
                {SIZE_LABEL[resolvedSize]} home
              </li>
              <li className="flex items-center gap-2.5">
                <SystemIcon size={16} className="flex-none text-[#2563EB]" />
                {SYSTEM_SUMMARY[resolvedSystem]}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={16} className="flex-none text-[#2563EB]" />
                Vancouver, WA area
              </li>
            </ul>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#dcfce7] px-3 py-1 font-[Plus_Jakarta_Sans,sans-serif] text-[11.5px] font-bold text-[#15803d]">
              ✓ Estimate ready · Valid 10 days
            </span>
          </div>
        </div>
      </div>

      {/* TIER SELECT */}
      <div className="bg-[#f8fafc] px-12 py-12 max-sm:px-[18px] max-sm:py-8">
        {/* DIVIDER */}
        <div className="mx-auto mb-14 flex max-w-[900px] items-center gap-4 max-sm:mb-8">
          <div className="h-px flex-1 bg-[#eaeef3]" />
          <span className="whitespace-nowrap text-[13px] text-[#94a3b8]">— Choose your package —</span>
          <div className="h-px flex-1 bg-[#eaeef3]" />
        </div>

        <div className="mx-auto max-w-[900px]">
          <div className="mb-9 border-l-[3px] border-[#2563EB] pl-4 text-left max-sm:mb-[18px]">
            <h3 className="mb-2 font-[Plus_Jakarta_Sans,sans-serif] text-[28px] font-extrabold text-[#0D1B2A] max-sm:text-[17px]">
              Select Your System Package
            </h3>
            <p className="text-[15px] text-[#64748b] max-sm:text-[12.5px]">
              All packages include equipment, installation, permits, and warranty
            </p>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1200px] grid-cols-3 gap-5 px-6 max-sm:flex max-sm:gap-3.5 max-sm:overflow-x-auto max-sm:px-0 max-sm:pb-1.5">
          {tiersList.map((t, index) => (
            <div key={t.tier} className="max-sm:min-w-[220px] max-sm:flex-none">
              <SystemTierCard
                tier={t}
                isActive={selectedTier === t.tier}
                onSelect={() => setSelectedTier(t.tier)}
                index={index}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ADD-ONS */}
      <div className="bg-white px-12 py-14 max-sm:px-[18px] max-sm:py-7">
        <div className="mx-auto max-w-[640px]">
          <div className="mb-8 border-l-[3px] border-[#2563EB] pl-4 text-left max-sm:mb-3.5">
            <h3 className="mb-2 font-[Plus_Jakarta_Sans,sans-serif] text-[26px] font-extrabold text-[#0D1B2A] max-sm:text-[17px]">
              Customize Your System
            </h3>
            <p className="text-[15px] text-[#64748b] max-sm:hidden">
              Optional upgrades — add what matters to you
            </p>
          </div>
          <div>
            {ADDON_META.map((addon) => (
              <AddOnCheckbox
                key={addon.id}
                addon={addon}
                checked={addons[addon.id]}
                onToggle={() => toggleAddon(addon.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#0D1B2A] px-12 py-[72px] text-center max-sm:px-[18px] max-sm:py-8">
        <h2 className="mb-3 font-[Plus_Jakarta_Sans,sans-serif] text-[34px] font-extrabold text-white max-sm:text-xl">
          Ready to Move Forward?
        </h2>
        <p className="mb-[30px] text-base text-[#aebccc] max-sm:mb-[18px] max-sm:text-[13px]">
          Our technician will confirm exact pricing on-site — no obligation, no pressure.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            type="button"
            onClick={onSchedule}
            className="rounded-[11px] bg-[#F97316] px-8 py-3.5 text-base font-[Plus_Jakarta_Sans,sans-serif] font-bold text-white shadow-[0_10px_26px_rgba(249,115,22,.35)] transition-colors hover:bg-[#ea6a0c] max-sm:w-full"
          >
            Schedule My Free In-Home Visit
          </button>
          <button
            type="button"
            onClick={onCall}
            className="rounded-[11px] border-[1.5px] border-white/30 px-8 py-3.5 text-base font-[Plus_Jakarta_Sans,sans-serif] font-semibold text-white transition-colors hover:bg-white/10 max-sm:w-full"
          >
            Call (360) 888-2217
          </button>
        </div>
        <p className="mt-5 text-[12.5px] text-[#7788a0]">
          Average response time: 2 hours · Same-day service available
        </p>
      </div>

      {/* TRUST BAND */}
      <div className="bg-[#f8fafc] px-12 py-9 max-sm:px-[18px] max-sm:py-5">
        <div className="mx-auto grid max-w-[800px] grid-cols-4 gap-4 text-center max-sm:grid-cols-2">
          <div className="flex items-center justify-center gap-2 text-sm text-[#475569]">
            <Star size={16} className="flex-none fill-[#F59E0B] text-[#F59E0B]" />
            4.9 Google Rating
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-[#475569]">
            <ShieldCheck size={16} className="flex-none text-[#2563EB]" />
            Licensed &amp; Insured WA &amp; OR
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-[#475569]">
            <MapPin size={16} className="flex-none text-[#2563EB]" />
            Vancouver WA &amp; Portland OR
          </div>
          <div className="flex items-center justify-center gap-2 text-sm text-[#475569]">
            <CheckCircle2 size={16} className="flex-none text-[#16a34a]" />
            Estimates within 10% accuracy
          </div>
        </div>
      </div>

      {/* DISCLAIMER */}
      <div className="bg-white px-12 py-5 text-center max-sm:px-[18px]">
        <p className="mx-auto max-w-[640px] text-xs leading-relaxed text-[#94a3b8]">
          These are estimated price ranges for typical installations in the Vancouver WA /
          Portland OR area. Actual pricing may vary based on your home&apos;s specific
          conditions, ductwork, and local code requirements. A free in-home visit is required
          to confirm exact pricing.
        </p>
      </div>
    </div>
  );
}
