'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { donors, Donor } from '@/lib/data';

export type AccountType = 'donor' | 'ground-team' | 'admin';

export type AppState = {
  // Which account type we're viewing
  accountType: AccountType;
  setAccountType: (type: AccountType) => void;

  // Which user/member we're viewing as
  activeUserId: string;
  setActiveUserId: (id: string) => void;

  // Donor confirmation state
  donorStatuses: Record<string, Donor['status']>;
  confirmDonor: (donorId: string) => void;

  // Which view is active within each account type
  activeView: string;
  setActiveView: (view: string) => void;
};

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [accountType, setAccountType] = useState<AccountType>('donor');
  const [activeUserId, setActiveUserId] = useState('david-chen');
  const [activeView, setActiveView] = useState('home');

  // Initialize donor statuses from fixtures
  const [donorStatuses, setDonorStatuses] = useState<Record<string, Donor['status']>>(
    donors.reduce((acc, d) => ({ ...acc, [d.id]: d.status }), {})
  );

  const confirmDonor = (donorId: string) => {
    setDonorStatuses(prev => ({
      ...prev,
      [donorId]: 'confirmed',
    }));
    // After a moment, move to connected
    setTimeout(() => {
      setDonorStatuses(prev => ({
        ...prev,
        [donorId]: 'connected',
      }));
    }, 3000);
  };

  return (
    <AppContext.Provider value={{
      accountType,
      setAccountType,
      activeUserId,
      setActiveUserId,
      donorStatuses,
      confirmDonor,
      activeView,
      setActiveView,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
