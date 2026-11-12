import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Laptop, Smartphone, Tablet, Watch } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPrice, products } from '../data/products.js';
import '../styles/home.css';

const categoryDetails = {
  Mac: { icon: Laptop, description: 'Làm việc và sáng tạo' },
  iPhone: { icon: Smartphone, description: 'Chụp ảnh và kết nối' },
  iPad: { icon: Tablet, description: 'Học tập và ghi chú' },
  'Apple Watch': { icon: Watch, description: 'Theo dõi vận động' },
};

function ProductShowcase() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedProduct = products[selectedIndex];

  return (
    <section className="home-feature" aria-labelledby="home-title">
      <div className="container home-feature-layout">
        <div className="home-showcase">
          <h1 id="home-title">Khám phá Apple<span>.</span></h1>

          <div className="home-stage">
            {products.map((product, index) => {
              const depth = (index - selectedIndex + products.length) % products.length;

              return (
                <div className={`home-device home-device--${depth}`} key={product.id}>
                  <img src={product.image} alt={depth === 0 ? product.name : ''} width="650" height="650" />
                </div>
              );
            })}
          </div>

          <div className="home-device-options" role="group" aria-label="Chọn dòng sản phẩm nổi bật">
            {products.map((product, index) => (
              <button
                type="button"
                key={product.id}
                aria-pressed={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
              >
                {product.category}
              </button>
            ))}
          </div>
        </div>

        <div className="home-product">
          <div aria-live="polite" aria-atomic="true">
            <p className="home-product-category">{selectedProduct.category}</p>
            <h2>{selectedProduct.name}</h2>
            <p className="home-product-price"><span>Từ </span>{formatPrice(selectedProduct.price)}</p>
          </div>

          <dl className="home-specs">
            {selectedProduct.specs.map(({ label, value }) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>

          <Link className="button home-cta" to="/products">
            Khám phá sản phẩm <ArrowUpRight size={19} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="home-page">
      <ProductShowcase />

      <section className="container home-categories" aria-labelledby="home-categories-title">
        <h2 id="home-categories-title">Tìm điều phù hợp với bạn.</h2>
        <ul className="home-category-list">
          {products.map((product) => {
            const { icon: Icon, description } = categoryDetails[product.category];

            return (
              <li key={product.id}>
                <Link className="home-category" to={`/products#${product.id}`}>
                  <span className="home-category-icon"><Icon size={23} strokeWidth={1.7} aria-hidden="true" /></span>
                  <span className="home-category-text">
                    <strong>{product.category}</strong>
                    <span>{description}</span>
                  </span>
                  <ArrowRight className="home-category-arrow" size={18} aria-hidden="true" />
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
