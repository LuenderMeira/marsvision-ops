import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Sidebar } from "@/components/marsvision/Sidebar";
import { DashboardView } from "@/components/marsvision/DashboardView";
import { ScheduleView } from "@/components/marsvision/ScheduleView";
import { PatientsView } from "@/components/marsvision/PatientsView";
import { StaffView } from "@/components/marsvision/StaffView";
import { ProductsView } from "@/components/marsvision/ProductsView";
import { UsuariosView } from "@/components/marsvision/UsuariosView";
import { SettingsView } from "@/components/marsvision/SettingsView";
import { BillingView } from "@/components/marsvision/BillingView";
import { LoginScreen } from "@/components/marsvision/LoginScreen";
import { AIChatWidget } from "@/components/marsvision/AIChatWidget";
import { AIConfigView } from "@/components/marsvision/AIConfigView";

const title = "MarsVision | Gestão Oftalmológica em Marte";
const description =
  "Gestão de consultas, pacientes, equipe clínica e produtos oftalmológicos da MarsVision em Marte.";

const pageTitles = {
  dashboard: { title: "Visão Geral", subtitle: "Acompanhe o desempenho da clínica hoje" },
  schedule: { title: "Agenda", subtitle: "Organize consultas e procedimentos" },
  patients: { title: "Pacientes", subtitle: "Consulte e gerencie os prontuários" },
  staff: { title: "Equipe", subtitle: "Acompanhe profissionais e escalas" },
  products: { title: "Produtos", subtitle: "Gerencie catálogo, preços e estoque" },
  users: { title: "Utilizadores", subtitle: "Gerencie acesso, permissões e usuários do sistema" },
  billing: { title: "Faturamento", subtitle: "Acompanhe seu plano e as cobranças da clínica" },
  "central-ai": { title: "Central da IA", subtitle: "Configure o assistente e o comportamento da IA" },
  settings: { title: "Configurações", subtitle: "Personalize a operação da clínica" },
} as const;

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: number; nome: string; cargo: string } | null>(null);
  const [view, setView] = useState<string>("dashboard");
  const page = pageTitles[view as keyof typeof pageTitles] ?? pageTitles.dashboard;
  const hojeLabel = new Intl.DateTimeFormat("pt-BR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch {
        localStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogin = (loggedUser: { id: number; nome: string; cargo: string }) => {
    setUser(loggedUser);
    setView("dashboard");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    setView("dashboard");
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar value={view} onChange={setView} user={user} onLogout={handleLogout} />
      <div className="pb-20 md:pb-0 md:pl-64">
        <header className="flex flex-wrap items-center justify-between gap-4 px-5 pb-3 pt-7 sm:px-8 sm:pt-9 lg:px-10">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{page.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{page.subtitle}</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-muted-foreground shadow-sm">
            <CalendarDays className="size-4 text-primary" />
            <span>{hojeLabel}</span>
          </div>
        </header>
        <main className="px-5 pb-8 pt-5 sm:px-8 lg:px-10">
          <Tabs value={view} onValueChange={setView}>
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
            <TabsContent value="users">
              <UsuariosView />
            </TabsContent>
            <TabsContent value="billing">
              <BillingView />
            </TabsContent>
            <TabsContent value="central-ai">
              <AIConfigView />
            </TabsContent>
            <TabsContent value="settings">
              <SettingsView />
            </TabsContent>
          </Tabs>
        </main>
      </div>
      <AIChatWidget />
    </div>
  );
}
