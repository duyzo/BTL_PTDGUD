# ToyKingdom (MyKingdom Clone) - Next.js Edition

Dự án bài tập lớn môn **Phát triển giao diện ứng dụng**.
Đây là ứng dụng Web giả lập cửa hàng bán đồ chơi trẻ em, được nâng cấp và refactor toàn bộ từ React/Vite sang **Next.js (App Router)** + **TypeScript**.

## 🚀 Vì sao chuyển sang Next.js + TypeScript?
- **Next.js App Router**: Cung cấp cấu trúc thư mục rõ ràng (`app/`), hỗ trợ Server Components và Client Components, tối ưu SEO qua `Metadata`, giúp ứng dụng load nhanh và mượt mà hơn.
- **TypeScript**: Giúp định nghĩa kiểu dữ liệu rõ ràng (Type-safety) cho Product, Cart, User... tránh lỗi runtime, hỗ trợ autocomplete khi code, dễ dàng mở rộng và bảo trì.
- **next/image**: Tối ưu hóa dung lượng hình ảnh tự động, giúp web tải nhanh hơn.

## 🛠 Công nghệ sử dụng
- **Next.js 15 (App Router)**
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (Icon)
- **React Toastify** (Thông báo Toast)

## 📁 Cấu trúc thư mục
```
src/
├── app/                  # Các trang (Pages) theo chuẩn Next.js App Router
│   ├── cart/             # Trang giỏ hàng
│   ├── checkout/         # Trang thanh toán
│   ├── login/            # Trang đăng nhập
│   ├── products/         # Trang danh sách sản phẩm (có lọc, phân trang)
│   │   └── [slug]/       # Trang chi tiết sản phẩm (Dynamic Route)
│   ├── register/         # Trang đăng ký
│   ├── globals.css       # CSS toàn cục (chứa cấu hình Tailwind theme)
│   ├── layout.tsx        # Layout chính (Header, Footer, Provider)
│   └── page.tsx          # Trang chủ
├── components/           # Các component dùng chung
│   ├── layout/           # Header, Footer
│   └── product/          # ProductCard, CategoryList, Pagination
├── context/              # Quản lý State toàn cục (React Context)
│   ├── AuthContext.tsx   # Trạng thái đăng nhập giả lập
│   └── CartContext.tsx   # Quản lý giỏ hàng
├── data/                 # Dữ liệu mẫu (Mock data)
│   └── mock.ts           # 64 sản phẩm và các danh mục
├── types/                # Định nghĩa Interface TypeScript
│   └── index.ts          # Interface Product, Category, User, CartItem
└── utils/                # Hàm hỗ trợ
    └── formatCurrency.ts # Format tiền tệ VNĐ
```

## ⚙️ Cách cài đặt và khởi chạy

1. Clone hoặc mở thư mục dự án trong Terminal.
2. Đảm bảo máy có cài **Node.js** (LTS).
3. Cài đặt dependencies:
   ```bash
   npm install
   ```
4. Khởi chạy server development:
   ```bash
   npm run dev
   ```
5. Mở trình duyệt và truy cập: `http://localhost:3000`

## 💡 Chức năng chi tiết

### 1. Dữ liệu giả lập (Mock Data)
- Hệ thống tạo sẵn **64 sản phẩm** chia thành **8 danh mục** (LEGO, Búp bê, Xe đồ chơi, Board game...).
- Mỗi sản phẩm có đầy đủ ảnh minh họa, giá cũ/mới, phần trăm giảm giá, độ tuổi, thương hiệu, số lượng đã bán, đánh giá.

### 2. Phân trang, Lọc và Sắp xếp (Trang Sản phẩm)
- **Phân trang (Pagination)**: Hiển thị 12 sản phẩm mỗi trang. Code xử lý linh hoạt, tự động tính tổng số trang dựa trên dữ liệu.
- **Bộ lọc (Filter)**: Có thể lọc kết hợp nhiều điều kiện: 
  - Theo từ khóa tìm kiếm (Search Bar)
  - Theo Danh mục
  - Theo Mức giá (Dưới 300k, 300-500k, Trên 500k)
  - Theo Độ tuổi phù hợp
- **Sắp xếp (Sort)**: Hỗ trợ sắp xếp theo Giá (Tăng/Giảm), Bán chạy nhất, Đánh giá cao nhất.
- **Tính năng thông minh**: Khi có bất kỳ thay đổi nào về bộ lọc hay sắp xếp, danh sách sẽ tự động quay về Trang 1 để tránh lỗi hiển thị. Mọi State được lưu trên URL (Query Parameters), giúp người dùng có thể chia sẻ link tìm kiếm cho người khác.

### 3. Giỏ hàng & Thanh toán
- Quản lý qua `CartContext` và `localStorage`. Reload trang không mất đồ.
- Tự động cộng tổng tiền, tính phí giao hàng (Free ship cho đơn từ 500k).
- Trang Thanh toán có giả lập kiểm tra người dùng đã đăng nhập chưa, có form điền địa chỉ đẹp mắt.

### 4. Đăng nhập / Đăng ký (Local Storage Auth)
- Sử dụng `AuthContext` kết hợp với `localStorage` để giả lập Database lưu trữ tài khoản người dùng (`toy_users_db`) và trạng thái đăng nhập (`toy_user`).
- **Trang Đăng ký (/register)**: Yêu cầu điền Họ tên, Email, Mật khẩu và Xác nhận mật khẩu. Có kiểm tra validation (không bỏ trống, mật khẩu >= 6 ký tự, mật khẩu phải khớp). Nếu Email đã tồn tại trong `localStorage` thì sẽ báo lỗi không cho đăng ký.
- **Trang Đăng nhập (/login)**: Kiểm tra thông tin nhập vào với danh sách tài khoản đã đăng ký trong `localStorage`. Nếu trùng khớp sẽ lưu state và chuyển về trang chủ.
- **Lưu ý**: Đây là tính năng đăng nhập giả lập hoàn toàn ở phía Frontend phục vụ mục đích nộp bài tập lớn/đồ án. Mật khẩu được lưu trực tiếp dạng plain-text dưới Local Storage. Trong thực tế cần có Backend xử lý băm mật khẩu (bcrypt) và cấp phát JWT Token để đảm bảo bảo mật.

### 5. Quản lý Hồ sơ (Profile)
- Trang `/profile` cho phép người dùng thay đổi Họ tên, Số điện thoại, Địa chỉ giao hàng và Ảnh đại diện (Avatar).
- Avatar được xử lý trực tiếp dưới máy khách bằng `FileReader` để convert sang chuỗi `Base64` và lưu vào `localStorage`. Điều này giúp hệ thống hoạt động 100% không cần backend upload ảnh, đảm bảo khi Refresh trang ảnh vẫn không bị mất.
- Header có một Dropdown Menu thông minh hiển thị Avatar và Email của tài khoản đang đăng nhập.

## 📌 Hướng phát triển thêm (Nếu làm Backend)
- Thay thế file `mock.ts` bằng các lệnh gọi API (Fetch/Axios) tới Backend Node.js/NestJS.
- Chuyển `CartContext` và `AuthContext` sang dùng API để xác thực Token và lưu giỏ hàng thật vào cơ sở dữ liệu.
- Thay thế thư viện Toast hiện tại bằng Radix UI hoặc shadcn/ui để đồng bộ Next.js ecosystem.
