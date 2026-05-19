"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { Product } from '@/types';

export const ProductCard = ({ product }: { product: Product }) => {
  const addToCart = useCartStore((state) => state.addToCart);
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group flex flex-col h-full">
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden bg-gray-50 flex-shrink-0 flex items-center justify-center">
        <Link href={`/products/${product.slug}`} className="absolute inset-0">
          <Image 
            src={imgSrc} 
            alt={product.name} 
            fill
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => {
              setImgSrc(`https://placehold.co/600x600/f8fafc/94a3b8?text=${encodeURIComponent(product.category.toUpperCase())}`);
            }}
          />
        </Link>
        {/* Discount Badge */}
        {(product.discount ?? 0) > 0 && (
          <div className="absolute top-3 left-3 bg-primary text-white text-xs font-bold px-2.5 py-1.5 rounded-lg shadow-sm">
            Giảm {product.discount}%
          </div>
        )}
        {/* Age Badge */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold px-2 py-1 rounded-lg shadow-sm">
          {product.ageRange}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="text-xs text-gray-400 mb-1.5 uppercase tracking-wider font-semibold">
          {product.brand}
        </div>
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-bold text-gray-800 line-clamp-2 min-h-[3rem] group-hover:text-primary transition-colors text-sm sm:text-base leading-relaxed">
            {product.name}
          </h3>
        </Link>

        {/* Rating & Sold */}
        <div className="flex items-center gap-3 mt-2.5">
          <div className="flex items-center gap-1 bg-secondary/10 px-1.5 py-0.5 rounded text-xs">
            <Star size={12} className="fill-secondary text-secondary" />
            <span className="font-semibold text-secondary-dark">{product.rating}</span>
          </div>
          <span className="text-xs text-gray-500 font-medium">Đã bán {product.sold}</span>
        </div>

        {/* Spacer to push price to bottom */}
        <div className="flex-grow"></div>

        {/* Price & Action */}
        <div className="mt-5 flex items-end justify-between">
          <div>
            <p className="text-primary font-bold text-lg sm:text-xl">{formatCurrency(product.price)}</p>
            {product.oldPrice && product.oldPrice > product.price && (
              <p className="text-xs text-gray-400 line-through mt-0.5">{formatCurrency(product.oldPrice)}</p>
            )}
          </div>
          <button 
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm"
            title="Thêm vào giỏ hàng"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shopping-cart"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
};
