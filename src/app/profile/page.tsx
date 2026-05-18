/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Camera, User as UserIcon, MapPin, Phone, Mail, UserRound } from 'lucide-react';
import Image from 'next/image';

export default function Profile() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatar, setAvatar] = useState('');

  useEffect(() => {
    if (authContext?.user) {
      setName(authContext.user.name);
      setEmail(authContext.user.email);
      setPhone(authContext.user.phone || '');
      setAddress(authContext.user.address || '');
      setAvatar(authContext.user.avatar || '');
    } else if (authContext?.user === null) {
      // Nếu không có user, đá về trang đăng nhập
      router.push('/login');
    }
  }, [authContext?.user, router]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (< 2MB)
      if (file.size > 2 * 1024 * 1024) {
        toast.error('Kích thước ảnh tối đa là 2MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Họ tên không được để trống');
      return;
    }

    authContext?.updateProfile({
      name,
      phone,
      address,
      avatar
    });

    toast.success('Cập nhật hồ sơ thành công!');
  };

  if (!authContext?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">Hồ Sơ Của Tôi</h1>
        
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-3xl overflow-hidden border border-slate-100">
          <div className="bg-primary/5 px-8 py-6 border-b border-slate-100">
            <p className="text-slate-600 font-medium">Quản lý thông tin hồ sơ để bảo mật tài khoản và nhận ưu đãi tốt hơn.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="p-8">
            <div className="flex flex-col md:flex-row gap-12">
              
              {/* Form Info */}
              <div className="flex-1 space-y-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <UserRound size={18} className="text-primary" /> Họ và tên
                  </label>
                  <input 
                    type="text" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Mail size={18} className="text-primary" /> Email
                  </label>
                  <input 
                    type="email" 
                    value={email}
                    disabled
                    className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed"
                  />
                  <p className="text-xs text-slate-400 mt-1">Email không thể thay đổi</p>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <Phone size={18} className="text-primary" /> Số điện thoại
                  </label>
                  <input 
                    type="tel" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm font-bold text-slate-700 mb-2">
                    <MapPin size={18} className="text-primary" /> Địa chỉ giao hàng
                  </label>
                  <textarea 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ nhận hàng"
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                  ></textarea>
                </div>
              </div>

              {/* Avatar Upload */}
              <div className="w-full md:w-64 flex flex-col items-center justify-start md:border-l border-slate-100 md:pl-12 pt-4">
                <div className="relative group">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center relative">
                    {avatar ? (
                      <Image src={avatar} alt="Avatar" fill className="object-cover" />
                    ) : (
                      <UserIcon size={48} className="text-slate-300" />
                    )}
                  </div>
                  
                  <label className="absolute bottom-0 right-0 w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-md hover:scale-110 transition-transform">
                    <Camera size={18} />
                    <input 
                      type="file" 
                      accept="image/png, image/jpeg, image/jpg" 
                      className="hidden" 
                      onChange={handleAvatarChange}
                    />
                  </label>
                </div>
                
                <p className="text-sm text-slate-500 mt-6 text-center">
                  Dụng lượng file tối đa 2MB<br/>
                  Định dạng: JPEG, PNG
                </p>
              </div>

            </div>

            <div className="mt-10 pt-6 border-t border-slate-100 flex justify-end">
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-0.5"
              >
                Lưu Thay Đổi
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
