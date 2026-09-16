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
    <div className="panel p-5">
      <div className="flex items-start justify-between">
        <p className="label-tech">{label}</p>
        <span className={"flex size-9 items-center justify-center rounded-lg " + (warning ? "bg-warning/10 text-warning" : "bg-primary/10 text-primary")}>
          <Icon className="size-4" strokeWidth={2} />
        </span>
      </div>
      <p
        className={
          "mt-3 text-3xl font-bold " + (warning ? "text-warning" : "text-foreground")
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
      <div className="flex items-start gap-3 rounded-lg border border-warning/30 bg-warning/10 p-4">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-warning" strokeWidth={1.8} />
        <div>
          <p className="text-sm font-semibold text-warning">Alerta Meteorológico</p>
          <p className="mt-1 text-sm text-foreground">
            Tempestade de areia Classe 3 se aproximando do Setor 4. Avise os pacientes sobre possíveis atrasos.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <Metric label="Consultas Hoje" value="42" sub="6 a mais que no sol anterior" icon={Activity} />
        <Metric label="Óculos Anti-Areia Vendidos" value="128" sub="Unidades neste ciclo" icon={Eye} />
        <Metric label="Nível de Radiação" value="3,2 mSv" sub="Alto — transporte protegido recomendado" icon={AlertTriangle} warning />
        <Metric label="Pacientes Ativos" value="+12%" sub="1.284 cadastrados neste ciclo" icon={TrendingUp} />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="panel p-5 lg:col-span-2">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <h3 className="text-base font-semibold">Consultas vs. Vendas de Produtos</h3>
              <p className="label-tech mt-1">Últimos 7 sóis</p>
            </div>
            <StatusPill tone="primary">Atualizado agora</StatusPill>
          </div>
          <div className="h-72 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} barGap={4}>
                <CartesianGrid vertical={false} stroke="var(--color-border)" />
                <XAxis
                  dataKey="cycle"
                  tickLine={false}
                  axisLine={{ stroke: "var(--color-border)" }}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "var(--font-sans)" }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--color-muted-foreground)", fontSize: 11, fontFamily: "var(--font-sans)" }}
                />
                <Tooltip
                  cursor={{ fill: "var(--color-surface-2)" }}
                  contentStyle={{
                    background: "var(--color-surface)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="consultations" name="Consultas" fill="var(--color-chart-1)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="sales" name="Vendas de produtos" fill="var(--color-chart-2)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="panel divide-y divide-border">
          <div className="p-4">
            <h3 className="text-base font-semibold">Status da Colônia</h3>
            <p className="label-tech mt-1">Monitoramento do Setor 4</p>
          </div>
          {[
            { k: "Pressão da cúpula", v: "101,3 kPa", tone: "success" as const },
            { k: "Poeira suspensa", v: "874 µg/m³", tone: "warning" as const },
            { k: "Temperatura externa", v: "-61 °C", tone: "info" as const },
            { k: "Transporte de suprimentos", v: "Chegada em 4h 12min", tone: "neutral" as const },
            { k: "Produtos com estoque baixo", v: "3 itens", tone: "danger" as const },
          ].map((r) => (
            <div key={r.k} className="flex items-center justify-between px-4 py-3">
              <span className="text-sm text-muted-foreground">{r.k}</span>
              <StatusPill tone={r.tone}>{r.v}</StatusPill>
            </div>
          ))}
          <div className="flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground">
            <Package className="size-4" strokeWidth={1.8} /> Estoque sincronizado há 12 minutos
          </div>
        </div>
      </div>
    </div>
  );
}
