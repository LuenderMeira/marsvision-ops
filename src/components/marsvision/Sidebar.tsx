import { LayoutGrid, CalendarDays, Users, Stethoscope, Package, Settings, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "patients", label: "Patients", icon: Users },
  { id: "staff", label: "Staff", icon: Stethoscope },
  { id: "products", label: "Products", icon: Package },
  { id: "settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 flex-col border-r border-sidebar-border bg-sidebar md:flex">
      <div className="flex items-center gap-3 border-b border-sidebar-border px-5 py-5">
        <div className="flex size-9 items-center justify-center rounded-sm border border-primary/70 bg-primary/15">
          <Eye className="size-5 text-primary" strokeWidth={1.8} />
        </div>
        <div className="leading-tight">
          <div className="text-sm font-semibold tracking-tight text-sidebar-foreground">MarsVision OS</div>
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">v4.2 // Sector 4</div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <p className="label-tech px-2 pb-2 pt-1">Operations</p>
        {navItems.map((item) => {
          const active = value === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChange(item.id)}
              className={cn(
                "flex w-full items-center gap-3 rounded-sm border-l-2 px-3 py-2 text-left text-sm transition-colors",
                active
                  ? "border-primary bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                  : "border-transparent text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="size-4" strokeWidth={1.8} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-sm border border-border-strong bg-surface-2 font-mono text-xs text-foreground">
            AS
          </div>
          <div className="min-w-0 leading-tight">
            <div className="truncate text-sm font-medium text-sidebar-foreground">Dr. Silva</div>
            <div className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground">
              Chief Medical Officer
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
