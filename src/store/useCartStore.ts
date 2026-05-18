import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem } from '@/types';
import { toast } from 'react-toastify';

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, amount: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const calculateDerived = (cart: CartItem[]) => {
  return {
    cartTotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
    cartCount: cart.reduce((count, item) => count + item.quantity, 0)
  };
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],
      cartTotal: 0,
      cartCount: 0,
      addToCart: (product, quantity = 1) => {
        const { cart } = get();
        const alreadyInCart = cart.some(item => item.id === product.id);
        
        let newCart;
        if (alreadyInCart) {
          toast.success(`Đã cập nhật số lượng ${product.name}`);
          newCart = cart.map(item => 
            item.id === product.id 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        } else {
          toast.success(`Đã thêm ${product.name} vào giỏ`);
          newCart = [...cart, { ...product, quantity }];
        }
        set({ cart: newCart, ...calculateDerived(newCart) });
      },
      removeFromCart: (productId) => {
        const newCart = get().cart.filter(item => item.id !== productId);
        set({ cart: newCart, ...calculateDerived(newCart) });
        toast.info('Đã xóa sản phẩm khỏi giỏ');
      },
      updateQuantity: (productId, amount) => {
        const newCart = get().cart.map(item => {
          if (item.id === productId) {
            const newQuantity = item.quantity + amount;
            return { ...item, quantity: newQuantity > 0 ? newQuantity : 1 };
          }
          return item;
        });
        set({ cart: newCart, ...calculateDerived(newCart) });
      },
      clearCart: () => set({ cart: [], cartTotal: 0, cartCount: 0 }),
    }),
    {
      name: 'toy_cart', // persist in localStorage
    }
  )
);
