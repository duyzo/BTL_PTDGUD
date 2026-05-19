"use client";

/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Rocket } from 'lucide-react';
import { FaFacebook, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Về chúng tôi */}
          <div>
            <div className="flex items-center gap-2 text-2xl font-bold text-white mb-6">
              <div className="bg-primary text-white p-2 rounded-xl">
                <Rocket size={24} />
              </div>
              <span>ToyKingdom</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              ToyKingdom mang đến thế giới đồ chơi an toàn, chất lượng và đầy sáng tạo cho trẻ em ở mọi lứa tuổi. Giúp bé học hỏi và phát triển mỗi ngày.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FaFacebook size={24} /></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FaInstagram size={24} /></a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all"><FaYoutube size={24} /></a>
            </div>
          </div>

          {/* Liên hệ */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Liên hệ</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-4 group">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <MapPin className="text-primary" size={20} />
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-sm text-slate-400"><strong>CN1:</strong> 12 Nguyễn Văn Bảo, Phường 4, Gò Vấp, TP. Hồ Chí Minh</span>
                </div>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Phone className="text-primary" size={20} />
                </div>
                <span className="text-sm text-slate-400">1900 1234 (8h - 22h)</span>
              </li>
              <li className="flex items-center gap-4 group">
                <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Mail className="text-primary" size={20} />
                </div>
                <span className="text-sm text-slate-400">cskh@toykingdom.vn</span>
              </li>
            </ul>
          </div>

          {/* Hỗ trợ khách hàng */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Hỗ trợ khách hàng</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Hướng dẫn mua hàng</Link></li>
              <li><Link href="/" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Chính sách bảo hành</Link></li>
              <li><Link href="/" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Chính sách đổi trả</Link></li>
              <li><Link href="/" className="text-sm text-slate-400 hover:text-primary transition-colors flex items-center gap-2"><span className="w-1 h-1 bg-primary rounded-full"></span> Câu hỏi thường gặp</Link></li>
            </ul>
          </div>

          {/* Đăng ký nhận tin */}
          <div>
            <h3 className="text-lg font-bold text-white mb-6 uppercase tracking-wider">Đăng ký nhận tin</h3>
            <p className="text-sm mb-4 text-slate-400">Nhận thông tin khuyến mãi và các mẫu đồ chơi mới nhất.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email của bạn..." 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl focus:outline-none focus:border-primary text-sm text-white placeholder-slate-500"
              />
              <button className="w-full bg-primary hover:bg-primary-dark text-white px-4 py-3 rounded-xl transition-colors text-sm font-bold shadow-lg shadow-primary/20">
                Đăng ký ngay
              </button>
            </form>
          </div>

        </div>

        {/* Copyright */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© 2026 ToyKingdom. Dự án bài tập lớn môn Phát triển giao diện ứng dụng.</p>
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg" alt="Visa" className="h-6 opacity-50 grayscale hover:grayscale-0 transition-all" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
