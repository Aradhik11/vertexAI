import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import { api } from '../api/axios';

interface User {
  id: string;
  username: string;
  email: string;
  role: 'user' | 'admin';
  profileCompleted: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  checkAuth: () => void;
  clearError: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  loading: false,
  error: null,
  
  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      // Mocking API call for now
      // const response = await api.post('/auth/login', { email, password });
      const response = { 
        data: { 
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJ1c2VybmFtZSI6ImpvaG5kb2UiLCJlbWFpbCI6ImpvaG5AZXhhbXBsZS5jb20iLCJyb2xlIjoidXNlciIsInByb2ZpbGVDb21wbGV0ZWQiOmZhbHNlLCJpYXQiOjE2NTk1NTYxMjN9.aDVzpOYKGVJXS6xPwnI2WvdfM9b4G1KXBSYkZOv_lMk',
          user: {
            id: '1234567890',
            username: 'johndoe',
            email: 'john@example.com',
            role: 'user',
            profileCompleted: false,
          }
        }
      };
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        error: 'Invalid credentials. Please try again.',
        loading: false,
        isAuthenticated: false,
      });
    }
  },
  
  register: async (username, email, password) => {
    set({ loading: true, error: null });
    try {
      // Mocking API call for now
      // const response = await api.post('/auth/register', { username, email, password });
      const response = { 
        data: { 
          token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NjU0MzIxMCIsInVzZXJuYW1lIjoidXNlcm5hbWUiLCJlbWFpbCI6ImVtYWlsQGV4YW1wbGUuY29tIiwicm9sZSI6InVzZXIiLCJwcm9maWxlQ29tcGxldGVkIjpmYWxzZSwiaWF0IjoxNjU5NTU2MTIzfQ.5LdpT-X4E1J_nOWfBpPvGc3dgVNLgRhO9DLEcGA_QZ4',
          user: {
            id: '8765432109',
            username,
            email,
            role: 'user',
            profileCompleted: false,
          }
        }
      };
      
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user, isAuthenticated: true, loading: false });
    } catch (error) {
      set({
        error: 'Registration failed. Please try again.',
        loading: false,
        isAuthenticated: false,
      });
    }
  },
  
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
  },
  
  checkAuth: () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null, token: null });
      return;
    }
    
    try {
      // In a real app, you'd validate the token with the server
      // For demo purposes, we're just decoding the JWT
      const decoded = jwtDecode<User & { exp: number }>(token);
      
      // Check if token is expired
      const currentTime = Date.now() / 1000;
      if (decoded.exp && decoded.exp < currentTime) {
        localStorage.removeItem('token');
        set({ isAuthenticated: false, user: null, token: null });
        return;
      }
      
      set({
        isAuthenticated: true,
        user: {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
          profileCompleted: decoded.profileCompleted,
        },
        token,
      });
    } catch (error) {
      localStorage.removeItem('token');
      set({ isAuthenticated: false, user: null, token: null });
    }
  },
  
  clearError: () => set({ error: null }),
  
  updateUser: (userData) => {
    const currentUser = get().user;
    if (currentUser) {
      set({ user: { ...currentUser, ...userData } });
    }
  },
}));