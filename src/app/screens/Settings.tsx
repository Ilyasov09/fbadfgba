import React, { useState } from "react";
import { motion } from "motion/react";
import { 
  ArrowLeft, Moon, Sun, Monitor, 
  Settings as SettingsIcon, Brain, 
  MessageSquare, User, Smartphone, 
  Shield, Bell, ChevronRight, Check
} from "lucide-react";
import { Link, useNavigate } from "react-router";

export function Settings() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [notifications, setNotifications] = useState(true);

  const toggleTheme = () => {
    setTheme(prev => prev === "dark" ? "light" : "dark");
  };

  const sections = [
    {
      title: "Appearance",
      items: [
        { 
          id: "theme",
          label: "Theme", 
          icon: theme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />,
          value: theme.charAt(0).toUpperCase() + theme.slice(1),
          onClick: toggleTheme,
          type: "toggle"
        },
        { 
          id: "font",
          label: "Interface Font", 
          icon: <Monitor className="w-4 h-4" />,
          value: "Inter UI",
          type: "select"
        }
      ]
    },
    {
      title: "AI Core Settings",
      items: [
        { 
          id: "model",
          label: "Neural Model", 
          icon: <Brain className="w-4 h-4" />,
          value: "Cortex 4.0 Pro",
          type: "select"
        },
        { 
          id: "temp",
          label: "Creativity (Temp)", 
          icon: <Smartphone className="w-4 h-4" />,
          value: "High (0.9)",
          type: "select"
        }
      ]
    },
    {
      title: "Privacy & Security",
      items: [
        { 
          id: "history",
          label: "Transmission History", 
          icon: <MessageSquare className="w-4 h-4" />,
          value: "Encrypted",
          type: "link"
        },
        { 
          id: "biometric",
          label: "Biometric Access", 
          icon: <Shield className="w-4 h-4" />,
          value: "Disabled",
          type: "link"
        }
      ]
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className={`flex flex-col flex-1 h-full ${theme === "dark" ? "bg-[#0b0f1a] text-white" : "bg-[#f8fafc] text-slate-900"}`}
    >
      <header className={`px-6 py-6 flex items-center gap-4 ${theme === "dark" ? "border-b border-white/5" : "border-b border-slate-200"}`}>
        <button 
          onClick={() => navigate("/chat")}
          className={`p-2 rounded-full ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-slate-100"}`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold tracking-tight">System Settings</h1>
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className={`text-[10px] font-bold uppercase tracking-[3px] mb-4 px-1 ${theme === "dark" ? "text-white/30" : "text-slate-400"}`}>
              {section.title}
            </h2>
            <div className={`rounded-2xl overflow-hidden border ${theme === "dark" ? "glass border-white/5" : "bg-white border-slate-200"}`}>
              {section.items.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={item.onClick}
                  className={`w-full flex items-center justify-between px-5 py-5 transition-all
                    ${idx !== section.items.length - 1 ? (theme === "dark" ? "border-b border-white/5" : "border-b border-slate-100") : ""}
                    ${theme === "dark" ? "hover:bg-white/5" : "hover:bg-slate-50"}
                  `}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-lg ${theme === "dark" ? "bg-white/5 text-primary" : "bg-slate-100 text-primary"}`}>
                      {item.icon}
                    </div>
                    <span className="text-sm font-semibold">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs ${theme === "dark" ? "text-white/40" : "text-slate-400"}`}>{item.value}</span>
                    {item.type === "toggle" ? (
                       <div className={`w-10 h-5 rounded-full p-1 transition-colors ${theme === "dark" ? "bg-primary" : "bg-slate-300"}`}>
                          <div className={`w-3 h-3 bg-white rounded-full transition-transform ${theme === "dark" ? "translate-x-5" : "translate-x-0"}`} />
                       </div>
                    ) : (
                       <ChevronRight className={`w-4 h-4 ${theme === "dark" ? "text-white/10" : "text-slate-300"}`} />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pt-4">
           <button className="w-full p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm font-bold flex items-center justify-center gap-2 hover:bg-red-500/10 transition-all">
              ERASE ALL TRANSMISSIONS
           </button>
           <p className={`text-[10px] text-center mt-6 uppercase tracking-[2px] ${theme === "dark" ? "text-white/10" : "text-slate-300"}`}>
              Hardware: Neural Link v4.2.0
           </p>
        </div>
      </div>
    </motion.div>
  );
}
