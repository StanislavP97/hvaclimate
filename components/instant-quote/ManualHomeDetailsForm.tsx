const SELECT_CLASS =
  "h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";
const INPUT_CLASS =
  "h-12 w-full rounded-lg border border-input bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none";

export function ManualHomeDetailsForm() {
  return (
    <div className="mt-6 border-t border-border pt-6">
      <p className="text-xs font-bold tracking-wide text-primary-accent uppercase">
        Your home
      </p>

      <div className="mt-4">
        <label className="text-sm font-bold text-foreground">
          Conditioned square footage
        </label>
        <input
          type="number"
          placeholder="e.g. 1800"
          className={`mt-2 ${INPUT_CLASS}`}
        />
        <p className="mt-2 text-xs text-body">
          Living space only — skip unfinished basements or garages.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-bold text-foreground">
            Ceiling height
          </label>
          <select className={`mt-2 ${SELECT_CLASS}`} defaultValue="standard">
            <option value="standard">8-9 ft, standard</option>
            <option value="low">Under 8 ft</option>
            <option value="high">10+ ft, vaulted</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-foreground">
            People in the home
          </label>
          <input type="number" defaultValue={3} className={`mt-2 ${INPUT_CLASS}`} />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-sm font-bold text-foreground">
            Insulation &amp; windows
          </label>
          <select className={`mt-2 ${SELECT_CLASS}`} defaultValue="average">
            <option value="average">Average — typical for the area</option>
            <option value="poor">Poor — older, drafty</option>
            <option value="good">Good — upgraded, energy-efficient</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-bold text-foreground">
            Sun exposure
          </label>
          <select className={`mt-2 ${SELECT_CLASS}`} defaultValue="average">
            <option value="average">Average</option>
            <option value="low">Mostly shaded</option>
            <option value="high">Lots of direct sun</option>
          </select>
        </div>
      </div>

      <label className="mt-6 flex items-center gap-3 text-sm text-body">
        <input type="checkbox" className="size-4 rounded border-input" />
        Open-concept kitchen or great room adds extra load
      </label>

      <div className="mt-8 border-t border-border pt-6">
        <p className="text-xs font-bold tracking-wide text-primary-accent uppercase">
          Your system
        </p>
      </div>
    </div>
  );
}
