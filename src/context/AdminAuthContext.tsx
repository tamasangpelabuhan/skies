'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { subscribeAuth, loginWithFirebase, logoutWithFirebase } from '../lib/firebase';

interface AdminUser {
  email: string;
  name: string;
  role: 'superadmin' | 'admin';
  uid?: string;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AdminUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeAuth((firebaseUser) => {
      if (firebaseUser && firebaseUser.email) {
        setIsAuthenticated(true);
        setUser({
          email: firebaseUser.email,
          name: firebaseUser.displayName || 'Administrator',
          role: 'superadmin',
          uid: firebaseUser.uid,
        });
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
      setIsLoading(false);
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = async (email: string, pass: string): Promise<{ success: boolean; error?: string }> => {
    try {
      const firebaseUser = await loginWithFirebase(email.trim(), pass.trim());
      const adminData: AdminUser = {
        email: firebaseUser.email || email.trim(),
        name: firebaseUser.displayName || 'Administrator',
        role: 'superadmin',
        uid: firebaseUser.uid,
      };
      setIsAuthenticated(true);
      setUser(adminData);
      return { success: true };
    } catch (err: unknown) {
      const code = (err as { code?: string }).code || '';
      let message = 'Email atau password tidak sesuai.';
      if (code === 'auth/user-not-found' || code === 'auth/wrong-password' || code === 'auth/invalid-credential') {
        message = 'Kredensial tidak valid. Silakan periksa email dan password.';
      } else if (code === 'auth/too-many-requests') {
        message = 'Terlalu banyak percobaan gagal. Akses dibatasi sementara demi keamanan.';
      } else if (code === 'auth/network-request-failed') {
        message = 'Koneksi gagal. Periksa jaringan internet Anda.';
      }
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      await logoutWithFirebase();
    } catch (err) {
      console.error('Logout error:', err);
    }
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};
