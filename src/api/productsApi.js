import http from './http.js';

// GET /api/products
export async function getProducts(config) {
  const { data } = await http.get('/products', config);
  return data;
}

// GET /api/products/{id}
export async function getProduct(id, config) {
  const { data } = await http.get(`/products/${id}`, config);
  return data;
}

// POST /api/products
export async function createProduct(product) {
  const { data } = await http.post('/products', product);
  return data;
}

// PUT /api/products/{id}
export async function updateProduct(id, product) {
  const { data } = await http.put(`/products/${id}`, product);
  return data;
}

// DELETE /api/products/{id}
export async function deleteProduct(id) {
  await http.delete(`/products/${id}`);
}
