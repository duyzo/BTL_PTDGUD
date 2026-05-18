"use client";

import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { AuthContext } from '@/context/AuthContext';
import { Rocket } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });
  const authContext = useContext(AuthContext);
  const router = useRouter();

  const onSubmit = (data: LoginFormInputs) => {
    const loggedInUser = authContext?.login(data.email, data.password);
    if (loggedInUser) {
      if (loggedInUser.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 relative overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="max-w-md w-full bg-white p-8 md:p-10 rounded-[2rem] shadow-xl shadow-slate-200/50 border border-slate-100 relative z-10">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <Rocket size={32} />
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Đăng nhập</h2>
          <p className="text-slate-500">Chào mừng bạn quay lại với ToyKingdom</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
            <input 
              type="email" 
              {...register('email')}
              className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium`}
              placeholder="example@gmail.com"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700">Mật khẩu</label>
              <Link href="#" className="text-sm font-semibold text-primary hover:underline">Quên mật khẩu?</Link>
            </div>
            <input 
              type="password" 
              {...register('password')}
              className={`w-full px-5 py-3.5 bg-slate-50 border ${errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:border-primary focus:ring-primary/20'} rounded-2xl focus:outline-none focus:ring-2 transition-all font-medium`}
              placeholder="••••••••"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-4 rounded-2xl shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 mt-4"
          >
            Đăng nhập
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm font-medium text-slate-600">
          Chưa có tài khoản?{' '}
          <Link href="/register" className="font-bold text-primary hover:underline">
            Đăng ký ngay
          </Link>
        </p>
      </div>
    </div>
  );
}
