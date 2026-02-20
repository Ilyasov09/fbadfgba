import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  X, MessageSquare, Settings as SettingsIcon, 
  LogOut, PlusCircle, History, Sparkles, Brain
} from "lucide-react";
import { Link, useNavigate } from "react-router";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const chatHistory = [
    { id: 1, title: "Quantum Neural Nets", date: "Today" },
    { id: 2, title: "Futuristic UI Trends", date: "Yesterday" },
    { id: 3, title: "Project: Deku AI", date: "Feb 15" },
    { id: 4, title: "Ethics of AGI", date: "Feb 12" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Sidebar Drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute top-0 left-0 h-full w-[280px] bg-[#0d121f] border-r border-white/10 z-[110] flex flex-col p-6 shadow-2xl"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-primary" />
                </div>
                <span className="font-bold text-lg tracking-tight">DEKU AI</span>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <X className="w-5 h-5 text-white/40" />
              </button>
            </div>

            <button 
              onClick={() => { onClose(); }}
              className="w-full bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 px-4 flex items-center gap-3 transition-all mb-8 group"
            >
              <PlusCircle className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
              <span className="text-sm font-semibold">New Session</span>
            </button>

            <div className="flex-1 overflow-y-auto space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                  <History className="w-4 h-4 text-white/30" />
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[2px]">Recent Transmissions</span>
                </div>
                <div className="space-y-1">
                  {chatHistory.map((chat) => (
                    <button 
                      key={chat.id}
                      className="w-full text-left px-3 py-2.5 rounded-lg hover:bg-white/5 text-sm text-white/60 hover:text-white transition-all flex items-center gap-3 group"
                    >
                      <MessageSquare className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors" />
                      <span className="truncate">{chat.title}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-4 px-1">
                  <Sparkles className="w-4 h-4 text-white/30" />
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-[2px]">Premium Features</span>
                </div>
                <button className="w-full p-4 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 flex flex-col gap-2">
                   <span className="text-xs font-bold text-white">Upgrade to Cortex+</span>
                   <span className="text-[10px] text-white/40">Unlock multi-modal neural processing and no limits.</span>
                </button>
              </div>
            </div>

            <div className="mt-auto pt-6 border-t border-white/5 space-y-2">
              <Link 
                to="/settings" 
                onClick={onClose}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all text-white/70 hover:text-white"
              >
                <SettingsIcon className="w-5 h-5" />
                <span className="text-sm font-medium">Settings</span>
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-white/5 transition-all text-red-400/70 hover:text-red-400"
              >
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-medium">Disconnect</span>
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
