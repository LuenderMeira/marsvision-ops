import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Radio, Signal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar, navItems } from "@/components/marsvision/Sidebar";
import { DashboardView } from "@/components/marsvision/DashboardView";
import { ScheduleView } from "@/components/marsvision/ScheduleView";
import { PatientsView } from "@/components/marsvision/PatientsView";
import { StaffView } from "@/components/marsvision/StaffView";
import { ProductsView } from "@/components/marsvision/ProductsView";
import { SettingsView } from "@/components/marsvision/SettingsView";

const title = "MarsVision OS — Martian Eye Clinic Management";
const description =
  "Administrative control center for MarsVision: consultations, colony patient registry, clinical staff and ophthalmic inventory on Mars.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [view, setView] = useState<string>("dashboard");

  return (
    <div className="min-h-screen bg-background">
      <Sidebar value={view} onChange={setView} />

      <div className="md:pl-60">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-surface px-5 py-4">
          <div>
            <h1 className="text-lg font-semibold tracking-tight">MarsVision Operations</h1>
            <p className="label-tech mt-1">Sol 07 // Cycle 2242 // Facility MV-04</p>
          </div>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Signal className="size-3.5 text-success" strokeWidth={2} /> Uplink stable
            </span>
            <span className="flex items-center gap-1.5">
              <Radio className="size-3.5 text-accent" strokeWidth={2} /> Earth delay 14m 22s
            </span>
          </div>
        </header>

        <main className="p-5">
          <Tabs value={view} onValueChange={setView}>
            <TabsList className="mb-5 h-auto w-full justify-start gap-1 rounded-sm border border-border bg-surface p-1">
              {navItems.map((item) => (
                <TabsTrigger
                  key={item.id}
                  value={item.id}
                  className="rounded-sm px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  {item.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="dashboard">
              <DashboardView />
            </TabsContent>
            <TabsContent value="schedule">
              <ScheduleView />
            </TabsContent>
            <TabsContent value="patients">
              <PatientsView />
            </TabsContent>
            <TabsContent value="staff">
              <StaffView />
            </TabsContent>
            <TabsContent value="products">
              <ProductsView />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsView />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
