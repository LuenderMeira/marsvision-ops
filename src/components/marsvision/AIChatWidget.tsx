import { useState, type FormEvent } from "react";
import { Bot, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type Mensagem = {
  papel: "user" | "ia";
  texto: string;
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { papel: "ia", texto: "Olá! Como posso ajudar hoje na clínica?" },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const mensagemUsuario = input.trim();
    if (!mensagemUsuario || isLoading) {
      return;
    }

    setMensagens((prev) => [...prev, { papel: "user", texto: mensagemUsuario }]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mensagem: mensagemUsuario }),
      });

      if (!response.ok) {
        throw new Error("Falha ao obter resposta da IA");
      }

      const data = await response.json();
      setMensagens((prev) => [...prev, { papel: "ia", texto: data.resposta }]);
    } catch (error) {
      console.error("Erro ao consultar IA:", error);
      setMensagens((prev) => [
        ...prev,
        { papel: "ia", texto: "Não consegui responder agora. Tente novamente em instantes." },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-6 md:right-6">
      <div
        className={cn(
          "absolute bottom-16 right-0 flex h-[min(520px,calc(100vh-10rem))] w-[calc(100vw-2rem)] max-w-[390px] origin-bottom-right flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_70px_rgba(67,43,34,0.2)] transition-all duration-200 dark:bg-slate-950 dark:shadow-[0_24px_70px_rgba(0,0,0,0.45)]",
          isOpen
            ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
            : "pointer-events-none translate-y-3 scale-95 opacity-0",
        )}
        role="dialog"
        aria-label="Assistente IA MarsVision"
        aria-hidden={!isOpen}
      >
        <header className="flex items-center gap-3 border-b border-border bg-[#FAF8F5] px-4 py-4 dark:bg-slate-900">
          <div className="relative flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Bot className="size-5" />
            <Sparkles className="absolute -right-1 -top-1 size-3.5 rounded-full bg-white p-0.5 text-primary dark:bg-slate-900 dark:text-orange-300" />
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-sm font-semibold text-foreground dark:text-slate-100">
              Assistente IA MarsVision
            </h2>
            <div className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground dark:text-slate-300">
              <span className="size-2 rounded-full bg-success shadow-[0_0_0_3px_rgba(47,143,88,0.12)]" />
              Online
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            aria-label="Fechar assistente"
            className="rounded-full text-muted-foreground"
          >
            <X className="size-4" />
          </Button>
        </header>

        <div className="flex-1 space-y-4 overflow-y-auto bg-white px-4 py-5 dark:bg-slate-950">
          <p className="text-center text-[11px] font-medium uppercase tracking-wider text-muted-foreground dark:text-slate-400">
            Hoje · Assistência operacional
          </p>

          {mensagens.map((mensagem, index) => (
            <div key={`${mensagem.papel}-${index}`} className={cn("flex", mensagem.papel === "user" ? "justify-end" : "justify-start")}>
              <div
                className={cn(
                  "max-w-[84%] rounded-2xl px-4 py-3 text-sm leading-5 whitespace-pre-wrap",
                  mensagem.papel === "user"
                    ? "bg-primary text-white rounded-br-md"
                    : "bg-surface-2 text-foreground rounded-bl-md dark:bg-slate-800 dark:text-slate-100",
                )}
              >
                {mensagem.texto}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-bl-md bg-surface-2 px-4 py-3 text-xs font-medium text-muted-foreground dark:bg-slate-800 dark:text-slate-300">
                Pensando...
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSubmit}
          className="border-t border-border bg-white p-3 dark:bg-slate-950"
        >
          <div className="flex items-center gap-2 rounded-xl border border-border bg-[#FAF8F5] p-1.5 pl-3 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/10 dark:bg-slate-900">
            <Input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={isLoading ? "A IA está respondendo..." : "Digite seu comando..."}
              aria-label="Digite seu comando"
              disabled={isLoading}
              className="h-9 flex-1 border-0 bg-transparent px-0 text-foreground shadow-none focus-visible:ring-0 dark:text-slate-100 dark:placeholder:text-slate-400"
            />
            <Button
              type="submit"
              size="icon"
              className="size-9 rounded-lg"
              aria-label="Enviar comando"
              disabled={isLoading || !input.trim()}
            >
              <Send className="size-4" />
            </Button>
          </div>
        </form>
      </div>

      <Button
        type="button"
        size="icon"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Fechar assistente de IA" : "Abrir assistente de IA"}
        aria-expanded={isOpen}
        className="size-14 rounded-full border-4 border-white bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(145,67,43,0.38)] hover:scale-105 hover:bg-primary/90 dark:border-slate-900"
      >
        {isOpen ? <X className="size-5" /> : <Sparkles className="size-5" />}
      </Button>
    </div>
  );
}
