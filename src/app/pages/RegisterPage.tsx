import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { motion } from 'motion/react';
import { useAuth } from '../lib/authMock';
import { Zap, User, Lock, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password || !confirmPassword) {
      toast.error('Identity incomplete. Please provide full credentials.');
      return;
    }

    if (password.length < 6) {
      toast.error('Secure Key too short. Min 6 characters.');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passcode mismatch detected.');
      return;
    }

    setLoading(true);
    const success = await register(username, password);
    setLoading(false);

    if (success) {
      toast.success('Agent registered. Welcome operative.');
      navigate('/');
    } else {
      toast.error('Registration failed. Identity already exists.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/4 right-1/2 translate-x-1/2 w-[300px] h-[300px] bg-secondary/15 blur-[100px] rounded-full" />
      <div className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] bg-primary/10 blur-[80px] rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] glass p-8 rounded-[32px] border border-white/10 relative z-10"
      >
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-[24px] bg-secondary flex items-center justify-center neon-glow-cyan mb-6">
            <Sparkles size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Deku <span className="text-secondary">AI</span></h1>
          <p className="text-muted-foreground mt-2 text-[15px]">New Operative Registration</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[14px] font-medium text-muted-foreground ml-1">Username</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Agent ID"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-muted-foreground ml-1">Passcode</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Secure Key"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-muted-foreground ml-1">Confirm Passcode</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Verify Secure Key"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-secondary/50 focus:border-secondary outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 neon-glow-cyan hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-70 disabled:hover:scale-100"
          >
            {loading ? <Loader2 className="animate-spin" /> : 'Register'}
            {!loading && <ArrowRight size={20} />}
          </button>
        </form>

        <div className="mt-8 text-center text-[14px] text-muted-foreground">
          Already active?{' '}
          <Link to="/login" className="text-secondary font-bold hover:underline">
            Identify Operative
          </Link>
        </div>
      </motion.div>

      <footer className="mt-12 text-[12px] text-muted-foreground opacity-40 uppercase tracking-[0.2em] font-medium relative z-10">
        Registration Protocol v2.0.4.52
      </footer>
    </div>
  );
}
