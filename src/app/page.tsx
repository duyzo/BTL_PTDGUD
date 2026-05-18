import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { CategoryList } from '@/components/product/CategoryList';
import { ProductCard } from '@/components/product/ProductCard';
import { getProducts } from '@/utils/productStore';
import { ShieldCheck, Truck, RotateCcw, Medal } from 'lucide-react';

export const metadata: Metadata = {
  title: 'ToyKingdom | Đồ chơi thông minh, phát triển trí tuệ cho bé',
  description: 'Thế giới đồ chơi trẻ em ToyKingdom an toàn, sáng tạo, giúp bé phát triển toàn diện. Giao hàng siêu tốc, đổi trả dễ dàng.',
};

export default async function Home() {
  // SSR: Lấy dữ liệu trực tiếp trên Server (không cần useEffect/useState)
  const productList = getProducts();

  const bestSellers = [...productList].sort((a, b) => b.sold - a.sold).slice(0, 8);
  const flashSales = [...productList].filter(p => (p.discount || 0) >= 15).slice(0, 4);
  const newArrivals = productList.slice(productList.length - 8).reverse();

  return (
    <div className="pb-16">
      {/* Hero Banner */}
      <section className="bg-gradient-to-br from-indigo-50 to-blue-50 py-12 md:py-20 relative overflow-hidden border-b border-indigo-100">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 z-10">
            <div className="inline-block px-4 py-1.5 bg-white rounded-full text-sm font-bold text-primary mb-6 shadow-sm">
              ✨ Khám phá thế giới tuổi thơ
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
              Đồ chơi sáng tạo <br/>
              Cho bé <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-rose-400">Thông minh</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
              ToyKingdom mang đến những bộ đồ chơi an toàn, chất lượng cao giúp bé phát triển toàn diện cả thể chất lẫn trí tuệ.
            </p>
            <div className="flex gap-4">
              <Link 
                href="/products" 
                className="inline-flex bg-primary hover:bg-primary-dark text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-primary/30 transition-all hover:-translate-y-1"
              >
                Mua sắm ngay
              </Link>
              <Link 
                href="/products?category=lego" 
                className="inline-flex bg-white hover:bg-gray-50 text-gray-800 font-bold py-3.5 px-8 rounded-full shadow-sm border border-gray-200 transition-all hover:-translate-y-1"
              >
                Khám phá LEGO
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 relative z-10 flex justify-center">
            <div className="relative w-[80%] max-w-md aspect-square rounded-3xl shadow-2xl rotate-3 overflow-hidden border-8 border-white">
              <Image 
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=800&q=80" 
                alt="Toys Banner" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-10 right-10 text-6xl opacity-30 rotate-12 drop-shadow-md">🎈</div>
          <div className="absolute bottom-10 left-1/2 text-6xl opacity-30 -rotate-12 drop-shadow-md">🧸</div>
          <div className="absolute top-1/2 left-10 text-5xl opacity-30 drop-shadow-md">🚗</div>
        </div>
      </section>

      {/* Cam kết */}
      <section className="py-8 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-rose-50 text-primary rounded-full flex items-center justify-center shrink-0">
                <Medal size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Sản phẩm chính hãng</h4>
                <p className="text-xs text-gray-500">Đảm bảo chất lượng 100%</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-full flex items-center justify-center shrink-0">
                <Truck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Giao hàng siêu tốc</h4>
                <p className="text-xs text-gray-500">Miễn phí cho đơn từ 500k</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-50 text-green-500 rounded-full flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Thanh toán an toàn</h4>
                <p className="text-xs text-gray-500">Bảo mật thông tin tuyệt đối</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center shrink-0">
                <RotateCcw size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">Đổi trả dễ dàng</h4>
                <p className="text-xs text-gray-500">Trong vòng 7 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategoryList />

      {/* Flash Sale */}
      <section className="py-12 bg-rose-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary flex items-center gap-2">
                ⚡ Flash Sale
              </h2>
              <p className="text-gray-600 mt-2">Ưu đãi giảm sâu lên đến 25%</p>
            </div>
            <Link href="/products" className="text-primary font-bold hover:underline hidden sm:block">Xem tất cả</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {flashSales.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Đồ chơi bán chạy nhất</h2>
            <p className="text-gray-500">Những món đồ chơi được nhiều ba mẹ tin chọn</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {bestSellers.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Promo */}
      <section className="py-8 container mx-auto px-4">
        <div className="bg-gradient-to-r from-primary to-rose-400 rounded-3xl p-8 md:p-14 text-center text-white relative overflow-hidden shadow-xl shadow-primary/20">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">Đăng ký thành viên<br/>Nhận ngay quà khủng!</h2>
            <p className="mb-8 text-lg opacity-90">Giảm ngay 10% cho đơn hàng đầu tiên của bạn. Tích điểm mọi lúc, mọi nơi.</p>
            <Link 
              href="/register" 
              className="inline-block bg-white text-primary hover:bg-gray-50 font-bold py-4 px-10 rounded-full shadow-lg transition-transform hover:scale-105"
            >
              Đăng ký ngay
            </Link>
          </div>
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-white opacity-10 rounded-full blur-2xl"></div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">Sản phẩm mới ra mắt</h2>
            <p className="text-gray-500">Cập nhật liên tục những mẫu đồ chơi hot nhất</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link 
              href="/products" 
              className="inline-block border-2 border-primary text-primary hover:bg-primary hover:text-white font-bold py-3 px-8 rounded-full transition-colors"
            >
              Xem tất cả sản phẩm
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
