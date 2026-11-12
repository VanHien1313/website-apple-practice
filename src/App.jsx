import { useEffect, useRef } from 'react';
import { Link, Route, Routes, useLocation } from 'react-router-dom';
import SiteLayout from './components/SiteLayout.jsx';
import AboutPage from './pages/AboutPage.jsx';
import HomePage from './pages/HomePage.jsx';
import ProductsPage from './pages/ProductsPage.jsx';

const pages = [
  { path: '/', label: 'Trang chủ', Component: HomePage },
  { path: '/products', label: 'Sản phẩm', Component: ProductsPage },
  { path: '/about-us', label: 'Giới thiệu', Component: AboutPage },
];

function NotFoundPage() {
  return (
    <section className="container not-found">
      <h1>Không tìm thấy trang</h1>
      <p>Địa chỉ bạn truy cập không có trong Website Apple.</p>
      <Link className="button" to="/">Về trang chủ</Link>
    </section>
  );
}

export default function App() {
  const { pathname, hash } = useLocation();
  const previousPath = useRef(pathname);
  const main = useRef(null);

  useEffect(() => {
    const normalizedPath = pathname.replace(/\/+$/, '') || '/';
    const page = pages.find(({ path }) => path === normalizedPath.toLowerCase());
    document.title = page?.path === '/'
      ? 'Aura · Website Apple'
      : `${page?.label ?? 'Không tìm thấy trang'} · Aura`;

    if (pathname !== previousPath.current) {
      main.current?.focus({ preventScroll: true });
      window.scrollTo(0, 0);
      previousPath.current = pathname;
    }

    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView();
    }
  }, [pathname, hash]);

  return (
    <SiteLayout pages={pages} mainRef={main}>
      <Routes>
        {pages.map(({ path, Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </SiteLayout>
  );
}
