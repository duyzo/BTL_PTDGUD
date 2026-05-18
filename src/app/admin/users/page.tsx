"use client";

import { useEffect, useState } from 'react';
import { UserAccount } from '@/types';
import { getUsers, saveUser, deleteUser } from '@/utils/userStore';
import { Plus, Edit2, Trash2, X, Search, Shield, User as UserIcon } from 'lucide-react';
import { toast } from 'react-toastify';

export default function AdminUsers() {
  const [users, setUsers] = useState<UserAccount[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAccount | null>(null);

  useEffect(() => {
    setUsers(getUsers());
  }, []);

  const handleDelete = (id: string) => {
    if (id === 'user-admin-1') {
      toast.error('Không thể xóa tài khoản admin gốc');
      return;
    }
    if (confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
      deleteUser(id);
      setUsers(getUsers());
      toast.success('Đã xóa người dùng');
    }
  };

  const handleOpenModal = (user: UserAccount | null = null) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSaveUser = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const role = formData.get('role') as 'user' | 'admin';
    const id = editingUser ? editingUser.id : `user-${Date.now()}`;
    
    if (editingUser && editingUser.id === 'user-admin-1' && role !== 'admin') {
      toast.error('Không thể thay đổi quyền của admin gốc');
      return;
    }

    const newUser: UserAccount = {
      id,
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      role: role,
      phone: formData.get('phone') as string,
      address: formData.get('address') as string,
    };

    // Keep original password if editing, else default
    if (editingUser) {
      newUser.password = editingUser.password;
    } else {
      newUser.password = 'password123';
    }

    saveUser(newUser);
    setUsers(getUsers());
    handleCloseModal();
    toast.success(editingUser ? 'Đã cập nhật người dùng' : 'Đã thêm người dùng mới');
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Quản lý Người dùng</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl font-bold transition-colors"
        >
          <Plus size={20} />
          Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên hoặc email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
            />
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="text-sm text-gray-500 font-medium">
            Tổng: {filteredUsers.length}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 text-gray-600 text-sm border-b border-gray-100">
                <th className="p-4 font-bold">Người dùng</th>
                <th className="p-4 font-bold">Liên hệ</th>
                <th className="p-4 font-bold">Phân quyền</th>
                <th className="p-4 font-bold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex flex-shrink-0 items-center justify-center text-blue-500">
                        {user.role === 'admin' ? <Shield size={20} /> : <UserIcon size={20} />}
                      </div>
                      <div>
                        <p className="font-bold text-gray-900">{user.name}</p>
                        <p className="text-xs text-gray-500">ID: {user.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <p className="text-sm text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.phone || 'Chưa cập nhật'}</p>
                  </td>
                  <td className="p-4">
                    {user.role === 'admin' ? (
                      <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 text-xs font-semibold rounded-full">
                        Admin
                      </span>
                    ) : (
                      <span className="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                        User
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center gap-2">
                      <button 
                        onClick={() => handleOpenModal(user)}
                        className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Sửa"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className={`p-2 rounded-lg transition-colors ${user.id === 'user-admin-1' ? 'text-gray-300 cursor-not-allowed' : 'text-red-500 hover:bg-red-50'}`}
                        disabled={user.id === 'user-admin-1'}
                        title="Xóa"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-gray-500">
                    Không tìm thấy người dùng nào!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Add/Edit */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">
                {editingUser ? 'Chỉnh sửa Người dùng' : 'Thêm Người dùng mới'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto">
              <form id="userForm" onSubmit={handleSaveUser} className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Họ và tên *</label>
                  <input required name="name" defaultValue={editingUser?.name} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                  <input required type="email" name="email" defaultValue={editingUser?.email} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>

                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Quyền hạn *</label>
                    <select 
                      name="role" 
                      defaultValue={editingUser?.role || 'user'} 
                      disabled={editingUser?.id === 'user-admin-1'}
                      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none disabled:bg-gray-100"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Số điện thoại</label>
                    <input type="text" name="phone" defaultValue={editingUser?.phone} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Địa chỉ</label>
                  <input type="text" name="address" defaultValue={editingUser?.address} className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none" />
                </div>
              </form>
            </div>
            
            <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
              <button onClick={handleCloseModal} className="px-6 py-2.5 rounded-xl font-bold text-gray-600 bg-white border border-gray-300 hover:bg-gray-50 transition-colors">Hủy</button>
              <button form="userForm" type="submit" className="px-6 py-2.5 rounded-xl font-bold text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm">
                {editingUser ? 'Lưu thay đổi' : 'Thêm người dùng'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
