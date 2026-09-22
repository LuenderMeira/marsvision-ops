import { useEffect, useState } from "react";
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
  const [stats, setStats] = useState({
    pacientes: 0,
    agendamentos: 0,
    produtos: 0,
    alertas_estoque: 0,
  });

  useEffect(() => {
    const carregarDashboard = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/dashboard");

        if (!response.ok) {
          throw new Error("Não foi possível carregar o dashboard.");
        }

        const dados = await response.json();

        setStats({
          pacientes: Number(dados.pacientes ?? 0),
          agendamentos: Number(dados.agendamentos ?? 0),
          produtos: Number(dados.produtos ?? 0),
          alertas_estoque: Number(dados.alertas_estoque ?? 0),
        });
      } catch (error) {
        console.error("Erro ao carregar os dados do dashboard:", error);
      }
    };

    carregarDashboard();
  }, []);

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
        <Metric label="Agendamentos" value={String(stats.agendamentos)} sub="Registros no sistema atual" icon={Activity} />
        <Metric label="Produtos Cadastrados" value={String(stats.produtos)} sub="Itens no inventário" icon={Eye} />
        <Metric label="Alertas de Estoque" value={String(stats.alertas_estoque)} sub="Itens abaixo de 5 unidades" icon={AlertTriangle} warning />
        <Metric label="Pacientes Cadastrados" value={String(stats.pacientes)} sub="Total ativo no banco" icon={TrendingUp} />
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
