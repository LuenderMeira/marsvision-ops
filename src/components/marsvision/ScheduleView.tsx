import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Plus,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StatusPill } from "./StatusPill";

type Paciente = {
  id: number;
  nome: string;
  especie?: string;
  setor?: string;
  proximo_exame?: string | null;
};

type Profissional = {
  id: number;
  nome: string;
  especialidade?: string;
  sala?: string;
  ativo?: boolean;
};

type Agendamento = {
  id: number;
  paciente_id: number;
  profissional_id: number;
  data_agendamento: string;
  horario: string;
  procedimento: string;
  status?: string;
};

const toISODate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const parseISODate = (value: string) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const formatDisplayDate = (date: Date) =>
  new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

export function ScheduleView() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [profissionais, setProfissionais] = useState<Profissional[]>([]);
  const [dataAtual, setDataAtual] = useState<Date>(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    paciente_id: "",
    profissional_id: "",
    data_agendamento: toISODate(new Date()),
    horario: "09:00",
    procedimento: "",
  });

  const pacientesById = useMemo(
    () => new Map(pacientes.map((paciente) => [paciente.id, paciente.nome])),
    [pacientes],
  );

  const fetchAgendaData = async () => {
    try {
      const [pacientesResponse, profissionaisResponse, agendamentosResponse] = await Promise.all([
        fetch("http://localhost:8000/api/pacientes"),
        fetch("http://localhost:8000/api/profissionais"),
        fetch("http://localhost:8000/api/agendamentos"),
      ]);

      if (!pacientesResponse.ok || !profissionaisResponse.ok || !agendamentosResponse.ok) {
        throw new Error("Erro ao buscar dados da agenda");
      }

      const pacientesData = await pacientesResponse.json();
      const profissionaisData = await profissionaisResponse.json();
      const agendamentosData = await agendamentosResponse.json();

      setPacientes(pacientesData);
      setProfissionais(profissionaisData.filter((profissional: Profissional) => profissional.ativo !== false));
      setAgendamentos(agendamentosData);
    } catch (error) {
      console.error("Falha ao carregar agenda:", error);
    }
  };

  useEffect(() => {
    fetchAgendaData();
  }, []);

  const openCreateModal = () => {
    setFormData({
      paciente_id: pacientes[0]?.id ? String(pacientes[0].id) : "",
      profissional_id: profissionais[0]?.id ? String(profissionais[0].id) : "",
      data_agendamento: toISODate(dataAtual),
      horario: "09:00",
      procedimento: "",
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formData.paciente_id || !formData.profissional_id || !formData.data_agendamento || !formData.horario || !formData.procedimento) {
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paciente_id: Number(formData.paciente_id),
          profissional_id: Number(formData.profissional_id),
          data_agendamento: formData.data_agendamento,
          horario: formData.horario,
          procedimento: formData.procedimento,
          status: "Confirmado",
        }),
      });

      if (!response.ok) {
        throw new Error("Erro ao criar agendamento");
      }

      setIsModalOpen(false);
      await fetchAgendaData();
    } catch (error) {
      console.error("Falha ao criar agendamento:", error);
    }
  };

  const selectedDate = toISODate(dataAtual);

  const agendamentosPorProfissional = (profissionalId: number) =>
    agendamentos.filter(
      (agendamento) =>
        Number(agendamento.profissional_id) === profissionalId &&
        agendamento.data_agendamento === selectedDate,
    );

  const moveDate = (days: number) => {
    const nextDate = new Date(dataAtual);
    nextDate.setDate(nextDate.getDate() + days);
    setDataAtual(nextDate);
  };

  return (
    <div className="panel">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4">
        <div>
          <h3 className="text-base font-semibold">Agenda</h3>
          <p className="label-tech mt-1">
            {agendamentos.length} agendamentos • {profissionais.length} profissionais ativos
          </p>
        </div>

        <div className="flex items-center gap-2">
          <StatusPill tone="accent">Recepção ativa</StatusPill>
          <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
              <Button type="button" onClick={openCreateModal}>
                <Plus className="size-4" strokeWidth={2} /> Novo agendamento
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[520px]">
              <DialogHeader>
                <DialogTitle>Novo agendamento</DialogTitle>
                <DialogDescription>
                  Cadastre um atendimento para paciente, profissional e horário específicos.
                </DialogDescription>
              </DialogHeader>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="paciente">Paciente</Label>
                    <Select
                      value={formData.paciente_id}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, paciente_id: value }))
                      }
                    >
                      <SelectTrigger id="paciente" className="w-full">
                        <SelectValue placeholder="Selecione o paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {pacientes.map((paciente) => (
                          <SelectItem key={paciente.id} value={String(paciente.id)}>
                            {paciente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="profissional">Profissional / Sala</Label>
                    <Select
                      value={formData.profissional_id}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, profissional_id: value }))
                      }
                    >
                      <SelectTrigger id="profissional" className="w-full">
                        <SelectValue placeholder="Selecione o profissional" />
                      </SelectTrigger>
                      <SelectContent>
                        {profissionais.map((profissional) => (
                          <SelectItem key={profissional.id} value={String(profissional.id)}>
                            {profissional.nome} - {profissional.sala || "Sala não definida"}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="data-agendamento">Data</Label>
                    <Input
                      id="data-agendamento"
                      type="date"
                      value={formData.data_agendamento}
                      onChange={(event) =>
                        setFormData((prev) => ({
                          ...prev,
                          data_agendamento: event.target.value,
                        }))
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="horario">Horário</Label>
                    <Input
                      id="horario"
                      type="time"
                      value={formData.horario}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, horario: event.target.value }))
                      }
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="procedimento">Procedimento</Label>
                    <Input
                      id="procedimento"
                      value={formData.procedimento}
                      onChange={(event) =>
                        setFormData((prev) => ({ ...prev, procedimento: event.target.value }))
                      }
                      placeholder="Ex: Consulta de rotina"
                    />
                  </div>
                </div>

                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit">Salvar agendamento</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="border-b border-border p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => moveDate(-1)}
              aria-label="Dia anterior"
            >
              <ChevronLeft className="size-4" />
            </Button>

            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2">
              <CalendarDays className="size-4 text-muted-foreground" />
              <span className="text-sm font-medium">{formatDisplayDate(dataAtual)}</span>
            </div>

            <Button type="button" variant="outline" onClick={() => setDataAtual(new Date())}>
              Hoje
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              onClick={() => moveDate(1)}
              aria-label="Próximo dia"
            >
              <ChevronRight className="size-4" />
            </Button>
          </div>

          <Input
            type="date"
            value={selectedDate}
            onChange={(event) => setDataAtual(parseISODate(event.target.value))}
            className="w-auto min-w-[170px]"
          />
        </div>
      </div>

      <div className="overflow-x-auto p-4 sm:p-5">
        <div className="grid min-w-[760px] gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {profissionais.map((profissional) => {
            const agendamentosDoProfissional = agendamentosPorProfissional(profissional.id);

            return (
              <div key={profissional.id} className="rounded-xl border border-border bg-card/60">
                <div className="border-b border-border p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-foreground">{profissional.nome}</p>
                      <p className="text-xs text-muted-foreground">
                        {profissional.especialidade || "Especialidade não informada"} • {profissional.sala || "Sala não definida"}
                      </p>
                    </div>
                    <StatusPill tone="success">Disponível</StatusPill>
                  </div>
                </div>

                <div className="space-y-3 p-3">
                  {agendamentosDoProfissional.length === 0 ? (
                    <div className="rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center text-xs text-muted-foreground">
                      Nenhum agendamento para esta data.
                    </div>
                  ) : (
                    agendamentosDoProfissional.map((agendamento) => (
                      <article
                        key={agendamento.id}
                        className="rounded-lg border border-border bg-background p-3 shadow-sm"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-foreground">
                              {agendamento.procedimento}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {pacientesById.get(agendamento.paciente_id) || "Paciente não encontrado"}
                            </p>
                          </div>
                          <StatusPill tone="info">{agendamento.status || "Confirmado"}</StatusPill>
                        </div>

                        <div className="mt-3 space-y-2 text-[11px] text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock3 className="size-3.5" />
                            <span>{agendamento.horario}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="size-3.5" />
                            <span>{profissional.sala || "Sala não definida"}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <User className="size-3.5" />
                            <span>Paciente</span>
                          </div>
                        </div>
                      </article>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
