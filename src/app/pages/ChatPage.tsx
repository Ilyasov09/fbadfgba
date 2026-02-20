import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { ChatWindow } from '../components/ChatWindow';
import { InputBar } from '../components/InputBar';
import { useChatState } from '../lib/useChatState';
import { useAuth } from '../lib/authMock';
import { useSettings } from '../lib/useSettings';
import { useNavigate } from 'react-router';
import { Menu, Zap, MoreVertical, Search, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

export default function ChatPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { messages, isLoading, sendMessage, clearHistory } = useChatState();
  const { user, isAuthenticated, logout } = useAuth();
  const { settings } = useSettings();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSendMessage = (content: string) => {
    sendMessage(content);
  };

  const handleClear = () => {
    if (confirm('Are you sure you want to terminate all neural logs?')) {
      clearHistory();
      toast.success('Neural logs terminated.');
    }
  };

  if (!isAuthenticated) return null;

  return (
    <div className="flex flex-col h-screen bg-background overflow-hidden safe-area-bottom">
      {/* Header */}
      <header className="sticky top-0 z-30 glass border-b border-white/10 px-4 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 active:scale-95 transition-all"
          >
            <Menu size={22} className="text-primary" />
          </button>
          <div>
            <h1 className="text-[17px] font-bold tracking-tight">Deku <span className="text-primary">AI</span></h1>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">Neural Link Active</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={handleClear}
            className="p-2.5 rounded-xl text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-all"
            title="Clear History"
          >
            <Trash2 size={20} />
          </button>
          <button className="p-2.5 rounded-xl text-muted-foreground hover:bg-white/5 transition-all">
            <Search size={20} />
          </button>
          <button className="p-2.5 rounded-xl text-muted-foreground hover:bg-white/5 transition-all">
            <MoreVertical size={20} />
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        user={user}
        onLogout={logout}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {/* Futuristic Background Element */}
        <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        
        <ChatWindow 
          messages={messages} 
          isLoading={isLoading} 
          autoScroll={settings.autoScroll}
        />
        
        <InputBar 
          onSend={handleSendMessage} 
          isLoading={isLoading} 
        />
      </main>
    </div>
  );
}
