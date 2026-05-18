# ToyKingdom - E-commerce Web App

Dự án bài tập lớn môn **Phát triển giao diện ứng dụng**.
Đây là ứng dụng Web giả lập cửa hàng bán đồ chơi trẻ em, được xây dựng theo chuẩn kiến trúc hiện đại, đáp ứng đầy đủ 100% các yêu cầu MVP của môn học.

## 🔗 Link Demo & Tài khoản
- **Link Website**: *(Sẽ cập nhật sau khi deploy)*
- **Tài khoản Admin (dùng để test Dashboard)**:
  - **Email**: `admin@toykingdom.com`
  - **Password**: `admin123`
- **Tài khoản User**: Khách có thể tự đăng ký tài khoản mới trực tiếp trên web.

## 🛠 Tech Stack (Công nghệ sử dụng)
- **Framework**: Next.js 14/15 (App Router)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS v4
- **State Management**: Zustand (Cart), Context API (Auth)
- **Data Fetching**: React Query
- **Testing**: Jest, React Testing Library
- **Chất lượng code & CI/CD**: ESLint, Husky (pre-commit), Github Actions
- **Biểu đồ (Charts)**: Recharts

## 💡 Các tính năng nổi bật (Features)

### 1. Phân quyền & Bảo mật (Auth & Middleware)
- Đăng ký / Đăng nhập (Lưu trữ giả lập qua `localStorage`).
- Hệ thống tạo và quản lý **HTTP Cookie** (`toy_session`) sau khi login.
- **Next.js Middleware** (`src/middleware.ts`) chặn tự động các truy cập trái phép vào trang `/admin` hoặc `/checkout` nếu chưa đăng nhập hoặc sai quyền.

### 2. Quản trị viên (Admin Dashboard)
- Trang Dashboard hiển thị số liệu thống kê (Doanh thu, số lượng User, Đơn hàng) kèm **Biểu đồ trực quan**.
- **3 Module CRUD lõi**: Quản lý Sản phẩm, Quản lý Đơn hàng, Quản lý Người dùng.

### 3. Tìm kiếm, Lọc & Phân trang đa điều kiện
- **React Query** quản lý fetching và caching.
- Người dùng có thể lọc sản phẩm theo **Keyword**, **Danh mục**, **Mức giá**, **Độ tuổi**.
- Trạng thái lọc được đẩy lên URL (Query Parameters) giúp dễ dàng chia sẻ Link.
- Phân trang thông minh tự tính toán tổng số trang.

### 4. API Endpoints chuẩn RESTful
Hệ thống tự xây dựng 5 API Endpoints (tại `src/app/api`):
1. `GET /api/products` (Lấy danh sách sản phẩm)
2. `POST /api/auth/login` (Xác thực đăng nhập)
3. `GET & POST /api/orders` (Tạo và lấy đơn hàng)
4. `GET /api/users` (Lấy danh sách người dùng)
5. `GET /api/dashboard` (Lấy thống kê)

### 5. Chất lượng phần mềm (Testing & CI/CD)
- **11 Unit Tests** bao phủ các Utils, Store và UI Components, test chạy mượt mà bằng Jest.
- Cấu hình **Husky Pre-commit hook**: Ép chạy `npm run lint` và `npm test` trước khi cho phép Git Commit.
- **Github Actions CI**: Tự động chạy Pipeline kiểm tra code khi Push hoặc tạo Pull Request.

## ⚙️ Setup chạy Local

1. **Clone dự án**:
   ```bash
   git clone <url_repo_cua_ban>
   cd BTL_PTGDUD
   ```

2. **Cài đặt thư viện**:
   Yêu cầu NodeJS version 18 trở lên.
   ```bash
   npm install
   ```

3. **Thiết lập biến môi trường**:
   Copy file `.env.example` thành `.env` (Nếu cần).

4. **Khởi chạy Development Server**:
   ```bash
   npm run dev
   ```
   Sau đó mở trình duyệt truy cập: [http://localhost:3000](http://localhost:3000)

## 📜 Các Scripts NPM

Trong thư mục dự án, bạn có thể chạy các lệnh sau:

- `npm run dev`: Chạy app ở chế độ Development.
- `npm run build`: Đóng gói app để chuẩn bị deploy Production.
- `npm start`: Chạy app ở chế độ Production (phải chạy build trước).
- `npm run lint`: Quét và báo lỗi cú pháp bằng ESLint.
- `npm test`: Chạy toàn bộ Unit Tests bằng Jest.
- `npm run test:watch`: Chạy test ở chế độ theo dõi (Watch mode) khi code thay đổi.

## 📁 Tài liệu tham khảo (Docs)
Các tài liệu thiết kế hệ thống nằm trong thư mục `docs/`:
- **ERD.md**: Sơ đồ cơ sở dữ liệu (Entity Relationship Diagram).
- **API_SPEC.md**: Đặc tả toàn bộ API của hệ thống.
