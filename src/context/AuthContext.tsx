/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'react-toastify';
import { User, UserAccount } from '@/types';

interface AuthContextType {
  user: User | null;
  register: (name: string, email: string, pass: string) => boolean;
  login: (email: string, pass: string) => User | null;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize default admin
    const usersStr = localStorage.getItem('toy_users_db');
    let users: UserAccount[] = [];
    try {
      if (usersStr) users = JSON.parse(usersStr);
    } catch (e) {
      console.error('Failed to parse users db', e);
    }
    
    const defaultUsers: UserAccount[] = [
      { id: 'admin-001', name: 'Admin User', email: 'admin@toykingdom.com', password: 'admin123', role: 'admin' },
      { id: 'user-duy', name: 'Duy', email: 'duy@gmail.com', password: '123456', role: 'user' },
      { id: 'user-hung', name: 'Hung', email: 'katio@gmail.com', password: '123456', role: 'user' }
    ];

    let usersModified = false;
    defaultUsers.forEach(defUser => {
      const idx = users.findIndex(u => u.email === defUser.email);
      if (idx === -1) {
        users.push(defUser);
        usersModified = true;
      } else if (users[idx].password !== defUser.password) {
        users[idx].password = defUser.password;
        usersModified = true;
      }
    });

    if (usersModified) {
      localStorage.setItem('toy_users_db', JSON.stringify(users));
    }

    const savedUser = localStorage.getItem('toy_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
        document.cookie = `toy_session=${parsedUser.role}; path=/; max-age=86400;`;
      } catch (e) {
        console.error('Failed to parse user', e);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      if (user) {
        localStorage.setItem('toy_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('toy_user');
      }
    }
  }, [user, isInitialized]);

  const getUsersFromStorage = (): UserAccount[] => {
    if (typeof window !== 'undefined') {
      const usersStr = localStorage.getItem('toy_users_db');
      if (usersStr) {
        try {
          return JSON.parse(usersStr);
        } catch (e) {
          console.error('Failed to parse users db', e);
        }
      }
    }
    return [];
  };

  const register = (name: string, email: string, pass: string): boolean => {
    const users = getUsersFromStorage();
    
    // Kiểm tra email đã tồn tại chưa
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      toast.error('Email này đã được đăng ký!');
      return false;
    }

    // Tạo user mới
    const newUser: UserAccount = {
      id: Date.now().toString(),
      name,
      email,
      password: pass,
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('toy_users_db', JSON.stringify(users));
    return true;
  };

  const login = (email: string, pass: string): User | null => {
    const users = getUsersFromStorage();
    const matchedUser = users.find(u => u.email === email && u.password === pass);

    if (matchedUser) {
      // Chỉ lưu state User (không có password)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...safeUser } = matchedUser;
      setUser(safeUser);
      document.cookie = `toy_session=${safeUser.role}; path=/; max-age=86400;`;
      toast.success('Đăng nhập thành công!');
      return safeUser;
    }
    
    toast.error('Email hoặc mật khẩu không chính xác!');
    return null;
  };

  const logout = () => {
    setUser(null);
    document.cookie = "toy_session=; path=/; max-age=0;";
    toast.info('Đã đăng xuất');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;

    // Update session user
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem('toy_user', JSON.stringify(updatedUser));

    // Update in database
    const users = getUsersFromStorage();
    const userIndex = users.findIndex(u => u.id === user.id);
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...data };
      localStorage.setItem('toy_users_db', JSON.stringify(users));
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
