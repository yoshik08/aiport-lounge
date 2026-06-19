// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (u: User) => void;
  logout: () => void;
  isAuthOpen: boolean;
  authTab: 'signin' | 'signup';
  openAuth: (tab: 'signin' | 'signup') => void;
  closeAuth: () => void;
  isAdminOpen: boolean;
  openAdmin: () => void;
  closeAdmin: () => void;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authTab, setAuthTab] = useState<'signin' | 'signup'>('signin');
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('loggedIn') === 'true') {
      const stored = localStorage.getItem('currentUser');
      if (stored) {
        setUser(JSON.parse(stored));
      }
    }
  }, []);

  const login = (u: User) => {
    setUser(u);
    localStorage.setItem('currentUser', JSON.stringify(u));
    localStorage.setItem('loggedIn', 'true');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
    localStorage.setItem('loggedIn', 'false');
  };

  const openAuth = (tab: 'signin' | 'signup') => {
    setAuthTab(tab);
    setIsAuthOpen(true);
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, logout, 
      isAuthOpen, authTab, openAuth, closeAuth: () => setIsAuthOpen(false),
      isAdminOpen, openAdmin: () => setIsAdminOpen(true), closeAdmin: () => setIsAdminOpen(false)
    }}>
      {children}
    </AuthContext.Provider>
  );
};