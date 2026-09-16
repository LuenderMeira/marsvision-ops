import { cn } from "@/lib/utils";

type Tone = "primary" | "accent" | "warning" | "success" | "info" | "neutral" | "danger";

const tones: Record<Tone, string> = {
  primary: "border-primary/60 text-primary bg-primary/10",
  accent: "border-accent/60 text-accent bg-accent/10",
  warning: "border-warning/60 text-warning bg-warning/10",
  success: "border-success/60 text-success bg-success/10",
  info: "border-info/60 text-info bg-info/10",
  danger: "border-destructive/70 text-destructive bg-destructive/10",
  neutral: "border-border-strong text-muted-foreground bg-secondary",
};

export function StatusPill({
  tone = "neutral",
  children,
  className,
}: {
  tone?: Tone | undefined;
  children: React.ReactNode;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-[0.12em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export const speciesTone: Record<string, Tone> = {
  Human: "info",
  Martian: "primary",
  Cyborg: "accent",
  Synthesian: "success",
};

export const staffTone: Record<string, Tone> = {
  Available: "success",
  "In Surgery": "warning",
  "Off-Planet": "neutral",
};

export const apptTone: Record<string, Tone> = {
  Completed: "success",
  "In Progress": "accent",
  Scheduled: "neutral",
};
