import {
  LayoutGrid,
  CalendarDays,
  Users,
  Stethoscope,
  Package,
  Settings,
  Eye,
  CreditCard,
  Moon,
  Sun,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/hooks/use-theme";

export const navItems = [
  { id: "dashboard", label: "Visão Geral", icon: LayoutGrid },
  { id: "schedule", label: "Agenda", icon: CalendarDays },
  { id: "patients", label: "Pacientes", icon: Users },
  { id: "staff", label: "Equipe", icon: Stethoscope },
  { id: "products", label: "Produtos", icon: Package },
  { id: "settings", label: "Configurações", icon: Settings },
] as const;

const billingItem = { id: "billing", label: "Faturamento", icon: CreditCard } as const;
const mobileNavItems = [...navItems.slice(0, -1), billingItem, navItems.at(-1)!];

export function Sidebar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "escuro";
  return (
    <TooltipProvider>
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r border-sidebar-border bg-sidebar md:flex">
        <div className="flex items-center gap-3 px-6 py-7">
          <div className="flex size-10 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <Eye className="size-5" strokeWidth={2} />
          </div>
          <div className="leading-tight">
            <div className="text-base font-bold text-sidebar-foreground">MarsVision</div>
            <div className="text-xs text-muted-foreground">Gestão oftalmológica</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 px-4 py-3" aria-label="Navegação principal">
          <p className="label-tech px-3 pb-3 pt-1">Gestão da clínica</p>
          {navItems.map((item) => {
            const active = value === item.id;
            return (
              <Button
                key={item.id}
                type="button"
                variant="ghost"
                onClick={() => onChange(item.id)}
                className={cn(
                  "h-11 w-full justify-start gap-3 rounded-lg px-3 text-sm shadow-none",
                  active
                    ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground hover:bg-sidebar-accent"
                    : "text-muted-foreground hover:bg-muted hover:text-sidebar-foreground",
                )}
              >
                <item.icon className="size-4" strokeWidth={2} />
                {item.label}
              </Button>
            );
          })}
        </nav>
        <div className="px-4 pb-3">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onChange(billingItem.id)}
            className={cn(
              "h-11 w-full justify-start gap-3 rounded-lg px-3 text-sm shadow-none",
              value === billingItem.id
                ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground hover:bg-sidebar-accent"
                : "text-muted-foreground hover:bg-muted hover:text-sidebar-foreground",
            )}
          >
            <billingItem.icon className="size-4" strokeWidth={2} />
            {billingItem.label}
          </Button>
        </div>
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-3 px-1">
            <div className="flex size-10 items-center justify-center rounded-full bg-secondary text-xs font-semibold text-primary">
              AS
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm font-medium text-sidebar-foreground">Dra. Silva</div>
              <div className="truncate text-xs text-muted-foreground">Diretora clínica</div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={toggleTheme}
                  aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
                  className="shrink-0 text-muted-foreground hover:text-sidebar-foreground"
                >
                  {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">{isDark ? "Tema claro" : "Tema escuro"}</TooltipContent>
            </Tooltip>
          </div>
        </div>
      </aside>
      <nav
        className="fixed inset-x-0 bottom-0 z-30 flex h-16 items-center overflow-x-auto border-t border-border bg-sidebar px-1 shadow-sm md:hidden"
        aria-label="Navegação principal"
      >
        {mobileNavItems.map((item) => {
          const active = value === item.id;
          return (
            <Button
              key={item.id}
              type="button"
              variant="ghost"
              onClick={() => onChange(item.id)}
              aria-label={item.label}
              className={cn(
                "h-14 min-w-16 flex-1 flex-col gap-1 rounded-lg px-1 text-[10px] shadow-none",
                active
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-muted-foreground",
              )}
            >
              <item.icon className="size-4" strokeWidth={2} />
              <span className="max-w-full truncate">{item.label}</span>
            </Button>
          );
        })}
        <Button
          type="button"
          variant="ghost"
          onClick={toggleTheme}
          aria-label={isDark ? "Ativar tema claro" : "Ativar tema escuro"}
          className="h-14 min-w-14 flex-col gap-1 rounded-lg px-1 text-[10px] text-muted-foreground shadow-none"
        >
          {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          <span>Tema</span>
        </Button>
      </nav>
    </TooltipProvider>
  );
}
