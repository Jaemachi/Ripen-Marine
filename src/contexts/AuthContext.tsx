import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, otp?: string) => Promise<{ requiresOtp: boolean }>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data
const mockUsers: Record<string, { password: string; user: User }> = {
  'admin@maritime.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@maritime.com',
      role: 'admin',
      name: 'John Administrator',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?w=150&h=150&fit=crop&crop=face'
    }
  },
  'manager@maritime.com': {
    password: 'manager123',
    user: {
      id: '2',
      email: 'manager@maritime.com',
      role: 'it-manager',
      name: 'Sarah IT Manager',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=150&h=150&fit=crop&crop=face'
    }
  },
  'dept@maritime.com': {
    password: 'dept123',
    user: {
      id: '3',
      email: 'dept@maritime.com',
      role: 'department-manager',
      name: 'Mike Department Head',
      avatar: 'https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?w=150&h=150&fit=crop&crop=face'
    }
  },
  'employee@maritime.com': {
    password: 'emp123',
    user: {
      id: '4',
      email: 'employee@maritime.com',
      role: 'employee',
      name: 'Lisa Employee',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face'
    }
  },
  'vendor@maritime.com': {
    password: 'vendor123',
    user: {
      id: '5',
      email: 'vendor@maritime.com',
      role: 'vendor',
      name: 'Tom Vendor',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=150&h=150&fit=crop&crop=face'
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('maritime-user');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string, otp?: string) => {
    const userData = mockUsers[email];
    
    if (!userData || userData.password !== password) {
      throw new Error('Invalid credentials');
    }

    // Simulate OTP requirement
    if (!otp) {
      return { requiresOtp: true };
    }

    if (otp !== '123456') {
      throw new Error('Invalid OTP');
    }

    const loggedUser = { ...userData.user, lastLogin: new Date().toISOString() };
    setUser(loggedUser);
    localStorage.setItem('maritime-user', JSON.stringify(loggedUser));
    
    return { requiresOtp: false };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('maritime-user');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated: !!user,
      loading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}