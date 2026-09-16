import { cn } from "@/lib/utils";
type Tone = "primary" | "accent" | "warning" | "success" | "info" | "neutral" | "danger";
const tones: Record<Tone, string> = { primary: "border-primary/30 text-primary bg-primary/10", accent: "border-accent/30 text-accent bg-accent/10", warning: "border-warning/30 text-warning bg-warning/10", success: "border-success/30 text-success bg-success/10", info: "border-info/30 text-info bg-info/10", danger: "border-destructive/30 text-destructive bg-destructive/10", neutral: "border-border text-muted-foreground bg-secondary" };
export function StatusPill({ tone = "neutral", children, className }: { tone?: Tone | undefined; children: React.ReactNode; className?: string | undefined }) { return <span className={cn("inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[10px] font-semibold", tones[tone], className)}>{children}</span>; }
export const speciesTone: Record<string, Tone> = { Humano: "info", Marciano: "primary", Ciborgue: "accent", Sintético: "success" };
export const staffTone: Record<string, Tone> = { Disponível: "success", "Em cirurgia": "warning", "Fora do planeta": "neutral" };
export const apptTone: Record<string, Tone> = { Concluída: "success", "Em andamento": "accent", Agendada: "neutral" };
