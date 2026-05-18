"use client";

import { useEffect, useState } from 'react';
import { Order } from '@/types';
import { getOrders, saveOrder, deleteOrder } from '@/utils/orderStore';
import { formatCurrency } from '@/utils/formatCurrency';
import { Edit2, Trash2, X, Search, FileText, CheckCircle, Clock, Truck, Package, XCircle } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  const handleDelete = (id: string) => {
    if (confirm('Bạn có chắc chắn muốn xóa đơn hàng này? Việc này không thể hoàn tác.')) {
      deleteOrder(id);
      setOrders(getOrders());
      toast.success('Đã xóa đơn hàng');
    }
  };

  const handleOpenModal = (order: Order) => {
    setViewingOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setViewingOrder(null);
  };

  const handleUpdateStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!viewingOrder) return;
    const newStatus = e.target.value as Order['status'];
    const updatedOrder = { ...viewingOrder, status: newStatus };
    saveOrder(updatedOrder);
    setViewingOrder(updatedOrder);
    setOrders(getOrders());
    toast.success('Đã cập nhật trạng thái đơn hàng');
  };

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.customerPhone.includes(searchTerm)
  );

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <span className="flex items-center gap-1.5 px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full"><Clock size={12} /> Chờ xử lý</span>;
      case 'processing': return <span className="flex items-center gap-1.5 px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full"><Package size={12} /> Đang chuẩn bị</span>;
      case 'shipped': return <span className="flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full"><Truck size={12} /> Đang giao</span>;
      case 'delivered': return <span className="flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"><CheckCircle size={12} /> Hoàn thành</span>;
      case 'cancelled': return <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 text-xs font-semibold rounded-full"><XCircle size={12} /> Đã hủy</span>;
      default: return null;
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quản lý Đơn hàng</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Tìm theo Mã đơn, tên hoặc SĐT..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Tổng: {filteredOrders.length} đơn
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="p-4 font-bold">Mã đơn hàng</th>
                <th className="p-4 font-bold">Khách hàng</th>
                <th className="p-4 font-bold">Ngày đặt</th>
                <th className="p-4 font-bold">Tổng tiền</th>
                <th className="p-4 font-bold">Trạng thái</th>
                <th className="p-4 font-bold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center text-orange-500 shrink-0">
                        <FileText size={20} />
                      </div>
                      <span className="font-bold text-gray-900">{order.id}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="font-semibold text-gray-900">{order.customerName}</p>
                    <p className="text-xs text-gray-500">{order.customerPhone}</p>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                      year: 'numeric', month: 'short', day: 'numeric',
                      hour: '2-digit', minute: '2-digit'
                    })}
                  </td>
                  <td className="p-4 font-bold text-primary">
                    {formatCurrency(order.totalAmount)}
                  </td>
                  <td className="p-4">
                    {getStatusBadge(order.status)}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(order)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Xem chi tiết & Cập nhật"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(order.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        title="Xóa đơn hàng"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-gray-500">
                    Không tìm thấy đơn hàng nào!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Detail */}
      {isModalOpen && viewingOrder && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <div>
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  Chi tiết Đơn hàng <span className="text-primary">{viewingOrder.id}</span>
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Đặt lúc: {new Date(viewingOrder.createdAt).toLocaleString('vi-VN')}
                </p>
              </div>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto bg-gray-50/30">
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Customer Info */}
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Thông tin Khách hàng</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-semibold text-gray-800">Tên:</span> {viewingOrder.customerName}</p>
                    <p><span className="font-semibold text-gray-800">SĐT:</span> {viewingOrder.customerPhone}</p>
                    <p><span className="font-semibold text-gray-800">Địa chỉ giao:</span> {viewingOrder.customerAddress}</p>
                  </div>
                </div>

                {/* Status Update */}
                <div className="bg-white p-5 rounded-xl border border-gray-200">
                  <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">Trạng thái & Thanh toán</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Cập nhật trạng thái:</label>
                      <select 
                        value={viewingOrder.status}
                        onChange={handleUpdateStatus}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-sm font-medium"
                      >
                        <option value="pending">Chờ xử lý</option>
                        <option value="processing">Đang chuẩn bị hàng</option>
                        <option value="shipped">Đang giao hàng</option>
                        <option value="delivered">Đã giao thành công</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600"><span className="font-semibold text-gray-800">Phương thức:</span> {viewingOrder.paymentMethod === 'cod' ? 'Thanh toán khi nhận hàng (COD)' : 'Chuyển khoản ngân hàng'}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-800">
                  Sản phẩm đã mua ({viewingOrder.items.length})
                </div>
                <ul className="divide-y divide-gray-100">
                  {viewingOrder.items.map(item => (
                    <li key={item.id} className="p-4 flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-200 overflow-hidden shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-xs text-gray-500 mt-1">Đơn giá: {formatCurrency(item.price)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-600">x{item.quantity}</p>
                        <p className="font-bold text-primary mt-1">{formatCurrency(item.price * item.quantity)}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                  <span className="font-bold text-gray-700 uppercase tracking-wider text-sm">Tổng cộng</span>
                  <span className="text-xl font-extrabold text-primary">{formatCurrency(viewingOrder.totalAmount)}</span>
                </div>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-white flex justify-end">
              <button onClick={handleCloseModal} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
