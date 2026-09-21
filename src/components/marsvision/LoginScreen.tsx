import type { FormEvent } from "react";
import { Eye, Fingerprint, LockKeyhole, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function LoginScreen({ onLogin }: { onLogin: () => void }) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onLogin();
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] [--accent-foreground:#fff] [--border:#e7ded7] [--foreground:#382d29] [--input:#ded3ca] [--muted-foreground:#776b66] [--primary-foreground:#fffaf6] [--primary:#a64f35] [--ring:#a64f35] [--secondary:#f2ece7] [--success:#398c5c] [color-scheme:light] lg:grid lg:grid-cols-[minmax(360px,1fr)_2fr]">
      <section className="relative z-10 flex min-h-screen flex-col bg-[#FAF8F5] px-6 py-8 sm:px-10 lg:px-12 xl:px-16">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Eye className="size-5" strokeWidth={2} />
          </div>
          <div>
            <p className="text-base font-bold tracking-tight text-foreground">MarsVision OS</p>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Unidade Ares
            </p>
          </div>
        </div>

        <div className="my-auto w-full max-w-md py-14 lg:py-10">
          <div className="mb-9">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              Portal operacional
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Bem-vindo de volta.
            </h1>
            <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
              Gestão Operacional Interplanetária
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-semibold text-foreground">
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="nome@marsvision.com"
                autoComplete="email"
                className="h-12 rounded-lg border-border bg-white px-4 shadow-sm focus-visible:ring-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <label htmlFor="password" className="text-sm font-semibold text-foreground">
                  Senha
                </label>
                <button type="button" className="text-xs font-medium text-primary hover:underline">
                  Recuperar acesso
                </button>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  autoComplete="current-password"
                  className="h-12 rounded-lg border-border bg-white px-4 pr-11 shadow-sm focus-visible:ring-2"
                />
                <LockKeyhole className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <Button type="submit" className="h-12 w-full rounded-lg font-semibold shadow-sm">
                <ShieldCheck className="size-4" />
                Acesso Restrito - Nível 4
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="h-12 w-full rounded-lg border border-border bg-white text-foreground shadow-sm hover:bg-orange-900/10 hover:text-orange-700"
              >
                <Fingerprint className="size-5 text-primary" />
                Autenticação Biométrica
              </Button>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-1.5 rounded-full bg-success" />
          Canal criptografado · MV-SEC 4.8
        </div>
      </section>

      <section
        className="relative hidden min-h-screen overflow-hidden bg-slate-950 lg:block"
        aria-label="Paisagem marciana conceitual"
      >
        <img
          src="/images/mars-habitat-observation-window.png"
          alt="Vista panorâmica de um cânion marciano através da janela técnica do habitat"
          className="absolute inset-0 size-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,10,15,0.18),transparent_35%,rgba(4,10,15,0.48))]" />

        <div className="absolute left-[7%] top-[12%] border-l border-cyan-100/50 pl-4 font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-cyan-50/80 drop-shadow-md">
        </div>
        <div className="absolute right-[7%] top-[12%] border-r border-orange-100/50 pr-4 text-right font-mono text-[10px] uppercase leading-5 tracking-[0.16em] text-orange-50/85 drop-shadow-md">
        </div>
        <div className="absolute bottom-[11%] left-[7%] right-[7%] flex items-end justify-between gap-8 border-t border-cyan-50/25 pt-5 text-white drop-shadow-lg">
          <div className="max-w-lg">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-cyan-50/65">
              MV-OS · Observatório clínico
            </p>
            <p className="mt-2 text-2xl font-semibold leading-tight xl:text-3xl">
              Precisão clínica além da Terra
            </p>
          </div>
          <div className="hidden text-right font-mono text-[9px] uppercase leading-4 tracking-[0.14em] text-cyan-50/65 xl:block">
          </div>
        </div>
      </section>
    </main>
  );
}
