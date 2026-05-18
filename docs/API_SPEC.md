# ToyKingdom API Specification

Dưới đây là danh sách 5 RESTful API endpoints phục vụ cho hệ thống.

## 1. Authentication Endpoints

### 1.1 Đăng nhập
- **URL**: `/api/auth/login`
- **Method**: `POST`
- **Description**: Xác thực người dùng và trả về HTTP Cookie `toy_session`.
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": {
      "id": "user-001",
      "email": "user@example.com",
      "name": "User Name",
      "role": "user"
    }
  }
  ```

## 2. Product Endpoints

### 2.1 Lấy danh sách sản phẩm
- **URL**: `/api/products`
- **Method**: `GET`
- **Query Params**:
  - `category` (optional): Lọc theo danh mục.
  - `search` (optional): Tìm kiếm theo tên.
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "lego-city-1",
        "name": "LEGO City Trạm Cảnh Sát",
        "price": 1599000,
        "stock": 10
      }
    ]
  }
  ```

## 3. Order Endpoints

### 3.1 Lấy danh sách đơn hàng
- **URL**: `/api/orders`
- **Method**: `GET`
- **Description**: Lấy danh sách các đơn hàng đã đặt (Admin lấy tất cả, User lấy của chính họ).
- **Response** (200 OK):
  ```json
  {
    "success": true,
    "data": []
  }
  ```

### 3.2 Tạo đơn hàng mới
- **URL**: `/api/orders`
- **Method**: `POST`
- **Description**: Lưu đơn hàng mới vào hệ thống.
- **Body**:
  ```json
  {
    "userId": "user-123",
    "items": [{ "id": "lego-city-1", "quantity": 1 }],
    "totalAmount": 1599000
  }
  ```
- **Response** (201 Created)

## 4. User Endpoints

### 4.1 Lấy danh sách người dùng
- **URL**: `/api/users`
- **Method**: `GET`
- **Description**: Yêu cầu quyền Admin (được chặn bởi middleware). Trả về danh sách user đăng ký trên hệ thống.
- **Response** (200 OK)

## 5. Dashboard Endpoints

### 5.1 Lấy thống kê hệ thống
- **URL**: `/api/dashboard`
- **Method**: `GET`
- **Description**: Yêu cầu quyền Admin. Trả về tổng quan doanh thu, số đơn, số user.
- **Response** (200 OK)
  ```json
  {
    "success": true,
    "data": {
      "totalProducts": 57,
      "totalUsers": 3,
      "totalOrders": 1,
      "revenue": 1599000
    }
  }
  ```
