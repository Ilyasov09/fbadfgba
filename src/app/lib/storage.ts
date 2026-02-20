export const storage = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(`deku_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Error reading from localStorage', error);
      return defaultValue;
    }
  },
  set: (key: string, value: unknown): void => {
    try {
      localStorage.setItem(`deku_${key}`, JSON.stringify(value));
    } catch (error) {
      console.error('Error writing to localStorage', error);
    }
  },
  remove: (key: string): void => {
    localStorage.removeItem(`deku_${key}`);
  },
  clear: (): void => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('deku_')) {
        localStorage.removeItem(key);
      }
    });
  }
};
