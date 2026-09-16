import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const toggles = [
  { id: "storm", label: "Alertas de tempestade de areia", desc: "Enviar avisos de tempestades Classe 2 ou superior aos pacientes." },
  { id: "rad", label: "Bloqueio por limite de radiação", desc: "Suspender consultas externas acima de 3,5 mSv." },
  { id: "stock", label: "Reposição de estoque baixo", desc: "Preparar automaticamente pedidos de suprimentos." },
  { id: "synth", label: "Protocolo para pacientes sintéticos", desc: "Ativar diagnósticos oculares não orgânicos." },
];

export function SettingsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="panel">
        <div className="border-b border-border p-4">
          <h3 className="text-base font-semibold">Dados da clínica</h3>
          <p className="label-tech mt-1">Unidade MV-04 • Setor 4</p>
        </div>
        <div className="space-y-4 p-4">
          <div className="space-y-1.5">
            <Label className="label-tech">Nome da unidade</Label>
            <Input defaultValue="Centro Oftalmológico MarsVision" className="rounded-lg bg-surface" />
          </div>
          <div className="space-y-1.5">
            <Label className="label-tech">Setor da colônia</Label>
            <Input defaultValue="Nova Terra • Cúpula 2" className="rounded-lg bg-surface" />
          </div>
          <div className="space-y-1.5">
            <Label className="label-tech">Horário de atendimento (tempo solar marciano)</Label>
            <Input defaultValue="07:00 — 19:00" className="rounded-lg bg-surface" />
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="border-b border-border p-4">
          <h3 className="text-base font-semibold">Protocolos operacionais</h3>
          <p className="label-tech mt-1">Automações do sistema</p>
        </div>
        <div className="divide-y divide-border">
          {toggles.map((t, i) => (
            <div key={t.id} className="flex items-start justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <Switch defaultChecked={i !== 3} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
