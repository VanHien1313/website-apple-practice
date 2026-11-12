export const products = [
  {
    id: 'macbook-air-13-m4',
    category: 'Mac',
    name: 'MacBook Air 13 inch M4',
    image: '/images/macbook-air-13-m4.webp',
    description: 'Laptop 1,24 kg với chip M4, RAM 16 GB và hai cổng Thunderbolt 4.',
    price: 26490000,
    specs: [
      { label: 'Chip', value: 'Apple M4' },
      { label: 'Màn hình', value: 'Liquid Retina 13,6 inch' },
      { label: 'Bộ nhớ', value: 'RAM 16 GB' },
    ],
  },
  {
    id: 'iphone-17-pro',
    category: 'iPhone',
    name: 'iPhone 17 Pro',
    image: '/images/iphone-17-pro.webp',
    description: 'Ba camera 48 MP, chip A19 Pro và màn hình ProMotion.',
    price: 31990000,
    specs: [
      { label: 'Chip', value: 'Apple A19 Pro' },
      { label: 'Màn hình', value: 'OLED 6,3 inch, đến 120 Hz' },
      { label: 'Camera sau', value: 'Hệ thống ba camera 48 MP' },
    ],
  },
  {
    id: 'ipad-air-11-m3',
    category: 'iPad',
    name: 'iPad Air 11 inch M3 Wi-Fi',
    image: '/images/ipad-air-11-m3.webp',
    description: 'Chip M3, màn hình Liquid Retina và hỗ trợ Apple Pencil Pro.',
    price: 16690000,
    specs: [
      { label: 'Chip', value: 'Apple M3' },
      { label: 'Màn hình', value: 'Liquid Retina 11 inch' },
      { label: 'Bút cảm ứng', value: 'Hỗ trợ Apple Pencil Pro' },
    ],
  },
  {
    id: 'apple-watch-series-11',
    category: 'Apple Watch',
    name: 'Apple Watch Series 11 GPS 42mm',
    image: '/images/apple-watch-series-11.webp',
    description: 'Màn hình luôn bật và theo dõi vận động trên cổ tay.',
    price: 8990000,
    specs: [
      { label: 'Vỏ', value: 'Nhôm 42 mm' },
      { label: 'Màn hình', value: 'Retina OLED luôn bật' },
      { label: 'Độ sáng', value: 'Tối đa 2.000 nit' },
    ],
  },
];

const currency = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});

export function formatPrice(price) {
  return currency.format(price);
}
