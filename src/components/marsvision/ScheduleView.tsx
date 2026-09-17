import { Clock3, MapPin, User } from "lucide-react";
import { appointments } from "./data";
import { StatusPill, apptTone } from "./StatusPill";

const timeSlots = Array.from(
  { length: 11 },
  (_, index) => `${String(index + 8).padStart(2, "0")}:00`,
);

const eventTone = [
  "border-l-primary bg-primary/10",
  "border-l-info bg-info/10",
  "border-l-warning bg-warning/10",
  "border-l-success bg-success/10",
  "border-l-accent bg-accent/10",
  "border-l-destructive bg-destructive/10",
];

export function ScheduleView() {
  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-base font-semibold">Agenda de hoje — Sol 07 / Ciclo 2242</h3>
          <p className="label-tech mt-1">6 atendimentos • 2 salas cirúrgicas ativas</p>
        </div>
        <StatusPill tone="accent">Ocupação das salas: 68%</StatusPill>
      </div>

      <div className="overflow-x-auto p-4 sm:p-5">
        <div className="min-w-[680px]">
          <div className="mb-3 grid grid-cols-[72px_1fr] gap-4">
            <span className="label-tech text-right">Horário</span>
            <span className="label-tech">Atendimentos do dia</span>
          </div>
          <div className="relative grid grid-cols-[72px_1fr] gap-x-4">
            <div className="space-y-0">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className="h-20 pr-1 text-right text-xs font-semibold text-muted-foreground"
                >
                  {time}
                </div>
              ))}
            </div>
            <div className="relative">
              {timeSlots.map((time) => (
                <div key={time} className="h-20 border-t border-border last:border-b" />
              ))}
              <div className="absolute inset-0 z-10">
                {appointments.map((appointment, index) => {
                  const [hour = 8, minute = 0] = appointment.time.split(":").map(Number);
                  const top = (hour - 8) * 80 + (minute / 60) * 80;
                  const height = Math.max(
                    58,
                    (Number.parseInt(appointment.duration, 10) / 60) * 80,
                  );
                  return (
                    <article
                      key={`${appointment.time}-${appointment.patient}`}
                      className={`absolute inset-x-2 z-10 overflow-hidden rounded-lg border border-border border-l-4 p-3 shadow-sm transition-transform hover:-translate-y-0.5 hover:shadow-md ${eventTone[index % eventTone.length]}`}
                      style={{ top, height }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {appointment.patient}
                          </p>
                          <p className="truncate text-xs text-muted-foreground">
                            {appointment.title}
                          </p>
                        </div>
                        <StatusPill tone={apptTone[appointment.status]}>
                          {appointment.status}
                        </StatusPill>
                      </div>
                      <div className="mt-2 flex items-center gap-4 text-[11px] text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Clock3 className="size-3" /> {appointment.time} • {appointment.duration}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="size-3" /> {appointment.room}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="size-3" /> Paciente
                        </span>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
