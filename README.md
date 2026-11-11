# 🚀 VibeApp Hub • Personal App Showcase & Download Portal

Website cá nhân hiện đại được thiết kế để giới thiệu, trải nghiệm trực tiếp (Live Demo) và chia sẻ link tải về (Download) các sản phẩm Vibe-Coding cho cộng đồng.

---

## 🌟 Điểm Nổi Bật

- 🎨 **Giao diện đẳng cấp**: Thiết kế lấy cảm hứng từ Apple Developer & Vercel Design System, hỗ trợ Dark / Light Theme và hiệu ứng Glassmorphism.
- ⚡ **Tốc độ ánh sáng**: 100% Vanilla Web Stack (HTML5/CSS3/ES6+), tải trang trong 0.2 giây, không cần node_modules hay build script cồng kềnh.
- 📱 **Đa nền tảng**: Responsive hoàn hảo từ iPhone, iPad, Android cho đến màn hình máy tính 4K.
- 🔍 **Tìm kiếm & Bộ lọc thông minh**: Lọc tức thì theo danh mục (Thư giãn, Quản lý, Video, Đọc sách) và từ khóa tính năng.
- 📦 **Tải về trực tiếp**: Cung cấp sẵn các gói mã nguồn `.zip` cho cộng đồng tải về sử dụng.
- ➕ **Admin Quick Add**: Có sẵn form thêm ứng dụng mới trực tiếp trên giao diện web.

---

## 💻 Cách Chạy Thử Trên Máy Mac

1. Nhấp đúp chuột vào file: **`Chay_Thu_Local.command`**.
2. Trình duyệt sẽ tự động mở trang web tại địa chỉ: `http://localhost:8088`.

---

## 🚀 Hướng Dẫn Đưa Lên Vercel (0 ĐỒNG Miễn Phí Trọn Đời)

### Bước 1: Khởi tạo Git & Đẩy lên GitHub
Mở Terminal tại thư mục `web quan ly apps` và chạy:
```bash
git init
git add .
git commit -m "Phát hành VibeApp Hub cá nhân"
git branch -M main
```

Tạo một Repository mới trên GitHub của bạn tên là: `vibeapp-hub` (hoặc tên tùy thích).
Sau đó liên kết và đẩy code lên:
```bash
git remote add origin https://github.com/loctran6486dn/vibeapp-hub.git
git push -u origin main
```

### Bước 2: Kết nối với Vercel
1. Truy cập [https://vercel.com](https://vercel.com) và đăng nhập bằng tài khoản GitHub của bạn.
2. Bấm vào nút **"Add New..."** &rarr; Chọn **"Project"**.
3. Chọn kho chứa `vibeapp-hub` vừa tạo và bấm **"Import"**.
4. Ở phần **Framework Preset**, giữ nguyên **Other** (hoặc Static).
5. Bấm nút **"Deploy"**!

Chỉ sau khoảng 10-15 giây, Vercel sẽ cấp cho bạn một tên miền miễn phí dạng:
👉 `https://vibeapp-hub.vercel.app` (hoặc bạn có thể đổi tên subdomain trong Settings &rarr; Domains).

---

## 📁 Cấu Trúc Thư Mục

```
web quan ly apps/
├── index.html                  # Giao diện chính Hub ứng dụng
├── vercel.json                 # Cấu hình tối ưu deploy Vercel
├── Chay_Thu_Local.command      # Lệnh 1-click test trên máy Mac
├── css/
│   └── styles.css              # Giao diện Dark/Light Apple Modern Glassmorphism
├── js/
│   ├── apps-data.js            # Danh sách và cấu hình các ứng dụng
│   └── main.js                 # Xử lý tìm kiếm, lọc, modal chi tiết
├── assets/
│   ├── icons/                  # Logo và favicon
│   └── screenshots/            # Ảnh chụp các ứng dụng
└── downloads/                  # Các file ZIP đóng gói để tải về
```

---

*Phát triển bởi **Lộc Trần** (@loctran6486dn) với sức mạnh Vibe-Coding AI.*
