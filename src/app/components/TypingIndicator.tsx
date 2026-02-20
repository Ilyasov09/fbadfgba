import React from 'react';
import { motion } from 'motion/react';

export function TypingIndicator() {
  return (
    <div className="flex justify-start w-full mb-4 px-4">
      <div className="glass px-4 py-3 rounded-[24px] rounded-bl-none flex items-center gap-1">
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0 }}
          className="w-1.5 h-1.5 rounded-full bg-primary"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }}
          className="w-1.5 h-1.5 rounded-full bg-primary"
        />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }}
          className="w-1.5 h-1.5 rounded-full bg-primary"
        />
      </div>
    </div>
  );
}
