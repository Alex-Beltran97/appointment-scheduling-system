import { create } from 'zustand';
import { login, logout, loginVerify } from '../service/authService';

type AuthState = {
  idUser: string | number;
  isAuthenticated: boolean;
  loading: boolean;
  role: string | null;
  checkSession: () => Promise<void>;
  login: (credentials: {username: string, password: string}) => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>(set => ({
  idUser: 0,
  isAuthenticated: false,
  role: null,
  loading: true,
  checkSession: async () => {
    try {
      set({ loading: true });
      const {data} = await loginVerify();
      set({ isAuthenticated: data?.user, role: data?.user?.userRole, loading: false, idUser: data?.user?.id || null });
    } catch (error) {
      set({ isAuthenticated: false, role: null, loading: false });
      console.error('Session check failed:', error);
      throw error;
    }
  },
  login: async ({username, password}) => {
    try {
      await login({username, password});
      const {data} = await loginVerify();
      set({ isAuthenticated: true, role: data?.user?.userRole, loading: false });
    } catch (error) {
      set({ isAuthenticated: false, role: null, loading: false });
      console.error('Login failed:', error);
      throw error;
    }
  },
  logout: async () => {
    try {
      sessionStorage.removeItem('nit-code');
      await logout();
      set({ isAuthenticated: false, role: null, loading: false });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  },
}));