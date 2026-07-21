import { Settings } from 'lucide-react';

export default function AdminSettingsPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Site Settings</h1>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm p-12 text-center">
        <div className="max-w-md mx-auto space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Settings size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold">Global Configuration</h2>
          <p className="text-muted-foreground leading-relaxed">
            The advanced site configuration panel is currently locked for standard admin users. 
            SuperAdmins can access database variables (like branding colors, API keys, and maintenance mode toggles) directly via the infrastructure layer.
          </p>
        </div>
      </div>
    </div>
  )
}
