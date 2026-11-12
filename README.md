# Website Apple · Aura

Bản thực hành Lập trình web xây dựng bằng React, Vite và React Router. Giao diện, hình ảnh và dữ liệu sản phẩm mẫu được chọn từ đồ án Website Apple (Aura).

## Chạy trên máy

Yêu cầu Node.js 20 trở lên.

```bash
npm ci
npm run dev
```

| Trang | URL |
| --- | --- |
| Trang chủ | [http://localhost:3000](http://localhost:3000) |
| Sản phẩm | [http://localhost:3000/products](http://localhost:3000/products) |
| Giới thiệu | [http://localhost:3000/about-us](http://localhost:3000/about-us) |

Bấm **Giới thiệu** trong menu ở trang chủ, sau đó tải lại trang hoặc mở `/about-us` trực tiếp trong tab mới. Cả hai cách đều hiển thị trang Giới thiệu. `BrowserRouter` chọn trang theo URL và Vite ở chế độ SPA phục vụ `index.html` khi mở trực tiếp đường dẫn.

Chạy `npm run build` để tạo bản build trong `dist/`.

## Mã nguồn

- `index.html` chứa tài liệu HTML của ứng dụng. JSX của trang chủ nằm tại `src/pages/HomePage.jsx` và CSS tương ứng nằm tại `src/styles/home.css`.
- `src/main.jsx` khởi tạo `BrowserRouter`. `src/App.jsx` khai báo các tuyến và `src/components/SiteLayout.jsx` chứa menu dùng chung.
- `src/pages/ProductsPage.jsx` và `src/pages/AboutPage.jsx` triển khai hai trang còn lại.
