import { Order } from '@/types';

// Mock some initial orders
const mockOrders: Order[] = [
  {
    id: 'ORD-1715000000',
    userId: 'mock-user-id',
    customerName: 'Nguyễn Văn A',
    customerPhone: '0901234567',
    customerAddress: '123 Đường Lê Lợi, Quận 1, TP.HCM',
    items: [
      {
        id: 'lego-001',
        name: 'LEGO City Trạm Cảnh Sát',
        slug: 'lego-city-police-station',
        category: 'lego',
        price: 1599000,
        ageRange: '6+',
        brand: 'LEGO',
        image: 'https://images.unsplash.com/photo-1595429035839-c99c298ffdde?w=600&q=80',
        description: '',
        rating: 5,
        sold: 0,
        stock: 10,
        quantity: 1
      }
    ],
    totalAmount: 1599000,
    status: 'pending',
    createdAt: new Date().toISOString(),
    paymentMethod: 'cod'
  }
];

export const getOrders = (): Order[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('toy_orders_db');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        console.error('Failed to parse orders from local storage', e);
      }
    } else {
      localStorage.setItem('toy_orders_db', JSON.stringify(mockOrders));
      return mockOrders;
    }
  }
  return mockOrders; // SSR fallback
};

export const saveOrder = (order: Order): void => {
  if (typeof window === 'undefined') return;
  const orders = getOrders();
  const existingIndex = orders.findIndex(o => o.id === order.id);
  
  if (existingIndex >= 0) {
    orders[existingIndex] = order;
  } else {
    orders.unshift(order);
  }
  
  localStorage.setItem('toy_orders_db', JSON.stringify(orders));
};

export const deleteOrder = (id: string): void => {
  if (typeof window === 'undefined') return;
  const orders = getOrders();
  const newOrders = orders.filter(o => o.id !== id);
  localStorage.setItem('toy_orders_db', JSON.stringify(newOrders));
};
