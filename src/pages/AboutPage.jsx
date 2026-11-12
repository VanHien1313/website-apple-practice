import { Link } from 'react-router-dom';
import { products } from '../data/products.js';
import '../styles/pages.css';

const aboutImage = products.find((product) => product.category === 'Mac');

export default function AboutPage() {
  return (
    <div className="aura-content container">
      <header className="aura-about__hero">
        <div className="aura-content__intro">
          <p className="aura-content__label">Về Aura</p>
          <h1>Công nghệ gần hơn. Lựa chọn rõ hơn.</h1>
          <p>Aura là website thực hành giới thiệu các thiết bị Apple. Bạn có thể tìm hiểu những sản phẩm tiêu biểu và chọn dòng thiết bị phù hợp với nhu cầu của mình.</p>
          <Link className="button" to="/products">Khám phá sản phẩm <span aria-hidden="true">↗</span></Link>
        </div>
        <div className="aura-about__image">
          <img src={aboutImage.image} alt="" width="650" height="650" />
        </div>
      </header>

      <div className="aura-about__sections">
        <section aria-labelledby="aura-about-catalog">
          <h2 id="aura-about-catalog">Thiết bị trong bộ sưu tập</h2>
          <p>Danh mục có iPhone, Mac, iPad và Apple Watch. Mỗi sản phẩm có hình ảnh, mô tả ngắn và giá tham khảo để bạn dễ xem qua các lựa chọn.</p>
        </section>
        <section aria-labelledby="aura-about-course">
          <h2 id="aura-about-course">Bài thực hành Lập trình web</h2>
          <p>Website được xây dựng bằng React và Vite. React Router cho phép mở từng trang bằng menu hoặc truy cập trực tiếp địa chỉ của trang.</p>
        </section>
      </div>
    </div>
  );
}
