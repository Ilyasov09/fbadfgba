import React from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { useSettings, AIMode, AccentColor } from '../lib/useSettings';
import { 
  ChevronLeft, 
  Moon, 
  Sun, 
  Palette, 
  Type, 
  Bot, 
  MessageSquare, 
  Shield, 
  Database, 
  Zap, 
  Settings as SettingsIcon,
  RotateCcw,
  Check
} from 'lucide-react';
import { toast } from 'sonner';

export default function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettings();
  const navigate = useNavigate();

  const handleReset = () => {
    if (confirm('Revert all systems to default configuration?')) {
      resetSettings();
      toast.success('System configuration restored to defaults.');
    }
  };

  const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="mb-8 last:mb-0">
      <h3 className="text-[12px] font-bold uppercase tracking-widest text-primary mb-4 ml-1">{title}</h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const Toggle = ({ label, value, onChange, icon }: { label: string; value: boolean; onChange: (v: boolean) => void; icon: React.ReactNode }) => (
    <div className="flex items-center justify-between p-4 glass rounded-2xl border border-white/10">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-white/5 text-muted-foreground">{icon}</div>
        <span className="text-[15px] font-medium">{label}</span>
      </div>
      <button 
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full relative transition-all duration-300 ${value ? 'bg-primary' : 'bg-white/10 border border-white/10'}`}
      >
        <motion.div 
          animate={{ x: value ? 26 : 4 }}
          className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm`}
        />
      </button>
    </div>
  );

  const Selection = <T extends string | number>({ label, options, value, onChange, icon }: { label: string; options: { label: string; value: T }[]; value: T; onChange: (v: T) => void; icon: React.ReactNode }) => (
    <div className="p-4 glass rounded-2xl border border-white/10">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-white/5 text-muted-foreground">{icon}</div>
        <span className="text-[15px] font-medium">{label}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={`px-3 py-2 rounded-xl text-[13px] font-medium transition-all ${
              value === opt.value 
                ? 'bg-primary text-white neon-glow' 
                : 'bg-white/5 border border-white/10 text-muted-foreground hover:bg-white/10 hover:text-foreground'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex flex-col h-screen overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
          >
            <ChevronLeft size={22} className="text-primary" />
          </button>
          <h1 className="text-[18px] font-bold tracking-tight">System Config</h1>
        </div>
        <button 
          onClick={handleReset}
          className="p-2.5 rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"
          title="Restore Defaults"
        >
          <RotateCcw size={20} />
        </button>
      </header>

      {/* Settings List */}
      <main className="flex-1 overflow-y-auto p-6 space-y-8 scroll-smooth pb-12">
        <Section title="Appearance">
          <Selection
            label="Visual Core"
            icon={settings.theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
            value={settings.theme}
            onChange={(v) => updateSettings({ theme: v as 'dark' | 'light' })}
            options={[
              { label: 'Dark Void', value: 'dark' },
              { label: 'Nova Light', value: 'light' }
            ]}
          />
          <Selection
            label="Accent Spectrum"
            icon={<Palette size={20} />}
            value={settings.accentColor}
            onChange={(v) => updateSettings({ accentColor: v as AccentColor })}
            options={[
              { label: 'Pulse Purple', value: 'Purple' },
              { label: 'Neon Cyan', value: 'Cyan' },
              { label: 'Electric Emerald', value: 'Emerald' }
            ]}
          />
          <Selection
            label="Data Density"
            icon={<Type size={20} />}
            value={settings.fontSize}
            onChange={(v) => updateSettings({ fontSize: v })}
            options={[
              { label: 'Compact', value: 14 },
              { label: 'Standard', value: 16 },
              { label: 'Expanded', value: 18 }
            ]}
          />
        </Section>

        <Section title="Neural Processor">
          <Selection
            label="AI Mode"
            icon={<Bot size={20} />}
            value={settings.aiMode}
            onChange={(v) => updateSettings({ aiMode: v as AIMode })}
            options={[
              { label: 'Standard', value: 'Normal' },
              { label: 'Creative', value: 'Creative' },
              { label: 'Developer', value: 'Coding' }
            ]}
          />
          <Toggle 
            label="Synthetic Typing" 
            icon={<Zap size={20} />}
            value={settings.typingAnimation}
            onChange={(v) => updateSettings({ typingAnimation: v })}
          />
        </Section>

        <Section title="Interface Logs">
          <Toggle 
            label="Synchronous Scroll" 
            icon={<MessageSquare size={20} />}
            value={settings.autoScroll}
            onChange={(v) => updateSettings({ autoScroll: v })}
          />
          <Toggle 
            label="Neural Animations" 
            icon={<Shield size={20} />}
            value={settings.animations}
            onChange={(v) => updateSettings({ animations: v })}
          />
          <Toggle 
            label="Protocol Optimization" 
            icon={<Database size={20} />}
            value={settings.dataSaver}
            onChange={(v) => updateSettings({ dataSaver: v })}
          />
        </Section>

        <div className="pt-4">
          <button 
            onClick={() => navigate(-1)}
            className="w-full bg-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 neon-glow hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Check size={20} />
            Commit Configuration
          </button>
        </div>
      </main>
    </div>
  );
}
