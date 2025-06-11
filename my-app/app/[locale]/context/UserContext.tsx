'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User } from '../types/user';
// app/context/UserContext.tsx

const getInitialUser = (): User | null => {
  if (typeof window !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          return parsedUser;
        }
      } catch (error) {
        console.error('Lỗi khi parse user từ localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }
  return null;
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && typeof parsedUser === 'object') {
          setUser(parsedUser);
        }
      } catch (error) {
        console.error('Lỗi khi parse user từ localStorage:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser phải được sử dụng trong UserProvider');
  }
  return context;
};