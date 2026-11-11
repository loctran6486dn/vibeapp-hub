/**
 * Danh sách ứng dụng Vibe-Coding của Lộc Trần
 * Dễ dàng thêm mới, sửa đổi thông tin ứng dụng tại đây
 */
const APPS_DATA = [
  {
    id: "zenvibe",
    title: "ZenVibe - Ambient Sound Mixer",
    subtitle: "Trình trộn âm thanh thiên nhiên thư giãn & tập trung làm việc",
    category: "relax",
    categoryLabel: "Âm thanh & Thư giãn",
    badge: "Phổ biến",
    platforms: ["Web", "PWA", "macOS", "iOS", "Android"],
    featured: true,
    accentColor: "#10b981",
    icon: "🍃",
    screenshot: "assets/screenshots/zenvibe.png",
    description: "Ứng dụng thư giãn âm thanh cao cấp hỗ trợ trộn đa luồng âm thanh thiên nhiên (mưa rơi, suối chảy, sóng biển, gió rít, lửa trại, chim hót...) với thanh âm lượng độc lập cho từng âm. Hoạt động 100% Offline, có thể chạy trên trình duyệt web, cài PWA vào điện thoại hoặc chạy dưới dạng ứng dụng macOS native.",
    features: [
      "🎛️ Bộ trộn đa luồng âm thanh với thanh trượt volume độc lập",
      "🌿 Hơn 10+ âm thanh thiên nhiên chuẩn chất lượng cao",
      "⏱️ Tính năng hẹn giờ tắt tự động (Pomodoro & Sleep Timer)",
      "💾 Lưu và nạp các phối âm yêu thích (Presets)",
      "📴 Chạy 100% Offline không cần kết nối mạng (Service Worker)",
      "💻 Tích hợp sẵn ứng dụng ZenVibe.app dành riêng cho macOS"
    ],
    demoUrl: "https://zenvibe-sandy.vercel.app",
    downloadFile: "downloads/zenvibe.zip",
    downloadSize: "13.0 MB",
    initialDownloads: 148,
    githubUrl: "https://github.com/loctran6486dn/zenvibe",
    version: "v1.2.0",
    installGuide: {
      web: "Mở file index.html hoặc chạy file `Mo_App.command` để mở trên trình duyệt.",
      ios: "Mở link trên Safari -> Bấm nút Chia sẻ (Share) -> Chọn 'Thêm vào Màn hình chính' (Add to Home Screen).",
      android: "Mở link trên Chrome -> Bấm dấu 3 chấm -> Chọn 'Cài đặt ứng dụng' hoặc 'Thêm vào Màn hình chính'.",
      mac: "Giải nén file zip -> Chạy trực tiếp `ZenVibe.app` hoặc nhấp đúp file `Mo_App.command`."
    }
  },
  {
    id: "quan-ly-hang-hoa",
    title: "Quản Lý Kho Hàng & Thu Chi Mini",
    subtitle: "Ứng dụng bán hàng & kiểm kho tối ưu 100% cho điện thoại di động",
    category: "productivity",
    categoryLabel: "Quản lý & Bán hàng",
    badge: "Mobile First",
    platforms: ["Web", "PWA", "iOS", "Android"],
    featured: true,
    accentColor: "#3b82f6",
    icon: "📦",
    screenshot: "assets/screenshots/quanlyhanghoa.svg",
    description: "Giải pháp quản lý kho hàng, theo dõi đơn hàng bán ra, tính toán doanh thu và lợi nhuận thuần túy trên điện thoại di động. Thiết kế theo phong cách Mobile-First với giao diện thẻ mượt mà, thanh điều hướng đáy, nút bán hàng nhanh FAB, hỗ trợ quét mã vạch và đồng bộ đa thiết bị tức thì qua Vercel KV Cloud.",
    features: [
      "📱 Thiết kế chuẩn Mobile-First (Giao diện thẻ danh sách, chạm lướt siêu êm)",
      "📷 Tích hợp quét mã vạch Barcode / QR Code trực tiếp từ camera điện thoại",
      "💰 Quản lý thu chi, tính lãi gộp tức thì cho từng đơn hàng",
      "☁️ Đồng bộ đám mây đa thiết bị (Vercel Serverless + Vercel KV / Upstash)",
      "🔄 Cơ chế Smart Merge & Khôi phục dữ liệu chống mất đơn khi rớt mạng",
      "📊 Báo cáo biểu đồ doanh số trực quan theo ngày, tuần, tháng"
    ],
    demoUrl: "https://quanlyhanghoaloc.vercel.app",
    downloadFile: "downloads/app_quan_ly_hang_hoa.zip",
    downloadSize: "56 KB",
    initialDownloads: 92,
    githubUrl: "https://github.com/loctran6486dn/quanlyhanghoa",
    version: "v2.0.0",
    installGuide: {
      web: "Nhấp đúp chuột vào file `Chay_Server_Local.command` để khởi chạy server nội bộ.",
      ios: "Dùng iPhone quét mã QR hiện trên máy tính hoặc truy cập IP nội bộ -> Chọn 'Thêm vào Màn hình chính' trong Safari.",
      android: "Mở Chrome -> Quét mã QR -> Chọn 'Cài đặt ứng dụng' để sử dụng toàn màn hình.",
      cloud: "Triển khai lên Vercel miễn phí theo file `vercel.json` và kết nối Vercel KV Storage để bật đồng bộ đa máy."
    }
  },
  {
    id: "capcut-mini",
    title: "CapCut Mini - Trình Biên Tập Video Web",
    subtitle: "Cắt ghép, xem trước và xuất video nhẹ nhàng ngay trên trình duyệt",
    category: "video",
    categoryLabel: "Video & Sáng tạo",
    badge: "Web Tool",
    platforms: ["Web", "PWA", "macOS", "PC"],
    featured: true,
    accentColor: "#f43f5e",
    icon: "🎬",
    screenshot: "assets/screenshots/capcutmini.png",
    description: "Công cụ biên tập video gọn nhẹ được xây dựng hoàn toàn bằng công nghệ Web Canvas và HTML5 Video API. Cho phép bạn nhập video từ máy, cắt tỉa timeline chính xác theo khung hình, chèn âm thanh nền, xem trước thời gian thực và xuất video thành phẩm mà không cần cài đặt phần mềm nặng nề.",
    features: [
      "✂️ Timeline biên tập trực quan: Cắt, tỉa, phân đoạn video mượt mà",
      "⚡ Xem trước thời gian thực tốc độ 60FPS không giật lag",
      "🎵 Ghép và điều chỉnh âm lượng track nhạc nền độc lập",
      "📱 Giao diện thích ứng tốt trên cả máy tính lẫn màn hình di động",
      "🔒 Xử lý 100% trên trình duyệt client - không lộ video lên máy chủ",
      "🚀 Tải về và chạy ngay lập tức chỉ với 1 file lệnh `start.sh`"
    ],
    demoUrl: "",
    downloadFile: "downloads/capcutmini.zip",
    downloadSize: "1.5 MB",
    initialDownloads: 65,
    githubUrl: "https://github.com/loctran6486dn/capcutmini",
    version: "v1.1.0",
    installGuide: {
      web: "Mở file index.html trên Google Chrome hoặc Safari để bắt đầu chỉnh sửa video.",
      mac: "Mở Terminal tại thư mục app và gõ `./start.sh` hoặc nhấp đúp file `CapCut Mini.command`.",
      ios: "Hỗ trợ trình duyệt Safari trên iPad và iPhone màn hình lớn."
    }
  },
  {
    id: "app-truyen-tranh",
    title: "App Truyện Tranh & Tiểu Thuyết Đa Nền Tảng",
    subtitle: "Trải nghiệm đọc truyện tranh manga và tiểu thuyết cuộn mượt 120Hz",
    category: "reading",
    categoryLabel: "Đọc truyện & Sách",
    badge: "Flutter",
    platforms: ["Android", "iOS", "Flutter", "Server"],
    featured: false,
    accentColor: "#a855f7",
    icon: "📚",
    screenshot: "assets/screenshots/truyentranh.svg",
    description: "Ứng dụng đọc truyện tranh (Manga/Manhwa) và tiểu thuyết chữ được phát triển với Flutter Native Engine cùng Backend Node.js. Tối ưu trải nghiệm đọc với chế độ lật trang tự nhiên, cuộn mượt mà không độ trễ, lưu trang đang đọc dở và tải trước nội dung chương tiếp theo.",
    features: [
      "⚡ Flutter Native Engine: Tốc độ dựng khung hình 120Hz siêu êm",
      "📖 Chế độ đọc linh hoạt: Đọc cuộn liên tục (Webtoon) hoặc lật trang sách",
      "🌓 Tối ưu Dark Mode bảo vệ mắt khi đọc truyện ban đêm",
      "🔖 Tự động ghi nhớ chương và vị trí đang đọc",
      "🐳 Đi kèm Backend Server Node.js và docker-compose sẵn sàng triển khai"
    ],
    demoUrl: "",
    downloadFile: "",
    downloadSize: "GitHub",
    initialDownloads: 41,
    githubUrl: "https://github.com/loctran6486dn",
    version: "v1.0.0",
    installGuide: {
      flutter: "Chạy `flutter pub get` và `flutter run` trong thư mục `app/`.",
      server: "Chạy `docker-compose up -d` hoặc `npm start` trong thư mục `server/` để mở API nội dung."
    }
  }
];

// Danh mục phân loại
const CATEGORIES = [
  { id: "all", label: "Tất cả", icon: "✨" },
  { id: "relax", label: "Âm thanh & Thư giãn", icon: "🍃" },
  { id: "productivity", label: "Quản lý & Bán hàng", icon: "📦" },
  { id: "video", label: "Video & Sáng tạo", icon: "🎬" },
  { id: "reading", label: "Đọc truyện & Sách", icon: "📚" }
];
