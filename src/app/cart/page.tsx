"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';

export default function Cart() {
  const router = useRouter();
  const { cart, removeFromCart, updateQuantity, cartTotal, cartCount } = useCartStore();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <div className="flex justify-center mb-8 text-gray-200">
          <ShoppingBag size={120} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Giỏ hàng của bạn đang trống!</h2>
        <p className="text-gray-500 mb-10 text-lg">Hãy thêm vài món đồ chơi thú vị vào giỏ nhé.</p>
        <Link 
          href="/products" 
          className="inline-block bg-primary hover:bg-primary-dark text-white font-bold py-4 px-10 rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-1"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  const shippingFee = cartTotal >= 500000 ? 0 : 30000;
  const finalTotal = cartTotal + shippingFee;

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Giỏ hàng của bạn ({cartCount} sản phẩm)</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8">
                <ul className="divide-y divide-gray-100">
                  {cart.map(item => (
                    <li key={item.id} className="py-6 flex flex-col sm:flex-row items-center gap-6 first:pt-0 last:pb-0">
                      <Link href={`/products/${item.slug}`} className="shrink-0 relative w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-2xl border border-gray-100 overflow-hidden">
                        <Image 
                          src={item.image} 
                          alt={item.name} 
                          fill
                          className="object-cover hover:scale-105 transition-transform"
                        />
                      </Link>
                      
                      <div className="flex-1 text-center sm:text-left">
                        <div className="text-xs text-gray-400 mb-1 uppercase font-semibold tracking-wider">{item.brand}</div>
                        <Link href={`/products/${item.slug}`}>
                          <h3 className="font-bold text-gray-800 hover:text-primary mb-2 text-lg">{item.name}</h3>
                        </Link>
                        <p className="text-primary font-bold text-xl">{formatCurrency(item.price)}</p>
                      </div>

                      <div className="flex flex-col sm:items-end gap-4">
                        <div className="flex items-center border-2 border-gray-200 rounded-full bg-white h-10">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-full flex justify-center items-center text-gray-500 hover:text-primary transition-colors"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-10 text-center font-bold text-gray-900">
                            {item.quantity}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-full flex justify-center items-center text-gray-500 hover:text-primary transition-colors"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-6">
                          <div className="text-right font-bold text-gray-800 hidden sm:block">
                            {formatCurrency(item.price * item.quantity)}
                          </div>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 rounded-full"
                            title="Xóa khỏi giỏ"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Tóm tắt đơn hàng</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600">
                  <span>Tạm tính</span>
                  <span className="font-semibold text-gray-900">{formatCurrency(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Phí giao hàng</span>
                  <span className={`font-semibold ${shippingFee === 0 ? 'text-green-600' : 'text-gray-900'}`}>
                    {shippingFee === 0 ? 'Miễn phí' : formatCurrency(shippingFee)}
                  </span>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-gray-900 text-lg">Tổng cộng</span>
                  <span className="text-3xl font-extrabold text-primary">
                    {formatCurrency(finalTotal)}
                  </span>
                </div>
                {shippingFee > 0 && (
                  <div className="text-sm text-center text-orange-500 font-medium mt-4 bg-orange-50 py-2 px-4 rounded-xl">
                    Mua thêm {formatCurrency(500000 - cartTotal)} để được Miễn phí giao hàng!
                  </div>
                )}
              </div>

              <button 
                onClick={() => router.push('/checkout')}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 text-lg"
              >
                Tiến hành thanh toán
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
