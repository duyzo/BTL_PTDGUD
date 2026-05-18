import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Truck, RotateCcw, Star, Package } from 'lucide-react';
import { getProducts } from '@/utils/productStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { ProductCard } from '@/components/product/ProductCard';
import ProductImage from './ProductImage';
import AddToCart from './AddToCart';

// ISR Cache Configuration (Revalidate every hour)
export const revalidate = 3600; 

// SSG: Generate static params for all known products at build time
export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    slug: product.slug,
  }));
}

// Dynamic SEO Metadata
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const products = getProducts();
  const product = products.find(p => p.slug === slug);
  
  if (!product) {
    return { title: 'Sản phẩm không tồn tại' };
  }
  
  return {
    title: `${product.name} | ToyKingdom`,
    description: product.description.substring(0, 160),
  };
}

export default async function ProductDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const products = getProducts();
  const product = products.find(p => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 flex items-center gap-2 mb-8">
          <Link href="/" className="hover:text-primary">Trang chủ</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary">Sản phẩm</Link>
          <span>/</span>
          <span className="text-gray-800 font-medium truncate">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col lg:flex-row gap-12 mb-16">
          
          {/* Left: Image (Client Component) */}
          <div className="lg:w-1/2">
            <ProductImage product={product} />
          </div>

          {/* Right: Info */}
          <div className="lg:w-1/2 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-gray-100 px-3 py-1 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wider">
                {product.brand}
              </span>
              <span className="bg-secondary/20 text-secondary-dark px-3 py-1 rounded-full text-xs font-bold">
                Độ tuổi: {product.ageRange}
              </span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-8 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star size={18} className="fill-secondary text-secondary" />
                <span className="font-bold text-gray-900">{product.rating}</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span><span className="font-semibold text-gray-900">{product.sold}</span> Đã bán</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1 text-green-600 font-medium">
                <Package size={16} /> Còn {product.stock} sản phẩm
              </span>
            </div>

            <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
              <div className="flex items-baseline gap-4">
                <span className="text-4xl font-extrabold text-primary">{formatCurrency(product.price)}</span>
                {product.oldPrice && product.oldPrice > product.price && (
                  <span className="text-lg text-gray-400 line-through font-medium">{formatCurrency(product.oldPrice)}</span>
                )}
              </div>
            </div>

            <p className="text-gray-600 mb-10 leading-relaxed text-lg">
              {product.description}
            </p>

            {/* Actions (Client Component) */}
            <AddToCart product={product} />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-100">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-rose-50 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                  <ShieldCheck size={24} />
                </div>
                <span className="text-sm font-bold text-gray-700 leading-tight">Chính hãng<br/>100%</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                  <Truck size={24} />
                </div>
                <span className="text-sm font-bold text-gray-700 leading-tight">Giao hàng<br/>Toàn quốc</span>
              </div>
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
                  <RotateCcw size={24} />
                </div>
                <span className="text-sm font-bold text-gray-700 leading-tight">Đổi trả<br/>7 ngày</span>
              </div>
            </div>

          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Sản phẩm cùng danh mục</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
