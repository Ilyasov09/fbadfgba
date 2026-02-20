import { useState, useEffect, useCallback } from 'react';
import { storage } from './storage';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export function useChatState() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load from storage on mount
  useEffect(() => {
    const savedMessages = storage.get<Message[]>('messages', []);
    setMessages(savedMessages);
  }, []);

  // Save to storage on update
  useEffect(() => {
    if (messages.length > 0) {
      storage.set('messages', messages);
    }
  }, [messages]);

  const addMessage = useCallback((role: 'user' | 'assistant', content: string) => {
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      role,
      content,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    addMessage('user', content);
    setIsLoading(true);
    setError(null);

    try {
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Response logic
      const responses = [
        "Deku AI processing complete. How can I assist you further?",
        "Interesting perspective. Analyzing data streams...",
        "I've synchronized with the main frame. Your request is being handled.",
        "Accessing futuristic databases. Please wait...",
        "I'm here to help you navigate the neon-lit corridors of information.",
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      addMessage('assistant', randomResponse);
    } catch (err) {
      setError('Neural link failed. Please retry connection.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [addMessage]);

  const clearHistory = useCallback(() => {
    setMessages([]);
    storage.remove('messages');
  }, []);

  return { messages, isLoading, error, sendMessage, clearHistory };
}
