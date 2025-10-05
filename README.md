# Hệ Thống Website Studio Lập Trình AliSS

Website giới thiệu và cổng truy cập hệ thống cho studio lập trình AliSS với hiệu ứng 3D và giao diện hiện đại.

## Cấu Trúc Hệ Thống

```
├── index.html          # Trang chủ chính với Google Authentication
├── access.html         # Trang truy cập hệ thống
├── loading.html        # Trang loading khi truy cập hệ thống
├── styles.css          # File stylesheet chung
├── script.js           # JavaScript cho trang chủ
├── access.js           # JavaScript cho trang truy cập
├── loading.js          # JavaScript cho trang loading
├── open_website.bat    # File chạy trang chủ
├── open_access.bat     # File chạy trang truy cập
├── open_loading.bat    # File chạy trang loading
├── open_all.bat        # File chạy tất cả các trang
└── README.md           # Tài liệu này
```

## Chức Năng Chính

1. **Trang Chủ (index.html)**
   - Giao diện 3D với hiệu ứng nền động
   - Xác thực người dùng bằng Google Authentication
   - Nút "Truy cập hệ thống" chỉ hiển thị sau khi đăng nhập
   - Thiết kế responsive phù hợp mọi thiết bị

2. **Trang Truy Cập (access.html)**
   - Cung cấp thông tin về hệ thống NAS Sunology
   - Nút "Truy cập ngay" dẫn đến trang loading
   - Liên kết quay về trang chủ

3. **Trang Loading (loading.html)**
   - Hiệu ứng loading chuyên nghiệp với thanh tiến trình
   - Hiển thị các bước tải: Xác thực, Kết nối, Tải dữ liệu, Hoàn tất
   - Tự động chuyển hướng đến hệ thống NAS sau khi hoàn tất

## Hướng Dẫn Sử Dụng

### Mở Trang Web
1. Nhấp đút vào file `open_website.bat` để mở trang chủ
2. Hoặc mở trực tiếp file `index.html` trong trình duyệt

### Quy Trình Truy Cập Hệ Thống
1. Trên trang chủ, đăng nhập bằng tài khoản Google
2. Sau khi đăng nhập thành công, nút "Truy cập hệ thống" sẽ hiển thị
3. Click vào "Truy cập hệ thống" để mở trang loading trong tab mới
4. Trang loading sẽ hiển thị tiến trình kết nối
5. Sau khi hoàn tất, tự động chuyển hướng đến `http://quickconnect.to/aliss202`

### Các File Chạy Trực Tiếp
- `open_website.bat` - Mở trang chủ
- `open_access.bat` - Mở trang truy cập
- `open_loading.bat` - Mở trang loading
- `open_all.bat` - Mở tất cả các trang

## Cấu Hình Google Authentication

### Bước 1: Tạo Google Cloud Project
1. Truy cập [Google Cloud Console](https://console.cloud.google.com/)
2. Tạo một project mới hoặc chọn project hiện có
3. Kích hoạt Google+ API trong thư viện API

### Bước 2: Cấu Hình OAuth Consent Screen
1. Trong Google Cloud Console, vào "APIs & Services" > "OAuth consent screen"
2. Chọn "External" và tạo
3. Điền tên ứng dụng: "AliSS Studio"
4. Thêm domain: `http://localhost` (cho phát triển cục bộ)
5. Thêm scope: `../auth/userinfo.email` và `../auth/userinfo.profile`

### Bước 3: Tạo Credentials
1. Vào "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Chọn "Web application"
4. Đặt tên: "AliSS Web Client"
5. Thêm URIs:
   - Authorized JavaScript origins: `http://localhost`
   - Authorized redirect URIs: `http://localhost`
6. Lưu và sao chép Client ID

### Bước 4: Cập Nhật Client ID
1. Mở file `index.html`
2. Tìm dòng: `data-client_id="YOUR_GOOGLE_CLIENT_ID"`
3. Thay thế `YOUR_GOOGLE_CLIENT_ID` bằng Client ID đã sao chép

## Công Nghệ Sử Dụng

- **HTML5/CSS3** - Cấu trúc và định dạng
- **JavaScript** - Tương tác và hiệu ứng
- **Three.js** - Hiệu ứng 3D nền
- **GSAP** - Hiệu ứng animation (trang chủ)
- **Google Identity Services** - Xác thực người dùng

## Tùy Chỉnh

Để thay đổi nội dung hoặc thiết kế:
- Chỉnh sửa HTML trong các file `.html`
- Thay đổi kiểu dáng trong file `styles.css`
- Điều chỉnh hiệu ứng 3D trong các file `.js`

## Lưu Ý

- Trang loading sẽ tự động chuyển hướng đến hệ thống NAS Sunology tại địa chỉ `http://quickconnect.to/aliss202`
- Tất cả các liên kết đến hệ thống ngoài đều mở trong tab mới để giữ website chính trong nền
- Website sử dụng hiệu ứng 3D nên cần kết nối internet để tải thư viện Three.js
- Google Authentication yêu cầu cấu hình Client ID hợp lệ

## Bảo Trì

Để cập nhật địa chỉ hệ thống:
1. Mở file `loading.js`
2. Tìm dòng `window.location.href = "http://quickconnect.to/aliss202"`
3. Thay thế bằng địa chỉ mới

Để cập nhật Client ID:
1. Mở file `index.html`
2. Tìm dòng `data-client_id="YOUR_GOOGLE_CLIENT_ID"`
3. Thay thế bằng Client ID mới