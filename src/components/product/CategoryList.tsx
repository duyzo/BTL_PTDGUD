import React from 'react';
import Link from 'next/link';
import { categories } from '@/data/mock';
import * as Icons from 'lucide-react';

export const CategoryList = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Danh mục nổi bật</h2>
          <p className="text-gray-500">Khám phá thế giới đồ chơi đa dạng và phong phú</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {categories.map((category) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const IconComponent = (Icons as any)[category.icon || 'Box'];
            return (
              <Link 
                key={category.id} 
                href={`/products?category=${category.id}`}
                className="bg-gray-50 rounded-2xl p-5 text-center border border-gray-100 hover:shadow-md hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="w-14 h-14 mx-auto bg-white rounded-full flex items-center justify-center mb-3 shadow-sm group-hover:scale-110 transition-transform text-primary">
                  {IconComponent && <IconComponent size={28} />}
                </div>
                <h3 className="text-sm font-semibold text-gray-700 group-hover:text-primary transition-colors">
                  {category.name}
                </h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
};
