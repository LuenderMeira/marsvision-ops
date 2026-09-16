import { staff } from "./data";
import { StatusPill, staffTone } from "./StatusPill";

export function StaffView() {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">Clinical Team</h3>
          <p className="label-tech mt-1">6 practitioners // shift 07:00 — 19:00</p>
        </div>
        <StatusPill tone="success">3 available now</StatusPill>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {staff.map((s) => (
          <div key={s.name} className="panel p-4">
            <div className="flex items-start gap-3">
              <div className="flex size-12 items-center justify-center rounded-sm border border-border-strong bg-surface-2 font-mono text-sm text-foreground">
                {s.initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">{s.name}</p>
                <p className="truncate text-xs text-muted-foreground">{s.specialty}</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
                {s.license} // {s.cases} cases
              </span>
              <StatusPill tone={staffTone[s.status]}>{s.status}</StatusPill>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
