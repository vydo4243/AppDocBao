# 📰 U&V newspaper reading mobile application

<p align="center">
  <a href="https://www.uit.edu.vn/" title="University of Information Technology" style="border: none;">
    <img src="https://i.imgur.com/WmMnSRt.png" alt="University of Information Technology">
  </a>
</p>

<h1 align="center"><b>IE307.P11 - Công nghệ lập trình đa nền tảng cho ứng dụng di động</b></h1>

## 👥 Thành viên nhóm:
| **STT** | **MSSV** | **Họ tên**            |  **Email**                  |
| ------- | -------------- | ------------------------ | -------------------------- |
| 1       | 22521641       | Nguyễn Đăng Hương Uyên   | 22521641@gm.uit.edu.vn     |
| 2       | 22521701       | Đỗ Mai Tường Vy          | 22521701@gm.uit.edu.vn     |


## 🏠 Giới thiệu
U&V là một ứng dụng di động được phát triển nhằm mang đến trải nghiệm đọc báo, xem tin tức và cập nhật thời tiết một cách nhanh chóng và tiện lợi. Ứng dụng được xây dựng bằng React Native và Expo, giúp hỗ trợ đa nền tảng (Android và iOS) với hiệu năng mượt mà.
Tin tức được crawl trực tiếp từ VnExpress, đảm bảo nội dung luôn mới, chính xác và cập nhật liên tục theo thời gian thực.

## ✨ Tính năng
### **Về user:**
- Đăng nhập, đăng ký, đăng xuất, quên mật khẩu, đổi mật khẩu
- Xem tin tức được chia theo danh mục
- Tìm kiếm tin tức bằng từ khóa
- Xem chi tiết bài viết
- Lưu tin để xem lại sau hoặc đánh dấu yêu thích.
- Chế độ **Dark Mode**
- Tùy chỉnh **Font Size**
- Chia sẻ bài viết lên mạng xã hội hoặc email
- Gửi thông báo đẩy khi có tin nóng hoặc cập nhật thời tiết bất thường
### **Về admin:**
- Tạo bài viết theo danh mục

## ⚙️ Tech Stack
- **Frontend**: React Native, Expo, React Navigation, Axios, AsyncStorage
- **Backend**: Node.js, Express.js, Cheerio (Crawler), Axios, OpenWeather API
- **Package Manager**: npm, pip
- **Database**: Firebase
- **DevOps & Tools**: Expo CLI / Metro Bundler, GitHub, VSCode
 

## 🛠️ Cài đặt & chạy ứng dụng

### Các bước
1. Clone repository:

```bash 
git clone https://github.com/HacThienCau/AppDocBao
cd AppDocBao
```

2. Tải dependencies và Local Development:
```bash
npm install
npx expo start
```
Sau lệnh này, một cửa sổ Metro Bundler sẽ mở ra với QR code và các tùy chọn chạy.
Cách 1: Chạy trên điện thoại thật với Expo Go:
- Tải ứng dụng Expo Go:
  Android: Google Play Store 
  iOS: App Store 
* Đảm bảo điện thoại và máy tính kết nối cùng một mạng Wi-Fi.
- Quét QR code hiển thị trong terminal bằng camera của Expo Go:
  Trên Android: Mở Expo Go → Chọn "Scan QR Code".
  Trên iOS: Mở Expo Go → Quét QR code trực tiếp.
Ứng dụng sẽ tải và chạy ngay lập tức, hỗ trợ hot reload (cập nhật code realtime).

Cách 2: Chạy trên giả lập
- Tải và cài đặt Android Studio từ https://developer.android.com/studio.
- Mở Android Studio → Configure → AVD Manager → Tạo một Virtual Device (ví dụ: Pixel 6, API level 34 hoặc mới hơn).
- Khởi động emulator từ AVD Manager.
- Trong terminal Metro Bundler:
  Nhấn ``` a ``` → Expo sẽ tự động detect và cài app lên emulator.
  Hoặc chạy lệnh: ``` npx expo run:android ```


## 📧 Liên hệ
Nếu bạn có bất kỳ câu hỏi nào hoặc cần hỗ trợ, vui lòng liên hệ với tôi qua email: vydo422004@gmail.com hoặc 22521701@gm.uit.edu.vn
