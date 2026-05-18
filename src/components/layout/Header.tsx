/* eslint-disable @next/next/no-img-element, react-hooks/set-state-in-effect */
"use client";

import React, { useContext, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, User, Menu, X, Rocket } from 'lucide-react';
import { AuthContext } from '@/context/AuthContext';
import { useCartStore } from '@/store/useCartStore';

const Header = () => {
  const authContext = useContext(AuthContext);
  const cartCount = useCartStore((state) => state.cartCount);
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      router.push('/products');
    }
    setSearchTerm(''); // Clear search input
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary text-white py-1.5 text-sm font-medium text-center">
        Miễn phí giao hàng cho đơn từ 500k! 🚀
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary group">
            <div className="bg-primary text-white p-2 rounded-xl group-hover:bg-primary-dark transition-colors">
              <Rocket size={24} />
            </div>
            <span className="hidden sm:block">ToyKingdom</span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden lg:flex flex-1 max-w-xl relative mx-4">
            <input 
              type="text" 
              placeholder="Tìm kiếm đồ chơi..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-5 pr-12 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-primary text-white rounded-full hover:bg-primary-dark transition-colors">
              <Search size={18} />
            </button>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-5 md:gap-6">
            {/* User */}
            <div className="hidden md:flex items-center">
              {mounted ? (
                authContext?.user ? (
                  <div className="relative group">
                    <div className="flex items-center gap-2 bg-gray-50 pl-2 pr-4 py-1.5 rounded-full border border-gray-100 cursor-pointer hover:bg-gray-100 transition-colors">
                      <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center bg-primary/10 text-primary border border-gray-200">
                        {authContext.user.avatar ? (
                          <img src={authContext.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                          <User size={18} />
                        )}
                      </div>
                      <span className="font-bold text-sm text-gray-800">{authContext.user.name}</span>
                    </div>
                    
                    {/* Dropdown menu */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all transform origin-top-right z-50">
                      <div className="p-4 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800 truncate">{authContext.user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{authContext.user.email}</p>
                      </div>
                      <div className="p-2">
                        <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-primary rounded-xl transition-colors">
                          <User size={16} /> Chỉnh sửa hồ sơ
                        </Link>
                        {authContext.user.role === 'admin' && (
                          <Link href="/admin" className="flex items-center gap-2 px-3 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors mt-1">
                            <Rocket size={16} /> Admin Dashboard
                          </Link>
                        )}
                        <button onClick={authContext.logout} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-1">
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <Link 
                      href="/login" 
                      className="px-5 py-2.5 text-sm font-bold text-primary border-2 border-primary rounded-full hover:bg-primary/5 transition-all hover:scale-105"
                    >
                      Đăng nhập
                    </Link>
                    <Link 
                      href="/register" 
                      className="px-5 py-2.5 text-sm font-bold text-white bg-primary border-2 border-primary rounded-full hover:bg-primary-dark transition-all shadow-sm hover:shadow-md hover:scale-105"
                    >
                      Đăng ký
                    </Link>
                  </div>
                )
              ) : (
                <div className="w-48 h-10 bg-gray-100 animate-pulse rounded-full"></div>
              )}
            </div>

            {/* Cart */}
            <Link href="/cart" className="flex items-center gap-2 group">
              <div className="relative w-11 h-11 bg-gray-50 rounded-full flex items-center justify-center text-gray-600 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
                <ShoppingCart size={22} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-secondary text-secondary-dark text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden p-2 text-gray-600 bg-gray-50 rounded-full"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Search & Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <form onSubmit={handleSearch} className="relative mb-4">
              <input 
                type="text" 
                placeholder="Tìm kiếm..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-primary"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                <Search size={20} />
              </button>
            </form>
            <nav className="flex flex-col gap-2">
              <Link href="/products" className="font-medium text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-colors">Tất cả sản phẩm</Link>
              <Link href="/products?category=lego" className="font-medium text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-colors">LEGO</Link>
              <Link href="/products?category=doll" className="font-medium text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-colors">Búp bê</Link>
              
              <div className="h-px bg-gray-100 my-2"></div>
              
              {mounted && authContext?.user ? (
                <>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex items-center justify-center text-primary border border-gray-200">
                      {authContext.user.avatar ? (
                        <img src={authContext.user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{authContext.user.name}</p>
                      <p className="text-xs text-gray-500">{authContext.user.email}</p>
                    </div>
                  </div>
                  <Link href="/profile" className="font-medium text-gray-700 hover:text-primary hover:bg-gray-50 px-4 py-2.5 rounded-xl transition-colors">Chỉnh sửa hồ sơ</Link>
                  {authContext.user.role === 'admin' && (
                    <Link href="/admin" className="font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2.5 rounded-xl transition-colors">Admin Dashboard</Link>
                  )}
                  <button onClick={authContext.logout} className="text-left font-medium text-red-500 hover:bg-red-50 px-4 py-2.5 rounded-xl transition-colors">Đăng xuất</button>
                </>
              ) : (
                <div className="flex gap-3 px-2 pt-2">
                  <Link href="/login" className="flex-1 text-center font-bold text-primary border-2 border-primary hover:bg-primary/5 py-2.5 rounded-full transition-colors">Đăng nhập</Link>
                  <Link href="/register" className="flex-1 text-center font-bold text-white bg-primary border-2 border-primary hover:bg-primary-dark py-2.5 rounded-full transition-colors">Đăng ký</Link>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Navigation - Desktop */}
      <nav className="hidden md:block bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-8 py-3.5">
            <li><Link href="/products" className="font-semibold text-gray-600 hover:text-primary transition-colors">Tất cả sản phẩm</Link></li>
            <li><Link href="/products?category=lego" className="font-semibold text-gray-600 hover:text-primary transition-colors">LEGO</Link></li>
            <li><Link href="/products?category=doll" className="font-semibold text-gray-600 hover:text-primary transition-colors">Búp bê</Link></li>
            <li><Link href="/products?category=vehicle" className="font-semibold text-gray-600 hover:text-primary transition-colors">Xe đồ chơi</Link></li>
            <li><Link href="/products?category=boardgame" className="font-semibold text-gray-600 hover:text-primary transition-colors">Board Game</Link></li>
            <li><Link href="/products?category=education" className="font-semibold text-gray-600 hover:text-primary transition-colors">Đồ chơi giáo dục</Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
