import { storage } from './storage';

export interface User {
  username: string;
  avatar?: string;
}

export function useAuth() {
  const [user, setUser] = ((): [User | null, (u: User | null) => void] => {
    try {
      const savedUser = storage.get<User | null>('user', null);
      return [savedUser, (u: User | null) => {
        storage.set('user', u);
      }];
    } catch {
      return [null, () => {}];
    }
  })();

  const login = async (username: string, password: string): Promise<boolean> => {
    // Mock login logic
    if (username && password.length >= 6) {
      setUser({ username, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` });
      return true;
    }
    return false;
  };

  const register = async (username: string, password: string): Promise<boolean> => {
    // Mock registration logic
    if (username && password.length >= 6) {
      setUser({ username, avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}` });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    storage.remove('user');
  };

  return { user, login, register, logout, isAuthenticated: !!user };
}
