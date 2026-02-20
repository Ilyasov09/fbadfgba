import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Mic, MoreVertical } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface InputBarProps {
  onSend: (message: string) => void;
  isLoading: boolean;
  disabled?: boolean;
}

export function InputBar({ onSend, isLoading, disabled }: InputBarProps) {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    if (message.trim() && !isLoading && !disabled) {
      onSend(message.trim());
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [message]);

  return (
    <div className="sticky bottom-0 left-0 right-0 p-4 pt-2 glass border-t border-white/10 z-30">
      <div className="flex items-end gap-2 bg-white/5 border border-white/10 rounded-[28px] p-1.5 pr-2 focus-within:border-primary/50 transition-colors">
        <button 
          className="p-2 rounded-full text-muted-foreground hover:text-foreground transition-colors"
          type="button"
        >
          <MoreVertical size={20} />
        </button>
        
        <textarea
          ref={textareaRef}
          rows={1}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Deku is listening..."
          className="flex-1 bg-transparent border-none focus:ring-0 text-[16px] text-foreground py-2.5 px-2 resize-none max-h-[120px]"
          disabled={isLoading || disabled}
        />

        <div className="flex items-center gap-1 mb-0.5">
          <AnimatePresence>
            {!message.trim() && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-1"
              >
                <button 
                  className="p-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  type="button"
                >
                  <Mic size={20} />
                </button>
                <button 
                  className="p-2.5 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                  type="button"
                >
                  <Image size={20} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading || disabled}
            className={`p-2.5 rounded-full transition-all duration-300 ${
              message.trim() && !isLoading && !disabled
                ? 'bg-primary text-white shadow-lg neon-glow'
                : 'bg-white/10 text-white/30 cursor-not-allowed'
            }`}
          >
            <Send size={20} className={isLoading ? 'animate-pulse' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
}
