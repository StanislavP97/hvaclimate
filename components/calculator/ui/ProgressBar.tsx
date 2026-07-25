interface ProgressBarProps {
  percent: number;
}

export function ProgressBar({ percent }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 flex-1 rounded-full bg-gray-100">
        <div
          className="h-1.5 rounded-full bg-[#2563EB] transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
      <span className="shrink-0 text-xs font-semibold text-[#64748b]">{percent}%</span>
    </div>
  );
}
