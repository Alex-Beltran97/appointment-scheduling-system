import { create } from 'zustand';
import { login, logout, loginVerify } from '../service/authService';

type AuthState = {
  isAuthenticated: boolean;
  loading: boolean;
  checkSession: () => Promise<void>;
  login: (credentials: {username: string, password: string}) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  isAuthenticated: false,
  loading: false,
  checkSession: async () => {
    try {
      set({ loading: true });
      const response = await loginVerify();
      set({ isAuthenticated: response.data.isAuthenticated, loading: false });
    } catch (error) {
      set({ isAuthenticated: false, loading: false });
      console.error('Session check failed:', error);
      throw error;
    }
  },
  login: async ({username, password}) => {
    try {
      await login({username, password});
      set({ isAuthenticated: true, loading: false });
    } catch (error) {
      set({ isAuthenticated: false, loading: false });
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      await logout();
      set({ isAuthenticated: false, loading: false });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
}));