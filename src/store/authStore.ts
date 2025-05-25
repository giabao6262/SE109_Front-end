import { create } from 'zustand';
import { User } from '../types';
import { mockUsers } from '../mockData/users';

interface AuthState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  currentUser: null,
  isAuthenticated: false,
  isAdmin: false,
  
  login: async (username: string, password: string) => {
    // In a real app, this would be an API call to verify credentials
    // For this demo, we'll simulate authentication with mock data
    const user = mockUsers.find(u => u.username === username);
    
    if (user && password === 'password') { // Simple mock password check
      set({ 
        currentUser: user, 
        isAuthenticated: true,
        isAdmin: user.role === 'admin'
      });
      return true;
    }
    
    return false;
  },
  
  logout: () => {
    set({ 
      currentUser: null, 
      isAuthenticated: false,
      isAdmin: false
    });
  }
}));