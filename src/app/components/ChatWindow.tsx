import React, { useRef, useEffect } from 'react';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';
import { Message } from '../lib/useChatState';
import { motion, AnimatePresence } from 'motion/react';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
  autoScroll?: boolean;
}

export function ChatWindow({ messages, isLoading, autoScroll = true }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoScroll && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, autoScroll]);

  return (
    <div 
      ref={scrollRef}
      className="flex-1 overflow-y-auto px-2 pt-6 pb-4 flex flex-col scroll-smooth h-full"
    >
      <div className="flex flex-col items-center mb-10 mt-12 opacity-40">
        <div className="w-16 h-16 rounded-3xl bg-primary/20 flex items-center justify-center mb-4 neon-glow">
          <div className="w-8 h-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
        <h2 className="text-xl font-bold tracking-tight">Deku AI Sentinel</h2>
        <p className="text-[12px] uppercase tracking-widest mt-1">Ready for interaction</p>
      </div>

      <AnimatePresence mode="popLayout">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            role={message.role}
            content={message.content}
            timestamp={message.timestamp}
          />
        ))}
      </AnimatePresence>

      {isLoading && <TypingIndicator />}
      
      <div className="min-h-[20px]" />
    </div>
  );
}
