import { UserAccount } from '@/types';

const mockUsers: UserAccount[] = [
  {
    id: 'user-admin-1',
    name: 'Admin User',
    email: 'admin@toykingdom.com',
    role: 'admin',
    password: 'password123',
    phone: '0909999999',
    address: 'Quận 1, TP.HCM'
  },
  {
    id: 'user-customer-1',
    name: 'Nguyễn Văn Khách',
    email: 'customer@test.com',
    role: 'user',
    password: 'password123',
    phone: '0908888888',
    address: 'Quận 3, TP.HCM'
  }
];

export const getUsers = (): UserAccount[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('toy_users_db');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse users from local storage', e);
      }
    } else {
      localStorage.setItem('toy_users_db', JSON.stringify(mockUsers));
      return mockUsers;
    }
  }
  return mockUsers; // SSR fallback
};

export const saveUser = (user: UserAccount): void => {
  if (typeof window === 'undefined') return;
  const users = getUsers();
  const existingIndex = users.findIndex(u => u.id === user.id);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.unshift(user);
  }
  
  localStorage.setItem('toy_users_db', JSON.stringify(users));
};

export const deleteUser = (id: string): void => {
  if (typeof window === 'undefined') return;
  const users = getUsers();
  // Don't allow deleting the main admin
  if (id === 'user-admin-1') return;
  const newUsers = users.filter(u => u.id !== id);
  localStorage.setItem('toy_users_db', JSON.stringify(newUsers));
};
