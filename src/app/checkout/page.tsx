"use client";

import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { useCartStore } from '@/store/useCartStore';
import { AuthContext } from '@/context/AuthContext';
import { formatCurrency } from '@/utils/formatCurrency';
import { updateInventoryAfterPurchase } from '@/utils/productStore';
import { saveOrder } from '@/utils/orderStore';

export default function Checkout() {
  const authContext = useContext(AuthContext);
  const { cart, cartTotal, clearCart } = useCartStore();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: authContext?.user ? authContext.user.name : '',
    phone: '',
    address: '',
    paymentMethod: 'cod'
  });

  const [showQRModal, setShowQRModal] = useState(false);

  if (cart.length === 0) {
    router.push('/cart');
    return null;
  }

  const shippingFee = cartTotal >= 500000 ? 0 : 30000;
  const finalTotal = cartTotal + shippingFee;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      toast.error('Vui lòng điền đầy đủ thông tin giao hàng!');
      return;
    }
    
    if (formData.paymentMethod === 'banking' && !showQRModal) {
      setShowQRModal(true);
      return;
    }
    
    handleCompleteOrder();
  };

  const handleCompleteOrder = () => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      userId: authContext?.user?.id || 'guest',
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      items: cart,
      totalAmount: finalTotal,
      status: 'pending' as const,
      createdAt: new Date().toISOString(),
      paymentMethod: formData.paymentMethod as 'cod' | 'banking',
    };
    saveOrder(newOrder);

    updateInventoryAfterPurchase(cart);
    toast.success('🎉 Đặt hàng thành công! Cảm ơn bạn đã mua sắm.');
    clearCart();
    router.push('/');
  };

  return (
    <>
      <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Thanh toán đơn hàng</h1>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Form Checkout */}
          <div className="lg:w-2/3">
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
              
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">1</span>
                Thông tin giao hàng
              </h2>
              
              {!authContext?.user && (
                <div className="mb-8 p-5 bg-blue-50/50 border border-blue-100 rounded-2xl text-sm flex items-center justify-between">
                  <div>
                    <span className="font-semibold text-gray-900">Bạn đã có tài khoản?</span> Đăng nhập để nhận ưu đãi và mua hàng nhanh hơn.
                  </div>
                  <Link href="/login" className="bg-white text-primary font-bold px-4 py-2 rounded-xl border border-blue-200 hover:bg-blue-50 transition-colors">Đăng nhập</Link>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nhập họ và tên" 
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Số điện thoại</label>
                  <input 
                    type="tel" 
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Nhập số điện thoại" 
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>
              </div>

              <div className="mb-10">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ giao hàng chi tiết</label>
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={3} 
                  placeholder="Nhập số nhà, tên đường, phường/xã, quận/huyện..." 
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                ></textarea>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm">2</span>
                Phương thức thanh toán
              </h2>

              <div className="space-y-4">
                <label className={`flex items-center gap-4 p-5 border-2 rounded-2xl cursor-pointer transition-all ${formData.paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                  <input 
                    type="radio" 
                    name="paymentMethod" 
                    value="cod"
                    checked={formData.paymentMethod === 'cod'}
                    onChange={handleChange}
                    className="w-5 h-5 accent-primary" 
                  />
                  <div>
                    <p className="font-bold text-gray-900">Thanh toán khi nhận hàng (COD)</p>
                    <p className="text-sm text-gray-500 mt-1">Thanh toán bằng tiền mặt khi giao hàng tận nơi.</p>
                  </div>
                </label>
                
                <div className={`border-2 rounded-2xl transition-all ${formData.paymentMethod === 'banking' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}`}>
                  <label className="flex items-center gap-4 p-5 cursor-pointer">
                    <input 
                      type="radio" 
                      name="paymentMethod" 
                      value="banking"
                      checked={formData.paymentMethod === 'banking'}
                      onChange={handleChange}
                      className="w-5 h-5 accent-primary" 
                    />
                    <div>
                      <p className="font-bold text-gray-900">Chuyển khoản qua mã QR</p>
                      <p className="text-sm text-gray-500 mt-1">Sử dụng ứng dụng ngân hàng hoặc Momo để quét mã.</p>
                    </div>
                  </label>
                </div>
              </div>

            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-28">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-100">Đơn hàng của bạn</h2>
              
              <div className="max-h-72 overflow-y-auto mb-6 pr-2 custom-scrollbar">
                <ul className="space-y-5">
                  {cart.map(item => (
                    <li key={item.id} className="flex gap-4">
                      <div className="relative w-16 h-16 shrink-0 bg-gray-50 rounded-xl border border-gray-100 overflow-hidden">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                        <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-semibold text-gray-800 line-clamp-2">{item.name}</h4>
                        <p className="text-primary font-bold text-sm mt-1">{formatCurrency(item.price)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4 mb-6 pt-6 border-t border-gray-100">
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
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-900 text-lg">Tổng cộng</span>
                  <span className="text-3xl font-extrabold text-primary">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-full shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 text-lg"
              >
                Xác nhận đặt hàng
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
      
      {/* QR Code Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative animate-in zoom-in-95 duration-200">
            <button 
              onClick={() => setShowQRModal(false)}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-900 transition-colors"
            >
              ×
            </button>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2 text-center">Thanh toán chuyển khoản</h3>
            <p className="text-gray-500 text-center mb-6">Mở ứng dụng ngân hàng và quét mã QR bên dưới</p>
            
            <div className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 flex flex-col items-center justify-center mb-6">
              <div className="bg-white p-3 rounded-2xl shadow-sm border border-gray-100 mb-4">
                <Image 
                  src={`https://img.vietqr.io/image/vietcombank-1040359727-compact.png?amount=${finalTotal}&addInfo=${encodeURIComponent('TOYKINGDOM ' + (formData.phone || ''))}&accountName=VO%20NGUYEN%20BAO%20DUY`} 
                  alt="Mã QR Thanh Toán" 
                  width={300} 
                  height={300} 
                  className="rounded-xl object-contain" 
                  unoptimized
                />
              </div>
              <p className="text-2xl font-bold text-primary mb-2">{formatCurrency(finalTotal)}</p>
              <div className="text-center w-full bg-white p-4 rounded-xl border border-blue-100/50 shadow-sm">
                <p className="text-sm text-gray-500 mb-1">Ngân hàng: <span className="font-bold text-gray-900">Vietcombank</span></p>
                <p className="text-sm text-gray-500 mb-1">Chủ tài khoản: <span className="font-bold text-gray-900">VO NGUYEN BAO DUY</span></p>
                <p className="text-sm text-gray-500 mb-1">Số tài khoản: <span className="font-bold text-gray-900">1040359727</span></p>
                <p className="text-sm text-gray-500">Nội dung: <span className="font-bold text-primary">TOYKINGDOM {formData.phone || ''}</span></p>
              </div>
            </div>
            
            <button 
              onClick={handleCompleteOrder}
              className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 text-lg"
            >
              Tôi đã chuyển khoản thành công
            </button>
          </div>
        </div>
      )}
    </>
  );
}
