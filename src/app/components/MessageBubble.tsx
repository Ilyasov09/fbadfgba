import React from 'react';
import { motion } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface MessageBubbleProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function MessageBubble({ role, content, timestamp }: MessageBubbleProps) {
  const isAI = role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className={cn(
        "flex w-full mb-4 px-4",
        isAI ? "justify-start" : "justify-end"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] px-4 py-3 rounded-[24px]",
          isAI
            ? "glass text-foreground border-border rounded-bl-none"
            : "bg-primary text-white neon-glow rounded-br-none"
        )}
      >
        <p className="text-[15px] leading-relaxed break-words">{content}</p>
        <div className={cn(
          "text-[10px] mt-1 opacity-60",
          isAI ? "text-muted-foreground" : "text-white/70"
        )}>
          {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </motion.div>
  );
}
