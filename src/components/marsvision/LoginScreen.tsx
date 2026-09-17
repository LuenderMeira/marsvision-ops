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
        className="relative hidden min-h-screen overflow-hidden bg-[#B95F43] lg:block"
        aria-label="Paisagem marciana conceitual"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(255,230,204,0.48),transparent_28%),linear-gradient(145deg,#8f3f2e_0%,#c87554_48%,#e3a178_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:72px_72px]" />
        <div className="absolute inset-x-0 bottom-0 h-[46%] bg-[linear-gradient(165deg,transparent_0_22%,rgba(112,51,36,0.32)_23%,rgba(91,42,31,0.62)_100%)]" />

        <div className="absolute left-[13%] top-[12%] rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-medium text-white/85 backdrop-blur-md">
          Setor de Operações · Marte
        </div>

        <div className="absolute bottom-[20%] left-1/2 h-[44%] w-[62%] -translate-x-1/2 rounded-t-[999px] border border-white/45 bg-[linear-gradient(135deg,rgba(255,255,255,0.38),rgba(255,255,255,0.06))] shadow-[inset_0_0_80px_rgba(255,255,255,0.16),0_35px_90px_rgba(67,30,23,0.25)] backdrop-blur-[2px]">
          <div className="absolute inset-x-[12%] bottom-0 h-[22%] rounded-t-3xl border border-white/20 bg-[#6f392e]/55 backdrop-blur-md" />
          <div className="absolute bottom-[22%] left-1/2 h-[52%] w-px bg-white/35" />
          <div className="absolute bottom-[22%] left-[21%] h-[44%] w-px rotate-[28deg] bg-white/25" />
          <div className="absolute bottom-[22%] right-[21%] h-[44%] w-px -rotate-[28deg] bg-white/25" />
          <div className="absolute bottom-[28%] left-1/2 size-20 -translate-x-1/2 rounded-full border border-white/25 bg-[#FAF8F5]/90 shadow-[0_0_35px_rgba(255,239,218,0.55)]" />
          <Eye className="absolute bottom-[calc(28%+1.75rem)] left-1/2 size-6 -translate-x-1/2 text-primary" />
        </div>

        <div className="absolute bottom-10 left-10 right-10 flex items-end justify-between text-white xl:bottom-14 xl:left-14 xl:right-14">
          <div className="max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/65">
              MarsVision
            </p>
            <p className="mt-2 text-2xl font-semibold leading-tight">
              Precisão clínica além da Terra.
            </p>
          </div>
          <p className="text-xs text-white/65">SOL 428 · 06:42 MTC</p>
        </div>
      </section>
    </main>
  );
}
