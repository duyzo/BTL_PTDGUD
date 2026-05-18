"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Product } from '@/types';

export default function ProductImage({ product }: { product: Product }) {
  const [imgSrc, setImgSrc] = useState(product.image);

  return (
    <div className="aspect-square rounded-2xl overflow-hidden bg-gray-50 relative border border-gray-100">
      <Image 
        src={imgSrc} 
        alt={product.name} 
        fill
        className="object-cover hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 1024px) 100vw, 50vw"
        priority
        onError={() => {
          setImgSrc(`https://placehold.co/600x600/f8fafc/94a3b8?text=${encodeURIComponent(product.category.toUpperCase())}`);
        }}
      />
      {(product.discount ?? 0) > 0 && (
        <div className="absolute top-6 left-6 bg-primary text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg">
          Giảm {product.discount}%
        </div>
      )}
    </div>
  );
}
