import { PROGRESS_LABELS } from "@/components/instant-quote/quiz-data";

interface ProgressBarProps {
  step: number;
}

export function MobileProgressDots({ step }: ProgressBarProps) {
  return (
    <div className="mb-5 hidden items-center justify-center gap-1.5 max-sm:flex">
      {PROGRESS_LABELS.map((label, i) => {
        const active = i === step;
        const filled = i <= step;
        return (
          <div
            key={label}
            className={`h-2 rounded-full transition-all ${active ? "w-[22px]" : "w-2"} ${
              filled ? "bg-[#2563EB]" : "bg-[#e2e8f0]"
            }`}
          />
        );
      })}
    </div>
  );
}

export function ProgressBar({ step }: ProgressBarProps) {
  return (
    <div className="mb-8 flex items-center justify-center max-sm:hidden">
      {PROGRESS_LABELS.map((label, i) => {
        const done = i < step;
        const active = i === step;
        const filled = done || active;
        return (
          <div key={label} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div className={active ? "rounded-full animate-pulse-ring" : ""}>
                <div
                  className={`flex items-center justify-center rounded-full font-[Plus_Jakarta_Sans,sans-serif] text-[13px] font-bold transition-all ${
                    active ? "h-9 w-9" : "h-[30px] w-[30px]"
                  } ${filled ? "bg-[#2563EB] text-white" : "bg-[#e2e8f0] text-[#94a3b8]"}`}
                >
                  {done ? "✓" : i + 1}
                </div>
              </div>
              <div
                className={`whitespace-nowrap font-[Plus_Jakarta_Sans,sans-serif] text-[11px] ${
                  active ? "font-bold text-[#2563EB]" : "font-medium text-[#94a3b8]"
                }`}
              >
                {label}
              </div>
            </div>
            {i < PROGRESS_LABELS.length - 1 && (
              <div
                className={`mx-1 mb-[22px] h-0.5 w-[46px] ${
                  i < step ? "bg-[#2563EB]" : "bg-[#e2e8f0]"
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
