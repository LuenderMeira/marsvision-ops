import { AlertTriangle, Activity, Eye, Package, TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { chartData } from "./data";
import { StatusPill } from "./StatusPill";

function Metric({
  label,
  value,
  sub,
  icon: Icon,
  warning,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ElementType;
  warning?: boolean;
}) {
  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between">
        <p className="label-tech">{label}</p>
        <Icon className={warning ? "size-4 text-warning" : "size-4 text-primary"} strokeWidth={1.8} />
      </div>
      <p
        className={
          "mt-3 font-mono text-3xl font-semibold tracking-tight " + (warning ? "text-warning" : "text-foreground")
        }
      >
        {value}
      </p>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

export function DashboardView() {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-3 rounded-sm border border-warning/60 bg-warning/10 p-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" strokeWidth={1.8} />
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-warning">Weather Alert</p>
          <p className="mt-1 text-sm text-foreground">
            Class 3 Sandstorm approaching Sector 4. Advise patients of potential travel delays.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Today's Consultations" value="42" sub="+6 vs. previous sol" icon={Activity} />
        <Metric label="Sandstorm Goggles Sold" value="128" sub="Units this cycle" icon={Eye} />
        <Metric label="Surface Radiation" value="3.2 mSv" sub="HIGH — shielded transit advised" icon={AlertTriangle} warning />
        <Metric label="Active Patients" value="+12%" sub="1,284 registered this cycle" icon={TrendingUp} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel p-4 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-sm font-semibold">Consultations vs. Product Sales</h3>
              <p className="label-tech mt-1">Last 7 sols</p>
            </div>
            <StatusPill tone="primary">Live feed</StatusPill>
          </div>
          <div className="h-72 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="cycle"
                  tickLine={false}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "var(--font-mono)" }}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-surface-2)" }}
                  contentStyle={{
                    background: "var(--color-surface-2)",
                    border: "1px solid var(--color-border-strong)",
                    borderRadius: 2,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }} />
                <Bar dataKey="consultations" name="Consultations" fill="var(--color-chart-1)" />
                <Bar dataKey="sales" name="Product Sales" fill="var(--color-chart-2)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel divide-y divide-border">
          <div className="p-4">
            <h3 className="text-sm font-semibold">Colony Status</h3>
            <p className="label-tech mt-1">Sector 4 telemetry</p>
          </div>
          {[
            { k: "Dome pressure", v: "101.3 kPa", tone: "success" as const },
            { k: "Airborne dust", v: "874 µg/m³", tone: "warning" as const },
            { k: "Surface temp", v: "-61 °C", tone: "info" as const },
            { k: "Supply shuttle", v: "ETA 4h 12m", tone: "neutral" as const },
            { k: "Low-stock SKUs", v: "3 items", tone: "danger" as const },
          ].map((r) => (
            <div key={r.k} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">{r.k}</span>
              <StatusPill tone={r.tone}>{r.v}</StatusPill>
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
            <Package className="size-4" strokeWidth={1.8} /> Inventory sync completed 00:12 ago
          </div>
        </div>
      </div>
    </div>
  );
}
