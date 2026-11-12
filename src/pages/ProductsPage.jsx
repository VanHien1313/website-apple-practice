import { formatPrice, products } from '../data/products.js';
import '../styles/pages.css';

export default function ProductsPage() {
  return (
    <div className="aura-content container">
      <header className="aura-content__intro">
        <h1>Khám phá bộ sưu tập Apple.</h1>
        <p>Từ iPhone đến Apple Watch, tìm hiểu những thiết bị cho công việc, học tập và vận động mỗi ngày.</p>
      </header>

      <ul className="aura-catalog" aria-label="Thiết bị Apple">
        {products.map((product) => (
          <li className="aura-catalog__item" id={product.id} key={product.id}>
            <article className="aura-catalog__card">
              <div className="aura-catalog__image">
                <img src={product.image} alt={product.name} width="650" height="650" />
              </div>
              <div className="aura-catalog__details">
                <p className="aura-content__label">{product.category}</p>
                <h2>{product.name}</h2>
                <p className="aura-catalog__description">{product.description}</p>
                <p className="aura-catalog__price">Từ {formatPrice(product.price)}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="aura-catalog__note">Giá tham khảo từ dữ liệu của đồ án.</p>
    </div>
  );
}
