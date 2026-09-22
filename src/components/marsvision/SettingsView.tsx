import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

const toggles = [
  { id: "storm", label: "Alertas de tempestade de areia", desc: "Enviar avisos de tempestades Classe 2 ou superior aos pacientes." },
  { id: "rad", label: "Bloqueio por limite de radiação", desc: "Suspender consultas externas acima de 3,5 mSv." },
  { id: "stock", label: "Reposição de estoque baixo", desc: "Preparar automaticamente pedidos de suprimentos." },
  { id: "synth", label: "Protocolo para pacientes sintéticos", desc: "Ativar diagnósticos oculares não orgânicos." },
] as const;

export function SettingsView() {
  const [nomeUnidade, setNomeUnidade] = useState("");
  const [setorColonia, setSetorColonia] = useState("");
  const [horarioAtendimento, setHorarioAtendimento] = useState("");
  const [alertaTempestade, setAlertaTempestade] = useState(true);
  const [bloqueioRadiacao, setBloqueioRadiacao] = useState(true);
  const [reposicaoEstoque, setReposicaoEstoque] = useState(true);
  const [pacientesSinteticos, setPacientesSinteticos] = useState(false);

  useEffect(() => {
    const carregarConfiguracao = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/config-clinica");

        if (!response.ok) {
          throw new Error("Não foi possível carregar a configuração da clínica.");
        }

        const dados = await response.json();

        setNomeUnidade(dados.nome_unidade ?? "");
        setSetorColonia(dados.setor_colonia ?? "");
        setHorarioAtendimento(dados.horario_atendimento ?? "");
        setAlertaTempestade(Boolean(dados.alerta_tempestade));
        setBloqueioRadiacao(Boolean(dados.bloqueio_radiacao));
        setReposicaoEstoque(Boolean(dados.reposicao_estoque));
        setPacientesSinteticos(Boolean(dados.pacientes_sinteticos));
      } catch (error) {
        console.error("Erro ao carregar a configuração da clínica:", error);
      }
    };

    carregarConfiguracao();
  }, []);

  const handleSalvarConfiguracoes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/config-clinica", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_unidade: nomeUnidade,
          setor_colonia: setorColonia,
          horario_atendimento: horarioAtendimento,
          alerta_tempestade: alertaTempestade,
          bloqueio_radiacao: bloqueioRadiacao,
          reposicao_estoque: reposicaoEstoque,
          pacientes_sinteticos: pacientesSinteticos,
        }),
      });

      if (!response.ok) {
        const erro = await response.json().catch(() => ({}));
        throw new Error(erro.detail || "Não foi possível salvar a configuração da clínica.");
      }

      alert("Configurações da clínica salvas com sucesso!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao salvar as configurações da clínica.");
    }
  };

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
            <Input
              value={nomeUnidade}
              onChange={(event) => setNomeUnidade(event.target.value)}
              className="rounded-lg bg-surface"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="label-tech">Setor da colônia</Label>
            <Input
              value={setorColonia}
              onChange={(event) => setSetorColonia(event.target.value)}
              className="rounded-lg bg-surface"
            />
          </div>
          <div className="space-y-1.5">
            <Label className="label-tech">Horário de atendimento (tempo solar marciano)</Label>
            <Input
              value={horarioAtendimento}
              onChange={(event) => setHorarioAtendimento(event.target.value)}
              className="rounded-lg bg-surface"
            />
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="border-b border-border p-4">
          <h3 className="text-base font-semibold">Protocolos operacionais</h3>
          <p className="label-tech mt-1">Automações do sistema</p>
        </div>
        <div className="divide-y divide-border">
          {toggles.map((t) => {
            const stateMap = {
              storm: [alertaTempestade, setAlertaTempestade],
              rad: [bloqueioRadiacao, setBloqueioRadiacao],
              stock: [reposicaoEstoque, setReposicaoEstoque],
              synth: [pacientesSinteticos, setPacientesSinteticos],
            } as const;

            const [value, setter] = stateMap[t.id];

            return (
              <div key={t.id} className="flex items-start justify-between gap-4 p-4">
                <div>
                  <p className="text-sm font-medium text-foreground">{t.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
                </div>
                <Switch checked={value} onCheckedChange={setter} />
              </div>
            );
          })}
        </div>

        <div className="flex justify-end p-4">
          <Button type="button" onClick={handleSalvarConfiguracoes} className="bg-primary text-primary-foreground hover:bg-primary/90">
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  );
}
