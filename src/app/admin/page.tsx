/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from 'react';
import { getStats } from '@/utils/productStore';
import { getOrders } from '@/utils/orderStore';
import { Package, Users, ShoppingBag, DollarSign } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { formatCurrency } from '@/utils/formatCurrency';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

export default function AdminOverview() {
  const [stats, setStats] = useState({ totalProducts: 0, totalUsers: 0, totalOrders: 0 });
  const [salesData, setSalesData] = useState<{name: string, doanhThu: number}[]>([]);
  const [categoryData, setCategoryData] = useState<{name: string, value: number}[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    setStats(getStats());
    
    // Calculate real data from orders
    const orders = getOrders();
    
    // Calculate total revenue
    const revenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    setTotalRevenue(revenue);

    // Calculate sales by day of week
    const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
    const revenueByDay = { 'T2': 0, 'T3': 0, 'T4': 0, 'T5': 0, 'T6': 0, 'T7': 0, 'CN': 0 };
    
    // Categories
    const catMap: Record<string, number> = {};

    orders.forEach(order => {
      const date = new Date(order.createdAt);
      const dayName = days[date.getDay()];
      revenueByDay[dayName as keyof typeof revenueByDay] += order.totalAmount;
      
      order.items.forEach(item => {
        catMap[item.category] = (catMap[item.category] || 0) + item.quantity;
      });
    });

    const newSalesData = [
      { name: 'T2', doanhThu: revenueByDay['T2'] },
      { name: 'T3', doanhThu: revenueByDay['T3'] },
      { name: 'T4', doanhThu: revenueByDay['T4'] },
      { name: 'T5', doanhThu: revenueByDay['T5'] },
      { name: 'T6', doanhThu: revenueByDay['T6'] },
      { name: 'T7', doanhThu: revenueByDay['T7'] },
      { name: 'CN', doanhThu: revenueByDay['CN'] },
    ];
    setSalesData(newSalesData);

    const newCatData = Object.keys(catMap).map(key => ({
      name: key,
      value: catMap[key]
    })).sort((a, b) => b.value - a.value);
    
    setCategoryData(newCatData.length > 0 ? newCatData : [{ name: 'Chưa có', value: 1 }]);

  }, []);

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Tổng quan hệ thống</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center shrink-0">
            <Package size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Sản phẩm</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-green-50 text-green-500 flex items-center justify-center shrink-0">
            <Users size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Người dùng</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center shrink-0">
            <ShoppingBag size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Đơn hàng</p>
            <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
            <DollarSign size={28} />
          </div>
          <div>
            <p className="text-sm text-gray-500 font-medium mb-1">Doanh thu</p>
            <h3 className="text-xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Doanh thu trong tuần</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData} margin={{ top: 10, right: 10, left: 20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6b7280' }} tickFormatter={(val) => `${val / 1000}k`} />
                <Tooltip cursor={{ fill: '#f3f4f6' }} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} formatter={(value: any) => formatCurrency(Number(value))} />
                <Bar dataKey="doanhThu" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Tỉ lệ ngành hàng bán ra</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center flex-wrap gap-4 mt-4">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                  <span className="text-sm text-gray-600 capitalize">{entry.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
