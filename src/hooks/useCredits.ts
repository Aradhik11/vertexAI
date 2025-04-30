import { useCallback } from 'react';
import { useCreditStore } from '../stores/creditStore';
import { useAuthStore } from '../stores/authStore';

interface UseCreditsReturn {
  addLoginCredit: () => void;
  addProfileCredit: () => void;
  addInteractionCredit: (description: string) => void;
  addAdminCredit: (amount: number, description: string) => void;
}

export const useCredits = (): UseCreditsReturn => {
  const { addCredits } = useCreditStore();
  const { user } = useAuthStore();
  
  // Check if user has already received login credit today
  const hasReceivedLoginCreditToday = useCallback(() => {
    const { getHistoryByType } = useCreditStore.getState();
    const loginHistory = getHistoryByType('login');
    
    if (loginHistory.length === 0) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    return loginHistory.some(credit => {
      const creditDate = new Date(credit.timestamp);
      creditDate.setHours(0, 0, 0, 0);
      return creditDate.getTime() === today.getTime();
    });
  }, []);
  
  const addLoginCredit = useCallback(() => {
    if (!user) return;
    
    if (!hasReceivedLoginCreditToday()) {
      addCredits(10, 'login', 'Daily login bonus');
    }
  }, [user, addCredits, hasReceivedLoginCreditToday]);
  
  const addProfileCredit = useCallback(() => {
    if (!user) return;
    
    addCredits(50, 'profile', 'Profile completed');
  }, [user, addCredits]);
  
  const addInteractionCredit = useCallback((description: string) => {
    if (!user) return;
    
    addCredits(5, 'interaction', description);
  }, [user, addCredits]);
  
  const addAdminCredit = useCallback((amount: number, description: string) => {
    if (!user || user.role !== 'admin') return;
    
    addCredits(amount, 'admin', description);
  }, [user, addCredits]);
  
  return {
    addLoginCredit,
    addProfileCredit,
    addInteractionCredit,
    addAdminCredit,
  };
};