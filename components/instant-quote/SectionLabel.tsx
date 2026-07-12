export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-xs font-semibold tracking-wide text-[#2563EB]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
      {children}
    </p>
  );
}
