import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { LogIn, User, Lock, Cpu } from "lucide-react";

export function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we'd authenticate with Supabase here.
    // For this prototype, we'll just navigate to the chat.
    navigate("/chat");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col flex-1 px-8 pt-12"
    >
      <div className="flex flex-col items-center mb-12">
        <div className="w-20 h-20 rounded-2xl glass flex items-center justify-center border-primary/30 neon-glow mb-4">
          <Cpu className="w-10 h-10 text-primary" strokeWidth={1.5} />
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white mb-2">DEKU AI</h1>
        <p className="text-muted-foreground text-sm font-medium">Next-Gen Intelligence</p>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-5">
        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary uppercase tracking-widest ml-1">Username</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Enter username"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-white/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-primary uppercase tracking-widest ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all placeholder:text-white/20"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="mt-4 w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-glow-primary transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <LogIn className="w-5 h-5" />
          SYSTEM ACCESS
        </button>
      </form>

      <div className="mt-auto mb-8 text-center space-y-4">
        <p className="text-muted-foreground text-sm">
          New operative?{" "}
          <Link to="/register" className="text-secondary font-semibold hover:underline decoration-secondary/50">
            Create Profile
          </Link>
        </p>
        <div className="flex justify-center gap-4 text-[10px] text-white/20 uppercase tracking-[2px]">
          <span>v.2.4.0</span>
          <span>•</span>
          <span>Secure Connection</span>
        </div>
      </div>
    </motion.div>
  );
}
