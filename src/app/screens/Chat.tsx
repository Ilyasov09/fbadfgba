import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Menu, Send, Bot, Sparkles, 
  Trash2, Copy, Share2, MoreVertical, Brain,
  ChevronDown
} from "lucide-react";
import { Sidebar } from "../components/Sidebar";
import { Link } from "react-router";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export function Chat() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Protocol initialized. I am DEKU AI, your neural assistant. How can I facilitate your inquiry today?",
      timestamp: "09:41"
    }
  ]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);

    // Mock AI response
    setTimeout(() => {
      setIsTyping(false);
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "Understood. Processing your request through my neural network... Logic gates optimized. The quantum fluctuations are minimal today.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 2000);
  };

  return (
    <div className="flex flex-col flex-1 h-full bg-[#0b0f1a] relative">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header */}
      <header className="px-6 py-4 flex items-center justify-between glass z-10 sticky top-0 border-b border-white/5">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-white/5 rounded-full text-white/60 hover:text-white transition-all active:scale-95"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex flex-col">
            <h2 className="text-sm font-bold tracking-tight text-white leading-none">DEKU AI</h2>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Protocol Active</span>
            </div>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />
          <div className="relative w-9 h-9 rounded-xl glass border-primary/40 flex items-center justify-center">
             <Bot className="w-5 h-5 text-primary" strokeWidth={1.5} />
          </div>
        </div>
      </header>

      {/* Messages */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 py-8 space-y-8 scrollbar-hide scroll-smooth"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3 }}
              className={`flex flex-col ${msg.role === "user" ? "items-end" : "items-start"}`}
            >
              <div className="flex items-center gap-2 mb-2 px-1">
                {msg.role === "assistant" ? (
                  <div className="w-5 h-5 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                    <Brain className="w-3 h-3 text-primary" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-md bg-secondary/20 border border-secondary/30 flex items-center justify-center">
                    <User className="w-3 h-3 text-secondary" />
                  </div>
                )}
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">
                  {msg.role === "assistant" ? "Neural Core" : "Operative"}
                </span>
                <span className="text-[10px] text-white/10">• {msg.timestamp}</span>
              </div>
              
              <div className={`
                max-w-[85%] px-5 py-4 rounded-2xl text-sm leading-relaxed
                ${msg.role === "user" 
                  ? "bg-primary text-white rounded-tr-none shadow-glow-primary" 
                  : "glass text-white/90 rounded-tl-none border-white/10"
                }
              `}>
                {msg.content}
              </div>

              {msg.role === "assistant" && (
                <div className="flex gap-4 mt-3 px-1 text-white/20">
                   <button className="hover:text-primary transition-colors"><Copy className="w-3 h-3" /></button>
                   <button className="hover:text-primary transition-colors"><Trash2 className="w-3 h-3" /></button>
                   <button className="hover:text-primary transition-colors"><Share2 className="w-3 h-3" /></button>
                </div>
              )}
            </motion.div>
          ))}
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-start"
            >
              <div className="flex items-center gap-2 mb-2 px-1">
                <div className="w-5 h-5 rounded-md bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <Brain className="w-3 h-3 text-primary" />
                </div>
                <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Neural Core</span>
              </div>
              <div className="glass px-5 py-4 rounded-2xl rounded-tl-none border-white/10 flex gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-primary/40 animate-bounce [animation-delay:0.4s]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Bar */}
      <div className="p-6 pt-2 bg-[#0b0f1a] relative">
        <form 
          onSubmit={handleSendMessage}
          className="relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl blur opacity-30 group-focus-within:opacity-100 transition duration-500" />
          <div className="relative glass border-white/10 rounded-2xl p-1.5 flex items-center gap-2 pr-3">
            <input 
              type="text" 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Query neural network..."
              className="flex-1 bg-transparent border-none outline-none text-sm px-4 py-3 placeholder:text-white/20 text-white"
            />
            <button 
              type="submit"
              disabled={!inputText.trim()}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white disabled:opacity-30 disabled:grayscale transition-all hover:scale-105 active:scale-95 shadow-glow-primary"
            >
              <Send className="w-5 h-5" strokeWidth={2.5} />
            </button>
          </div>
        </form>
        <div className="text-center mt-3">
          <span className="text-[10px] font-medium text-white/10 uppercase tracking-[2px]">Encrypted Stream v2.4</span>
        </div>
      </div>
    </div>
  );
}
