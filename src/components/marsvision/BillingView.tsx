import { Bot, Check, CreditCard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "./StatusPill";

export function BillingView() {
  return (
    <div className="grid gap-5 xl:grid-cols-2">
      <section className="panel overflow-hidden">
        <div className="border-b border-border p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <CreditCard className="size-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="label-tech">Plano Atual</p>
                <h2 className="mt-1 text-xl font-bold text-foreground">MarsVision Clínica</h2>
              </div>
            </div>
            <StatusPill tone="success">Ativo</StatusPill>
          </div>
        </div>
        <div className="space-y-5 p-5 sm:p-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-border bg-surface-2 p-4">
              <p className="text-xs font-semibold text-muted-foreground">Taxa de Setup</p>
              <p className="mt-2 flex items-center gap-2 text-base font-semibold text-foreground">
                <Check className="size-4 text-success" /> Concluído
              </p>
            </div>
            <div className="rounded-lg border border-border bg-surface-2 p-4">
              <p className="text-xs font-semibold text-muted-foreground">Mensalidade</p>
              <p className="mt-2 text-base font-semibold text-foreground">450 GC/mês</p>
            </div>
          </div>
          <div className="border-t border-border pt-5">
            <p className="text-sm font-medium text-foreground">Próxima cobrança</p>
            <p className="mt-1 text-sm text-muted-foreground">16 de outubro de 2026 • Final 4421</p>
          </div>
          <Button variant="outline" className="w-full sm:w-auto">Gerenciar pagamento</Button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-primary/30 bg-primary/5 shadow-sm">
        <div className="p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <span className="flex size-11 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Sparkles className="size-5" strokeWidth={1.8} />
            </span>
            <StatusPill tone="primary">Upgrade Disponível</StatusPill>
          </div>
          <p className="label-tech mt-6 text-primary">Próximo nível</p>
          <h2 className="mt-1 text-xl font-bold text-foreground">MarsVision AI Automations</h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Automatize a operação da clínica com inteligência aplicada ao atendimento e à conversão.
          </p>
          <ul className="mt-5 space-y-3 text-sm text-foreground">
            <li className="flex items-center gap-3"><Bot className="size-4 text-primary" /> Agente de IA para agendamentos automáticos</li>
            <li className="flex items-center gap-3"><Check className="size-4 text-primary" /> Gestão e acompanhamento de potenciais clientes</li>
            <li className="flex items-center gap-3"><Check className="size-4 text-primary" /> Lembretes inteligentes para reduzir faltas</li>
          </ul>
          <Button className="mt-6 w-full sm:w-auto">Conhecer o upgrade</Button>
        </div>
      </section>
    </div>
  );
}