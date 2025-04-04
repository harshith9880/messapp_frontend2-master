"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// Define user types
export type UserRole = 'student' | 'admin';

export interface User {
  username: string;
  role: UserRole;
}

// Define users storage structure
export interface UserCredential {
  username: string;
  password: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  users: UserCredential[];
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  signup: (username: string, password: string, role: UserRole) => boolean;
  logout: () => void;
  deleteAccount: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Initial users for testing
const initialUsers: UserCredential[] = [
  { username: 'admin', password: 'admin123', role: 'admin' },
  { username: 'student', password: 'student123', role: 'student' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<UserCredential[]>(initialUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Load users from localStorage on initial load
  useEffect(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }

    // Check if user is already logged in
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const userInfo: User = {
        username: foundUser.username,
        role: foundUser.role,
      };
      setUser(userInfo);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(userInfo));
      return true;
    }
    return false;
  };

  const signup = (username: string, password: string, role: UserRole): boolean => {
    // Check if username already exists
    if (users.some((u) => u.username === username)) {
      return false;
    }

    const newUser: UserCredential = {
      username,
      password,
      role,
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Auto login after signup
    const userInfo: User = {
      username: newUser.username,
      role: newUser.role,
    };
    setUser(userInfo);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(userInfo));
    
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
    router.push('/login');
  };

  const deleteAccount = () => {
    if (!user) return;
    
    const updatedUsers = users.filter((u) => u.username !== user.username);
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Logout after deleting account
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users,
        isAuthenticated,
        login,
        signup,
        logout,
        deleteAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
