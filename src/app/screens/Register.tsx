import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { motion } from "motion/react";
import { UserPlus, User, Lock, Mail, ShieldCheck } from "lucide-react";

export function Register() {
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/chat");
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col flex-1 px-8 pt-12"
    >
      <div className="flex flex-col items-center mb-10 text-center">
        <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center border-secondary/30 neon-glow-cyan mb-4">
          <UserPlus className="w-8 h-8 text-secondary" strokeWidth={1.5} />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white mb-2">JOIN DEKU</h1>
        <p className="text-muted-foreground text-sm font-medium">Register your profile for network access</p>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-secondary uppercase tracking-widest ml-1">Email</label>
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <input 
              type="email" 
              placeholder="user@network.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all placeholder:text-white/20"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-secondary uppercase tracking-widest ml-1">Username</label>
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <input 
              type="text" 
              placeholder="System tag"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all placeholder:text-white/20"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-secondary uppercase tracking-widest ml-1">Password</label>
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-secondary transition-colors" />
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-11 pr-4 text-sm focus:outline-none focus:border-secondary/50 focus:ring-1 focus:ring-secondary/30 transition-all placeholder:text-white/20"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          className="mt-6 w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-4 rounded-xl shadow-glow-cyan transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-5 h-5" />
          CREATE ACCOUNT
        </button>
      </form>

      <div className="mt-auto mb-8 text-center">
        <p className="text-muted-foreground text-sm">
          Already verified?{" "}
          <Link to="/" className="text-primary font-semibold hover:underline decoration-primary/50">
            System Login
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
