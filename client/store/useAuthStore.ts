import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      setAuth: (user) => set({ 
        user, 
        isAuthenticated: true 
      }),

      logout: () => {
        set({ user: null, isAuthenticated: false });
        // LocalStorage saaf karne ke liye
        localStorage.removeItem('auth-storage');
      },
    }),
    {
      name: 'auth-storage', // Browser ke local storage mein is naam se save hoga
    }
  )
);