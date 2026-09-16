import { MapPin, User } from "lucide-react";
import { appointments } from "./data";
import { StatusPill, apptTone } from "./StatusPill";

export function ScheduleView() {
  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-sm font-semibold">Today's Agenda — Sol 07 / Cycle 2242</h3>
          <p className="label-tech mt-1">6 appointments // 2 surgery bays active</p>
        </div>
        <StatusPill tone="accent">Bay occupancy 68%</StatusPill>
      </div>

      <ol className="p-4">
        {appointments.map((a, i) => (
          <li key={a.time} className="flex gap-4">
            <div className="w-16 shrink-0 pt-3 text-right font-mono text-sm text-foreground">{a.time}</div>
            <div className="relative flex flex-col items-center">
              <span className="mt-4 size-2 shrink-0 rounded-sm bg-primary" />
              {i < appointments.length - 1 && <span className="w-px flex-1 bg-border" />}
            </div>
            <div className="mb-3 flex-1 rounded-sm border border-border bg-surface-2 p-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="text-sm font-medium text-foreground">{a.title}</p>
                <StatusPill tone={apptTone[a.status]}>{a.status}</StatusPill>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.1em] text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <User className="size-3.5" strokeWidth={1.8} /> {a.patient}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="size-3.5" strokeWidth={1.8} /> {a.room}
                </span>
                <span>{a.duration}</span>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
