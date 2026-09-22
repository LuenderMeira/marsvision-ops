import { useEffect, useState } from "react";
import { BrainCircuit, Eye, EyeOff, HelpCircle, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";

export function AIConfigView() {
  const [ativa, setAtiva] = useState(true);
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [nomeAssistente, setNomeAssistente] = useState("Luna");
  const [tomVoz, setTomVoz] = useState("Acolhedor");
  const [scopes, setScopes] = useState({
    faqs: true,
    agenda: true,
    preCadastro: true,
  });

  useEffect(() => {
    const carregarConfiguracao = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/config-ia");

        if (!response.ok) {
          throw new Error("Não foi possível carregar a configuração da IA.");
        }

        const dados = await response.json();

        setAtiva(Boolean(dados.ativa));
        setApiKey(dados.api_key ?? "");
        setNomeAssistente(dados.nome_assistente ?? "Luna");
        setTomVoz(dados.tom_voz ?? "Acolhedor");
      } catch (error) {
        console.error("Erro ao carregar a configuração da IA:", error);
      }
    };

    carregarConfiguracao();
  }, []);

  const toggleScope = (key: keyof typeof scopes) => {
    setScopes((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSalvarAlteracoes = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/config-ia", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ativa,
          api_key: apiKey,
          nome_assistente: nomeAssistente,
          tom_voz: tomVoz,
        }),
      });

      if (!response.ok) {
        const erro = await response.json().catch(() => ({}));
        throw new Error(erro.detail || "Não foi possível salvar a configuração da IA.");
      }

      alert("Configuração da IA salva com sucesso!");
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao salvar a configuração da IA.");
    }
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6 p-4 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="label-tech">Configurações</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">Central da IA</h1>
        </div>
        <div className="hidden items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary sm:flex">
          <Sparkles className="size-4" strokeWidth={1.8} />
          Assistente ativo
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border bg-gradient-to-br from-[#fff4ef] to-[#fffaf7] p-5 dark:from-[#2a1d1a] dark:via-[#211b1a] dark:to-[#171412]">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <BrainCircuit className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <CardTitle className="text-lg">Estado do Agente</CardTitle>
                  <CardDescription className="mt-1">Controle geral do assistente</CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-5">
            <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-surface/60 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Ativar assistente</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {ativa ? "O agente está disponível para atendimento." : "O agente está temporariamente inativo."}
                </p>
              </div>
              <Switch checked={ativa} onCheckedChange={setAtiva} aria-label="Ativar assistente" />
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-border bg-card shadow-sm">
          <CardHeader className="border-b border-border bg-gradient-to-br from-[#fff4ef] to-[#fffaf7] p-5 dark:from-[#2a1d1a] dark:via-[#211b1a] dark:to-[#171412]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <ShieldCheck className="size-5" strokeWidth={1.8} />
                </span>
                <div>
                  <CardTitle className="text-lg">Provedora de IA (Groq)</CardTitle>
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-primary">
                Crítica
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 p-5">
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 text-sm leading-6 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-100">
              O MarsVision OS utiliza exclusivamente a infraestrutura da Groq. Insira sua chave de API abaixo.
            </div>

            <div className="space-y-2">
              <Label htmlFor="api-key" className="text-sm font-medium text-foreground">
                API Key
              </Label>
              <div className="relative">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(event) => setApiKey(event.target.value)}
                  placeholder="gsk_••••••••••••••••••••••••"
                  className="pr-10 rounded-lg border-border bg-surface text-foreground"
                  aria-label="API Key da Groq"
                />
                <button
                  type="button"
                  onClick={() => setShowApiKey((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={showApiKey ? "Ocultar API Key" : "Mostrar API Key"}
                >
                  {showApiKey ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <button type="button" className="inline-flex items-center gap-1.5 text-primary transition-opacity hover:opacity-80">
                <HelpCircle className="size-4" strokeWidth={1.8} />
                Como obter minha chave no Groq?
              </button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Sparkles className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <CardTitle className="text-lg">Personalidade do Assistente</CardTitle>
              <CardDescription>Defina a identidade e a comunicação do agente</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-5 p-5">
          <div className="space-y-2">
            <Label htmlFor="assistant-name" className="text-sm font-medium text-foreground">
              Nome do Assistente
            </Label>
            <Input
              id="assistant-name"
              value={nomeAssistente}
              onChange={(event) => setNomeAssistente(event.target.value)}
              placeholder="Ex: Luna"
              className="rounded-lg border-border bg-surface text-foreground"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-foreground">Tom de Voz</Label>
            <Select value={tomVoz} onValueChange={setTomVoz}>
              <SelectTrigger className="w-full rounded-lg border-border bg-surface text-foreground">
                <SelectValue placeholder="Selecione o tom" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Formal">Formal</SelectItem>
                <SelectItem value="Acolhedor">Acolhedor</SelectItem>
                <SelectItem value="Direto">Direto</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader className="border-b border-border p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ShieldCheck className="size-5" strokeWidth={1.8} />
            </span>
            <div>
              <CardTitle className="text-lg">Escopo de Atuação</CardTitle>
              <CardDescription>Selecione quais tarefas o assistente pode executar</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 p-5">
          <div className="space-y-4 rounded-xl border border-border bg-surface/60 p-4">
            <label className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">FAQs</span>
              <Checkbox checked={scopes.faqs} onCheckedChange={() => toggleScope("faqs")} />
            </label>

            <label className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">Agenda</span>
              <Checkbox checked={scopes.agenda} onCheckedChange={() => toggleScope("agenda")} />
            </label>

            <label className="flex items-center justify-between gap-3">
              <span className="text-sm font-medium text-foreground">Pré-cadastro de Pacientes</span>
              <Checkbox checked={scopes.preCadastro} onCheckedChange={() => toggleScope("preCadastro")} />
            </label>
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleSalvarAlteracoes}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Salvar alterações
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
