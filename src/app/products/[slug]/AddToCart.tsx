"use client";

import { useState } from 'react';
import { Minus, Plus, ShoppingCart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { Product } from '@/types';

export default function AddToCart({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore((state) => state.addToCart);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <>
      <div className="flex items-center gap-6 mb-10">
        <span className="font-bold text-gray-900">Số lượng:</span>
        <div className="flex items-center border-2 border-gray-200 rounded-full bg-white h-12">
          <button 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-12 h-full flex justify-center items-center text-gray-500 hover:text-primary transition-colors"
          >
            <Minus size={20} />
          </button>
          <input 
            type="number" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1)))}
            className="w-14 text-center font-bold text-gray-900 outline-none bg-transparent"
          />
          <button 
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="w-12 h-full flex justify-center items-center text-gray-500 hover:text-primary transition-colors"
          >
            <Plus size={20} />
          </button>
        </div>
      </div>

      <button 
        onClick={handleAddToCart}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-full flex items-center justify-center gap-3 transition-all shadow-xl shadow-primary/20 hover:shadow-2xl hover:-translate-y-1 text-lg"
      >
        <ShoppingCart size={24} />
        Thêm vào giỏ hàng
      </button>
    </>
  );
}
