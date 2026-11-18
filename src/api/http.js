import axios from 'axios';

// Một instance Axios dùng chung: mọi request đều bắt đầu từ baseURL này.
const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5080/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

export default http;

// Chuyển lỗi của Axios / ASP.NET Core thành câu thông báo tiếng Việt cho người dùng.
export function getErrorMessage(error) {
  if (!axios.isAxiosError(error)) return 'Đã có lỗi không xác định.';
  if (!error.response) return 'Không kết nối được API. Hãy kiểm tra backend đã chạy chưa.';

  const { status, data } = error.response;
  if (data?.errors) return Object.values(data.errors).flat().join(' ');
  if (data?.detail) return data.detail;
  if (data?.title) return data.title;
  return `Yêu cầu thất bại (HTTP ${status}).`;
}
