import { Link, NavLink } from 'react-router-dom';

function Wordmark() {
  return (
    <Link to="/" className="wordmark" aria-label="Aura, trang chủ">
      Aura<span>.</span>
    </Link>
  );
}

export default function SiteLayout({ pages, mainRef, children }) {
  return (
    <>
      <a className="skip-link" href="#main-content">Đến nội dung chính</a>
      <header className="site-header">
        <div className="container site-header__inner">
          <Wordmark />
          <nav aria-label="Menu chính" className="site-nav">
            {pages.map(({ path, label }) => (
              <NavLink key={path} to={path} end>{label}</NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container site-footer__inner">
          <div>
            <Wordmark />
            <p>Website Apple · Bài thực hành Lập trình web</p>
          </div>
          <nav aria-label="Menu cuối trang" className="site-footer__nav">
            <Link to="/products">Sản phẩm</Link>
            <Link to="/about-us">Giới thiệu</Link>
          </nav>
          <small>Apple và các tên sản phẩm là nhãn hiệu của Apple Inc.</small>
        </div>
      </footer>
    </>
  );
}
