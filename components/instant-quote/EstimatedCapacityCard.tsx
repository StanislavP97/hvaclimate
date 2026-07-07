export function EstimatedCapacityCard() {
  return (
    <div className="rounded-2xl bg-navy p-6">
      <p className="text-xs font-bold tracking-wide text-footer-foreground uppercase">
        Estimated capacity
      </p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-xs font-semibold tracking-wide text-footer-foreground uppercase">
            Cooling
          </p>
          <p className="mt-3 text-2xl font-bold text-white">—</p>
          <p className="text-xs text-footer-foreground">tons</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/10" />
        </div>
        <div className="rounded-xl bg-white/5 p-4">
          <p className="text-xs font-semibold tracking-wide text-footer-foreground uppercase">
            Heating
          </p>
          <p className="mt-3 text-2xl font-bold text-white">—</p>
          <p className="text-xs text-footer-foreground">BTU/h output</p>
          <div className="mt-3 h-1.5 rounded-full bg-white/10" />
        </div>
      </div>

      <p className="mt-5 text-sm text-footer-foreground">
        Fill in the form and your recommended equipment size and type will
        show up here.
      </p>
    </div>
  );
}
