import { Product } from '@/types';
import { products as mockProducts } from '@/data/mock';

export const getProducts = (): Product[] => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('toy_products');
    if (stored) {
      try {
        let parsed = JSON.parse(stored);
        
        // Auto-migrate old picsum images to new ones
        let hasOldImage = false;
        parsed = parsed.map((p: Product) => {
          if (p.image && (p.image.includes('picsum.photos') || p.image.includes('loremflickr.com/600/600/toy?lock='))) {
            hasOldImage = true;
            const mockP = mockProducts.find(m => m.id === p.id);
            if (mockP) {
              return { ...p, image: mockP.image };
            }
          }
          return p;
        });
        
        if (hasOldImage) {
          localStorage.setItem('toy_products', JSON.stringify(parsed));
        }
        
        return parsed;
      } catch (e) {
        console.error('Failed to parse products from local storage', e);
      }
    } else {
      // Initialize with mock data
      localStorage.setItem('toy_products', JSON.stringify(mockProducts));
      return mockProducts;
    }
  }
  return mockProducts; // SSR fallback
};

export const saveProduct = (product: Product): void => {
  if (typeof window === 'undefined') return;
  const products = getProducts();
  const existingIndex = products.findIndex(p => p.id === product.id);
  
  if (existingIndex >= 0) {
    products[existingIndex] = product;
  } else {
    products.unshift(product); // Add new product to top
  }
  
  localStorage.setItem('toy_products', JSON.stringify(products));
};

export const deleteProduct = (id: string): void => {
  if (typeof window === 'undefined') return;
  const products = getProducts();
  const newProducts = products.filter(p => p.id !== id);
  localStorage.setItem('toy_products', JSON.stringify(newProducts));
};

export const updateInventoryAfterPurchase = (cartItems: { id: string, quantity: number }[]): void => {
  if (typeof window === 'undefined') return;
  const products = getProducts();
  
  cartItems.forEach(cartItem => {
    const productIndex = products.findIndex(p => p.id === cartItem.id);
    if (productIndex >= 0) {
      products[productIndex].sold = (products[productIndex].sold || 0) + cartItem.quantity;
      products[productIndex].stock = Math.max(0, (products[productIndex].stock || 0) - cartItem.quantity);
    }
  });
  
  localStorage.setItem('toy_products', JSON.stringify(products));
};

export const getStats = () => {
  if (typeof window === 'undefined') return { totalProducts: 0, totalUsers: 0, totalOrders: 0 };
  
  const products = getProducts();
  let totalUsers = 0;
  let totalOrders = 0;
  try {
    const usersStr = localStorage.getItem('toy_users_db');
    if (usersStr) {
      totalUsers = JSON.parse(usersStr).length;
    }
    const ordersStr = localStorage.getItem('toy_orders_db');
    if (ordersStr) {
      totalOrders = JSON.parse(ordersStr).length;
    }
  } catch {}
  
  return {
    totalProducts: products.length,
    totalUsers,
    totalOrders
  };
};
