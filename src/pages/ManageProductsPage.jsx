import { useCallback, useEffect, useRef, useState } from 'react';
import { isCancel } from 'axios';
import { getErrorMessage } from '../api/http.js';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../api/productsApi.js';
import { formatPrice } from '../data/products.js';
import '../styles/manage.css';

const categories = ['Mac', 'iPhone', 'iPad', 'Apple Watch'];

const emptySpec = { label: '', value: '' };

const emptyForm = {
  slug: '',
  category: categories[0],
  name: '',
  image: '/images/',
  description: '',
  price: '',
  specs: [{ ...emptySpec }],
};

function toForm(product) {
  return {
    slug: product.slug,
    category: product.category,
    name: product.name,
    image: product.image,
    description: product.description,
    price: String(product.price),
    specs: product.specs.length
      ? product.specs.map(({ label, value }) => ({ label, value }))
      : [{ ...emptySpec }],
  };
}

function toRequest(form) {
  return {
    slug: form.slug.trim(),
    category: form.category,
    name: form.name.trim(),
    image: form.image.trim(),
    description: form.description.trim(),
    price: Number(form.price),
    specs: form.specs
      .map(({ label, value }) => ({ label: label.trim(), value: value.trim() }))
      .filter(({ label, value }) => label && value),
  };
}

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState('loading');
  const [loadError, setLoadError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState(null);
  const formRef = useRef(null);

  // GET: tải danh sách sản phẩm từ backend.
  const loadProducts = useCallback(async (signal) => {
    try {
      setProducts(await getProducts({ signal }));
      setStatus('ready');
    } catch (error) {
      if (isCancel(error)) return;
      setLoadError(getErrorMessage(error));
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    loadProducts(controller.signal);
    return () => controller.abort();
  }, [loadProducts]);

  function resetForm() {
    setForm(emptyForm);
    setEditingId(null);
  }

  function updateField(name, value) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  function updateSpec(index, key, value) {
    setForm((current) => ({
      ...current,
      specs: current.specs.map((spec, i) => (i === index ? { ...spec, [key]: value } : spec)),
    }));
  }

  function addSpec() {
    setForm((current) => ({ ...current, specs: [...current.specs, { ...emptySpec }] }));
  }

  function removeSpec(index) {
    setForm((current) => ({
      ...current,
      specs: current.specs.length > 1 ? current.specs.filter((_, i) => i !== index) : current.specs,
    }));
  }

  function startEdit(product) {
    setEditingId(product.id);
    setForm(toForm(product));
    setNotice(null);
    formRef.current?.scrollIntoView();
  }

  // POST (thêm mới) hoặc PUT (cập nhật) tùy theo đang sửa hay không.
  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setNotice(null);

    try {
      if (editingId === null) {
        await createProduct(toRequest(form));
        setNotice({ type: 'success', text: 'Đã thêm sản phẩm mới.' });
      } else {
        await updateProduct(editingId, toRequest(form));
        setNotice({ type: 'success', text: 'Đã cập nhật sản phẩm.' });
      }
      resetForm();
      await loadProducts();
    } catch (error) {
      setNotice({ type: 'error', text: getErrorMessage(error) });
    } finally {
      setSaving(false);
    }
  }

  // DELETE: xóa một sản phẩm theo id.
  async function handleDelete(product) {
    if (!window.confirm(`Xóa "${product.name}"?`)) return;
    setNotice(null);

    try {
      await deleteProduct(product.id);
      if (editingId === product.id) resetForm();
      setNotice({ type: 'success', text: `Đã xóa "${product.name}".` });
      await loadProducts();
    } catch (error) {
      setNotice({ type: 'error', text: getErrorMessage(error) });
    }
  }

  return (
    <div className="aura-content container manage">
      <header className="aura-content__intro">
        <p className="aura-content__label">Quản lý</p>
        <h1>Quản lý sản phẩm.</h1>
        <p>Trang này gọi API ASP.NET Core bằng Axios với bốn phương thức GET, POST, PUT và DELETE.</p>
      </header>

      <div className="manage-notice-slot" role="status" aria-live="polite">
        {notice && <p className={`manage-notice manage-notice--${notice.type}`}>{notice.text}</p>}
      </div>

      <section className="manage-list" aria-labelledby="manage-list-title">
        <h2 id="manage-list-title">Danh sách sản phẩm</h2>

        {status === 'loading' && <p className="manage-state">Đang tải dữ liệu...</p>}

        {status === 'error' && (
          <div className="manage-state manage-state--error">
            <p>{loadError}</p>
            <button type="button" className="button" onClick={() => loadProducts()}>Thử lại</button>
          </div>
        )}

        {status === 'ready' && products.length === 0 && (
          <p className="manage-state">Chưa có sản phẩm nào. Hãy thêm sản phẩm đầu tiên ở form bên dưới.</p>
        )}

        {status === 'ready' && products.length > 0 && (
          <div className="manage-table-wrap">
            <table className="manage-table">
              <caption className="visually-hidden">Danh sách sản phẩm lấy từ API</caption>
              <thead>
                <tr>
                  <th scope="col">Ảnh</th>
                  <th scope="col">Tên sản phẩm</th>
                  <th scope="col">Danh mục</th>
                  <th scope="col">Giá</th>
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td><img src={product.image} alt="" width="48" height="48" /></td>
                    <th scope="row">{product.name}</th>
                    <td>{product.category}</td>
                    <td className="manage-price">{formatPrice(product.price)}</td>
                    <td>
                      <div className="manage-actions">
                        <button type="button" className="button button--secondary" onClick={() => startEdit(product)} aria-label={`Sửa ${product.name}`}>Sửa</button>
                        <button type="button" className="button button--danger" onClick={() => handleDelete(product)} aria-label={`Xóa ${product.name}`}>Xóa</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="manage-form-section" aria-labelledby="manage-form-title" ref={formRef}>
        <h2 id="manage-form-title">{editingId === null ? 'Thêm sản phẩm mới' : 'Cập nhật sản phẩm'}</h2>

        <form className="manage-form" onSubmit={handleSubmit}>
          <div className="manage-field">
            <label htmlFor="product-name">Tên sản phẩm</label>
            <input id="product-name" required maxLength={150} value={form.name} onChange={(e) => updateField('name', e.target.value)} />
          </div>

          <div className="manage-field">
            <label htmlFor="product-slug">Slug (mã duy nhất, ví dụ iphone-17-pro)</label>
            <input id="product-slug" required maxLength={100} pattern="[a-z0-9]+(-[a-z0-9]+)*" title="Chỉ dùng chữ thường, số và dấu gạch ngang" value={form.slug} onChange={(e) => updateField('slug', e.target.value)} />
          </div>

          <div className="manage-field">
            <label htmlFor="product-category">Danh mục</label>
            <select id="product-category" value={form.category} onChange={(e) => updateField('category', e.target.value)}>
              {categories.map((category) => <option key={category} value={category}>{category}</option>)}
            </select>
          </div>

          <div className="manage-field">
            <label htmlFor="product-price">Giá (VND)</label>
            <input id="product-price" type="number" required min="0" step="1000" inputMode="numeric" value={form.price} onChange={(e) => updateField('price', e.target.value)} />
          </div>

          <div className="manage-field manage-field--wide">
            <label htmlFor="product-image">Đường dẫn ảnh</label>
            <input id="product-image" required maxLength={255} value={form.image} onChange={(e) => updateField('image', e.target.value)} />
          </div>

          <div className="manage-field manage-field--wide">
            <label htmlFor="product-description">Mô tả ngắn</label>
            <textarea id="product-description" required rows={3} maxLength={500} value={form.description} onChange={(e) => updateField('description', e.target.value)} />
          </div>

          <fieldset className="manage-specs manage-field--wide">
            <legend>Thông số</legend>
            {form.specs.map((spec, index) => (
              <div className="manage-spec-row" key={index}>
                <input aria-label={`Tên thông số ${index + 1}`} placeholder="Ví dụ: Chip" maxLength={50} value={spec.label} onChange={(e) => updateSpec(index, 'label', e.target.value)} />
                <input aria-label={`Giá trị thông số ${index + 1}`} placeholder="Ví dụ: Apple M4" maxLength={150} value={spec.value} onChange={(e) => updateSpec(index, 'value', e.target.value)} />
                <button type="button" className="button button--secondary" onClick={() => removeSpec(index)} disabled={form.specs.length === 1} aria-label={`Xóa thông số ${index + 1}`}>Bỏ</button>
              </div>
            ))}
            <button type="button" className="button button--secondary manage-add-spec" onClick={addSpec}>Thêm thông số</button>
          </fieldset>

          <div className="manage-form-actions manage-field--wide">
            <button type="submit" className="button" disabled={saving}>
              {saving ? 'Đang lưu...' : editingId === null ? 'Thêm sản phẩm' : 'Lưu thay đổi'}
            </button>
            {editingId !== null && (
              <button type="button" className="button button--secondary" onClick={resetForm}>Hủy sửa</button>
            )}
          </div>
        </form>
      </section>
    </div>
  );
}
