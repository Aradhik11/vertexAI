import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CreditState {
  credits: number;
  history: Array<{
    id: string;
    amount: number;
    type: 'login' | 'profile' | 'interaction' | 'admin';
    description: string;
    timestamp: number;
  }>;
  addCredits: (amount: number, type: 'login' | 'profile' | 'interaction' | 'admin', description: string) => void;
  getHistoryByType: (type: 'login' | 'profile' | 'interaction' | 'admin') => Array<{
    id: string;
    amount: number;
    type: 'login' | 'profile' | 'interaction' | 'admin';
    description: string;
    timestamp: number;
  }>;
}

export const useCreditStore = create<CreditState>()(
  persist(
    (set, get) => ({
      credits: 100, // Starting credits
      history: [
        {
          id: '1',
          amount: 100,
          type: 'admin',
          description: 'Welcome bonus',
          timestamp: Date.now(),
        },
      ],
      
      addCredits: (amount, type, description) => {
        const id = Date.now().toString();
        set((state) => ({
          credits: state.credits + amount,
          history: [
            {
              id,
              amount,
              type,
              description,
              timestamp: Date.now()
            },
            ...state.history
          ]
        }));
      },
      
      getHistoryByType: (type) => {
        return get().history.filter(item => item.type === type);
      },
    }),
    {
      name: 'credit-storage',
    }
  )
);