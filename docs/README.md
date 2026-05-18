# ToyKingdom Documentation

## 1. Cấu trúc dự án
- Next.js (App Router)
- Trạng thái toàn cục quản lý bởi `Zustand`
- Giao diện và Style sử dụng `Tailwind CSS`
- Data Fetching: `React Query` (đã thiết lập cho danh sách sản phẩm)
- Form: `react-hook-form` + `zod`

## 2. API Specifications

### `GET /api/products`
Lấy danh sách sản phẩm, có hỗ trợ lọc và tìm kiếm.
- **Query Params**:
  - `category` (optional): Mã danh mục sản phẩm.
  - `search` (optional): Từ khóa tìm kiếm.
- **Response**:
```json
{
  "data": [
    {
      "id": "1",
      "name": "Đồ chơi A",
      "price": 100000,
      ...
    }
  ],
  "total": 1
}
```

## 3. Quản lý trạng thái (Zustand)
- **Store**: `useCartStore`
- **Chức năng**:
  - `addToCart(product, quantity)`
  - `removeFromCart(productId)`
  - `updateQuantity(productId, amount)`
  - `clearCart()`
- Các derived state như `cartTotal` và `cartCount` được tự động tính toán.

## 4. Kiểm thử
- Sử dụng **Jest** và **React Testing Library**.
- Chạy kiểm thử: `npm run test`
