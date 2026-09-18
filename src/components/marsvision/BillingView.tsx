import { CalendarClock, CreditCard, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatusPill } from "./StatusPill";

export function BillingView() {
  return (
    <div className="mx-auto max-w-3xl">
      <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
        <div className="border-b border-border bg-gradient-to-br from-[#fff1ea] to-[#fffaf6] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <ShieldCheck className="size-5" strokeWidth={1.8} />
              </span>
              <div>
                <p className="label-tech">Plano atual</p>
                <h2 className="mt-1 text-2xl font-bold text-foreground">MarsVision Total Care</h2>
              </div>
            </div>
            <StatusPill tone="success">Ativo</StatusPill>
          </div>

          <div className="mt-7 rounded-2xl border border-primary/20 bg-white/80 p-5 shadow-sm ring-1 ring-primary/5">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Plano mensal</p>
                <p className="mt-3 text-4xl font-bold tracking-tight text-foreground">
                  450 GC
                  <span className="text-base font-medium text-muted-foreground">/mês</span>
                </p>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                Inclui suporte
              </span>
            </div>

            <div className="mt-5 flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarClock className="size-4 text-primary" strokeWidth={1.8} />
              <span>Próxima cobrança em 16 de outubro de 2026</span>
            </div>
          </div>
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="label-tech">Métodos de Pagamento</p>
              <h3 className="mt-1 text-lg font-semibold text-foreground">Cartões cadastrados</h3>
            </div>
            <Button
              variant="outline"
              className="border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 hover:text-primary"
            >
              <Plus className="size-4" />
              Adicionar Cartão
            </Button>
          </div>

          <div className="rounded-2xl border border-border bg-[#fff9f6] p-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-[#1a1f71] text-sm font-bold text-white shadow-sm">
                  V
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Visa</p>
                  <p className="mt-1 text-sm text-muted-foreground">**** 1234</p>
                </div>
              </div>

              <span className="rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-[11px] font-semibold text-success">
                Padrão
              </span>
            </div>
          </div>

          <Button className="w-full sm:w-auto bg-primary text-primary-foreground shadow-sm hover:bg-primary/90">
            <CreditCard className="size-4" />
            Gerenciar pagamento
          </Button>
        </div>
      </section>
    </div>
  );
}