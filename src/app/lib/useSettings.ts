import { useState, useEffect, useCallback } from 'react';
import { storage } from './storage';

export type AIMode = 'Normal' | 'Creative' | 'Coding';
export type AccentColor = 'Purple' | 'Cyan' | 'Magenta' | 'Emerald';

export interface AppSettings {
  theme: 'dark' | 'light';
  accentColor: AccentColor;
  fontSize: number;
  aiMode: AIMode;
  responseLength: number;
  typingSpeed: number;
  autoScroll: boolean;
  typingAnimation: boolean;
  enterToSend: boolean;
  animations: boolean;
  dataSaver: boolean;
}

const DEFAULT_SETTINGS: AppSettings = {
  theme: 'dark',
  accentColor: 'Purple',
  fontSize: 16,
  aiMode: 'Normal',
  responseLength: 500,
  typingSpeed: 30,
  autoScroll: true,
  typingAnimation: true,
  enterToSend: true,
  animations: true,
  dataSaver: false,
};

export function useSettings() {
  const [settings, setSettings] = useState<AppSettings>(() => storage.get('settings', DEFAULT_SETTINGS));

  const updateSettings = useCallback((newSettings: Partial<AppSettings>) => {
    setSettings(prev => {
      const updated = { ...prev, ...newSettings };
      storage.set('settings', updated);
      return updated;
    });
  }, []);

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    storage.set('settings', DEFAULT_SETTINGS);
  }, []);

  useEffect(() => {
    // Apply theme to body
    if (settings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [settings.theme]);

  return { settings, updateSettings, resetSettings };
}
