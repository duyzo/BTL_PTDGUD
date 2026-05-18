/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useContext, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { AuthContext } from '@/context/AuthContext';
import { LayoutDashboard, Package, LogOut, Users, ShoppingBag } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const authContext = useContext(AuthContext);
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && authContext) {
      if (!authContext.user || authContext.user.role !== 'admin') {
        router.replace('/');
      }
    }
  }, [mounted, authContext, router]);

  if (!mounted || !authContext?.user || authContext.user.role !== 'admin') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-[calc(100vh-130px)] bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="p-6">
          <h2 className="text-xl font-bold text-gray-800">Admin Panel</h2>
        </div>
        <nav className="px-4 space-y-2 flex-1">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname === '/admin' ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'}`}
          >
            <LayoutDashboard size={20} />
            Tổng quan
          </Link>
          <Link 
            href="/admin/products" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.startsWith('/admin/products') ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'}`}
          >
            <Package size={20} />
            Sản phẩm
          </Link>
          <Link 
            href="/admin/orders" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.startsWith('/admin/orders') ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'}`}
          >
            <ShoppingBag size={20} />
            Đơn hàng
          </Link>
          <Link 
            href="/admin/users" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${pathname.startsWith('/admin/users') ? 'bg-primary text-white font-bold' : 'text-gray-600 hover:bg-gray-100 hover:text-primary'}`}
          >
            <Users size={20} />
            Người dùng
          </Link>
        </nav>
        
        <div className="p-4 border-t border-gray-100 mt-auto">
          <button 
            onClick={() => {
              authContext.logout();
              router.push('/');
            }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 font-medium transition-colors"
          >
            <LogOut size={20} />
            Đăng xuất
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-8 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
