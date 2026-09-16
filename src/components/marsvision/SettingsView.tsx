import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const toggles = [
  { id: "storm", label: "Sandstorm alert broadcasts", desc: "Push Class 2+ storm warnings to patient comms." },
  { id: "rad", label: "Radiation threshold auto-lock", desc: "Suspend surface appointments above 3.5 mSv." },
  { id: "stock", label: "Low-stock reorder requests", desc: "Auto-draft supply shuttle manifests." },
  { id: "synth", label: "Synthesian protocol module", desc: "Enable non-organic ocular diagnostics." },
];

export function SettingsView() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="panel">
        <div className="border-b border-border p-4">
          <h3 className="text-sm font-semibold">Clinic Configuration</h3>
          <p className="label-tech mt-1">Facility MV-04 // Sector 4</p>
        </div>
        <div className="space-y-4 p-4">
          <div className="space-y-1.5">
            <Label className="label-tech">Facility name</Label>
            <Input defaultValue="MarsVision Ophthalmic Center" className="rounded-sm bg-surface-2" />
          </div>
          <div className="space-y-1.5">
            <Label className="label-tech">Colony sector</Label>
            <Input defaultValue="Nova Terra // Dome 2" className="rounded-sm bg-surface-2" />
          </div>
          <div className="space-y-1.5">
            <Label className="label-tech">Operating window (Mars Sol Time)</Label>
            <Input defaultValue="07:00 — 19:00" className="rounded-sm bg-surface-2 font-mono" />
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="border-b border-border p-4">
          <h3 className="text-sm font-semibold">Operational Protocols</h3>
          <p className="label-tech mt-1">System automations</p>
        </div>
        <div className="divide-y divide-border">
          {toggles.map((t, i) => (
            <div key={t.id} className="flex items-start justify-between gap-4 p-4">
              <div>
                <p className="text-sm font-medium text-foreground">{t.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.desc}</p>
              </div>
              <Switch defaultChecked={i !== 3} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
