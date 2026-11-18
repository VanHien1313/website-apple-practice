# Website Apple · Aura

Bản thực hành Lập trình web xây dựng bằng React, Vite và React Router (frontend) kết hợp ASP.NET Core Web API, Entity Framework Core và SQL Server (backend). Giao diện, hình ảnh và dữ liệu sản phẩm mẫu được chọn từ đồ án Website Apple (Aura).

## Cấu trúc thư mục

```text
.
├── src/            Frontend React (Vite)
├── public/         Ảnh sản phẩm, favicon
└── backend/
    └── AuraApi/    Backend ASP.NET Core Web API
```

## Chạy frontend

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
| Quản lý sản phẩm (gọi API) | [http://localhost:3000/admin/products](http://localhost:3000/admin/products) |

Bấm **Giới thiệu** trong menu ở trang chủ, sau đó tải lại trang hoặc mở `/about-us` trực tiếp trong tab mới. Cả hai cách đều hiển thị trang Giới thiệu. `BrowserRouter` chọn trang theo URL và Vite ở chế độ SPA phục vụ `index.html` khi mở trực tiếp đường dẫn.

Chạy `npm run build` để tạo bản build trong `dist/`.

Địa chỉ API mặc định là `http://localhost:5080/api`. Muốn đổi, sao chép `.env.example` thành `.env.local` và sửa `VITE_API_URL`.

## Chạy backend (ASP.NET Core + EF Core)

Yêu cầu: .NET SDK 10 (kiểm tra bằng `dotnet --version`) và một SQL Server đang chạy (SQL Server Express, Developer hoặc LocalDB).

```bash
cd backend/AuraApi

# 1. Sửa chuỗi kết nối "DefaultConnection" trong appsettings.json cho khớp máy của bạn
# 2. Cài công cụ dotnet-ef (chỉ làm một lần)
dotnet tool install --global dotnet-ef

# 3. Tạo migration và cập nhật database
dotnet ef migrations add InitialCreate
dotnet ef database update

# 4. Chạy API tại http://localhost:5080
dotnet run
```

`dotnet ef migrations add` sinh thư mục `Migrations/` (nhớ commit thư mục này). `dotnet ef database update` tạo database `AuraDb`, các bảng `Products`, `ProductSpecs` và chèn 4 sản phẩm mẫu.

Các gói NuGet đã được khai báo sẵn trong `AuraApi.csproj`. Nếu tự tạo project mới, cài bằng:

```bash
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design
```

### Chuỗi kết nối thường gặp

| Trường hợp | ConnectionStrings:DefaultConnection |
| --- | --- |
| SQL Server mặc định, đăng nhập Windows | `Server=localhost;Database=AuraDb;Trusted_Connection=True;TrustServerCertificate=True;` |
| SQL Server Express | `Server=.\\SQLEXPRESS;Database=AuraDb;Trusted_Connection=True;TrustServerCertificate=True;` |
| Đăng nhập SQL (sa) | `Server=localhost,1433;Database=AuraDb;User Id=sa;Password=<mật khẩu>;TrustServerCertificate=True;` |

Không commit mật khẩu thật. Có thể cất bằng `dotnet user-secrets set "ConnectionStrings:DefaultConnection" "..."`.

### Các endpoint

| Phương thức | URL | Mô tả | Mã trả về |
| --- | --- | --- | --- |
| GET | `/api/products` | Danh sách sản phẩm (có thể lọc `?category=Mac`) | 200 |
| GET | `/api/products/{id}` | Một sản phẩm | 200, 404 |
| POST | `/api/products` | Thêm sản phẩm | 201, 400, 409 |
| PUT | `/api/products/{id}` | Cập nhật sản phẩm | 200, 400, 404, 409 |
| DELETE | `/api/products/{id}` | Xóa sản phẩm | 204, 404 |

Có thể thử nhanh bằng file `backend/AuraApi/AuraApi.http` (Visual Studio hoặc VS Code với REST Client).

## Mã nguồn

- `index.html` chứa tài liệu HTML của ứng dụng. JSX của trang chủ nằm tại `src/pages/HomePage.jsx` và CSS tương ứng nằm tại `src/styles/home.css`.
- `src/main.jsx` khởi tạo `BrowserRouter`. `src/App.jsx` khai báo các tuyến và `src/components/SiteLayout.jsx` chứa menu dùng chung.
- `src/pages/ProductsPage.jsx` và `src/pages/AboutPage.jsx` triển khai hai trang còn lại.
- `src/api/http.js` tạo instance Axios dùng chung; `src/api/productsApi.js` gói bốn phương thức GET, POST, PUT, DELETE.
- `src/pages/ManageProductsPage.jsx` là trang gọi API: xem danh sách, thêm, sửa, xóa sản phẩm.
- `backend/AuraApi/Program.cs` đăng ký controller, DbContext, CORS. `Controllers/ProductsController.cs` chứa các endpoint, `Data/AppDbContext.cs` cấu hình EF Core, `Models/` là các entity, `Dtos/` là dữ liệu vào/ra của API.

## Đưa lên GitHub

Sau khi đăng nhập GitHub, tạo một repository trống tại [New repository](https://github.com/new) và sao chép URL HTTPS của repository. Sau khi tạo commit đầu tiên, chạy các lệnh sau với URL thực tế.

```bash
git remote add origin https://github.com/USERNAME/REPOSITORY.git
git push -u origin main
```

Tham khảo [cách đưa mã nguồn cục bộ lên GitHub](https://docs.github.com/en/migrations/importing-source-code/using-the-command-line-to-import-source-code/adding-locally-hosted-code-to-github) và [định tuyến khai báo của React Router](https://reactrouter.com/start/declarative/routing).
