"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { Filter, X, ChevronDown } from 'lucide-react';
import { categories } from '@/data/mock';
import { useQuery } from '@tanstack/react-query';
import { ProductCard } from '@/components/product/ProductCard';
import { Pagination } from '@/components/product/Pagination';
import { Product } from '@/types';

const ITEMS_PER_PAGE = 12;

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const categoryQuery = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const priceQuery = searchParams.get('price') || 'all';
  const ageQuery = searchParams.get('age') || 'all';
  const sortQuery = searchParams.get('sort') || 'default';
  const pageQuery = parseInt(searchParams.get('page') || '1', 10);

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const fetchProducts = async () => {
    const res = await fetch(`/api/products?category=${categoryQuery}&search=${searchQuery}`);
    if (!res.ok) throw new Error('Network error');
    const json = await res.json();
    return json.data as Product[];
  };

  const { data: productList = [], isLoading } = useQuery({
    queryKey: ['products', categoryQuery, searchQuery],
    queryFn: fetchProducts,
  });

  // Helper to update query params
  const updateQuery = (updates: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === 'all' || value === 'default' || value === '') {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // Reset page to 1 on any filter change (unless we are just changing page)
    if (!updates.page) {
      params.delete('page');
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  // Filter and Sort Logic (Client-side for price, age, sort)
  let filtered = [...productList];

  // (API has already filtered by category and search, but we keep this just in case or for consistency)
  if (categoryQuery !== 'all') {
    filtered = filtered.filter(p => p.category === categoryQuery);
  }

  if (searchQuery) {
    const lowerQ = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(lowerQ));
  }

  if (priceQuery !== 'all') {
    if (priceQuery === 'under300') filtered = filtered.filter(p => p.price < 300000);
    else if (priceQuery === '300to500') filtered = filtered.filter(p => p.price >= 300000 && p.price <= 500000);
    else if (priceQuery === 'over500') filtered = filtered.filter(p => p.price > 500000);
  }

  if (ageQuery !== 'all') {
    filtered = filtered.filter(p => p.ageRange === ageQuery);
  }

  if (sortQuery === 'price-asc') {
    filtered.sort((a, b) => (a.price - b.price) || (b.sold - a.sold));
  } else if (sortQuery === 'price-desc') {
    filtered.sort((a, b) => (b.price - a.price) || (b.sold - a.sold));
  } else if (sortQuery === 'best-seller') {
    filtered.sort((a, b) => (b.sold - a.sold) || (a.price - b.price));
  } else if (sortQuery === 'rating') {
    filtered.sort((a, b) => (b.rating - a.rating) || (b.sold - a.sold));
  } else if (sortQuery === 'name-asc') {
    filtered.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortQuery === 'name-desc') {
    filtered.sort((a, b) => b.name.localeCompare(a.name));
  }

  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const currentPage = Math.min(Math.max(1, pageQuery), Math.max(1, totalPages));

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filtered.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex items-center gap-2 mb-6">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium">Sản phẩm</span>
        </div>

        {/* Header Title & Sorting */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {searchQuery 
                ? `Tìm kiếm: "${searchQuery}"`
                : categoryQuery !== 'all' 
                  ? categories.find(c => c.id === categoryQuery)?.name
                  : 'Tất cả sản phẩm'
              }
            </h1>
            <p className="text-gray-500 text-sm">Hiển thị {startIndex + 1}-{Math.min(startIndex + ITEMS_PER_PAGE, totalItems)} trong tổng số {totalItems} sản phẩm</p>
          </div>

          <div className="flex gap-3">
            {/* Mobile Filter Button */}
            <button 
              className="md:hidden flex-1 flex items-center justify-center gap-2 bg-white border border-gray-200 py-2.5 rounded-xl font-semibold text-gray-700"
              onClick={() => setIsMobileFilterOpen(true)}
            >
              <Filter size={18} /> Lọc
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select 
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-2.5 pl-4 pr-10 rounded-xl font-semibold focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
                value={sortQuery}
                onChange={(e) => updateQuery({ sort: e.target.value })}
              >
                <option value="default">Sắp xếp: Mặc định</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="best-seller">Bán chạy nhất</option>
                <option value="rating">Đánh giá cao nhất</option>
                <option value="name-asc">Tên: A - Z</option>
                <option value="name-desc">Tên: Z - A</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out md:relative md:z-0 md:w-64 md:translate-x-0 md:bg-transparent md:shadow-none md:p-0 md:overflow-visible
            ${isMobileFilterOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="flex justify-between items-center md:hidden mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-xl font-bold">Bộ lọc sản phẩm</h2>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-gray-50 rounded-full text-gray-500"><X size={20} /></button>
            </div>

            <div className="space-y-8">
              {/* Danh mục */}
              <div className="bg-white md:p-5 md:rounded-2xl md:shadow-sm md:border md:border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">Danh mục</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => updateQuery({ category: 'all' })}
                      className={`text-left w-full py-1.5 transition-colors text-sm ${categoryQuery === 'all' ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                    >
                      Tất cả sản phẩm
                    </button>
                  </li>
                  {categories.map(cat => (
                    <li key={cat.id}>
                      <button
                        onClick={() => updateQuery({ category: cat.id })}
                        className={`text-left w-full py-1.5 transition-colors text-sm ${categoryQuery === cat.id ? 'text-primary font-bold' : 'text-gray-600 hover:text-primary'}`}
                      >
                        {cat.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lọc giá */}
              <div className="bg-white md:p-5 md:rounded-2xl md:shadow-sm md:border md:border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">Mức giá</h3>
                <div className="space-y-3">
                  {['all', 'under300', '300to500', 'over500'].map((val, idx) => {
                    const labels = ['Tất cả giá', 'Dưới 300.000đ', '300.000đ - 500.000đ', 'Trên 500.000đ'];
                    return (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input 
                            type="radio" 
                            name="price" 
                            checked={priceQuery === val} 
                            onChange={() => updateQuery({ price: val })} 
                            className="peer w-5 h-5 opacity-0 absolute" 
                          />
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${priceQuery === val ? 'border-primary' : 'border-gray-300 group-hover:border-primary/50'}`}>
                            {priceQuery === val && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                          </div>
                        </div>
                        <span className={`text-sm ${priceQuery === val ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{labels[idx]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Lọc độ tuổi */}
              <div className="bg-white md:p-5 md:rounded-2xl md:shadow-sm md:border md:border-gray-100">
                <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm tracking-wider">Độ tuổi</h3>
                <div className="space-y-3">
                  {['all', '3+', '6+', '8+', '12+'].map((val, idx) => {
                    const labels = ['Tất cả độ tuổi', 'Từ 3 tuổi', 'Từ 6 tuổi', 'Từ 8 tuổi', 'Từ 12 tuổi'];
                    return (
                      <label key={val} className="flex items-center gap-3 cursor-pointer group">
                        <div className="relative flex items-center">
                          <input 
                            type="radio" 
                            name="age" 
                            checked={ageQuery === val} 
                            onChange={() => updateQuery({ age: val })} 
                            className="peer w-5 h-5 opacity-0 absolute" 
                          />
                          <div className={`w-5 h-5 rounded border-2 transition-colors ${ageQuery === val ? 'border-primary bg-primary' : 'border-gray-300 group-hover:border-primary/50 bg-white'}`}>
                            {ageQuery === val && (
                              <svg className="w-4 h-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            )}
                          </div>
                        </div>
                        <span className={`text-sm ${ageQuery === val ? 'text-gray-900 font-medium' : 'text-gray-600'}`}>{labels[idx]}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

            </div>
          </aside>

          {/* Overlay for mobile sidebar */}
          {isMobileFilterOpen && (
            <div className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm transition-opacity" onClick={() => setIsMobileFilterOpen(false)}></div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : paginatedProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-16 text-center border border-gray-100 shadow-sm">
                <div className="text-6xl mb-6">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Không tìm thấy sản phẩm nào!</h3>
                <p className="text-gray-500 mb-8">Vui lòng thử lại với từ khóa hoặc bộ lọc khác.</p>
                <button 
                  onClick={() => router.push('/products')}
                  className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                  {paginatedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                
                {/* Pagination */}
                <Pagination 
                  currentPage={currentPage} 
                  totalPages={totalPages} 
                  onPageChange={(page) => updateQuery({ page: page.toString() })} 
                />
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div></div>}>
      <ProductsContent />
    </Suspense>
  );
}
