const url = import.meta.env.VITE_API_URL;

const fetchProducts = async (limite = 1000, desde = 0, all = "true") => {
  const base = url.endsWith("/") ? url : `${url}/`;
  const apiUrl = `${base}products?limite=${limite}&desde=${desde}&all=${all}`;
  const response = await fetch(apiUrl, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

const fetchSales = async () => {
  const apiUrl = url.endsWith("/") ? `${url}sales` : `${url}/sales`;
  const response = await fetch(apiUrl, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

const createProduct = async (productData) => {
  const base = url.endsWith("/") ? url : `${url}/`;
  const response = await fetch(`${base}products`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  return data;
};

const updateProduct = async (id, productData) => {
  const base = url.endsWith("/") ? url : `${url}/`;
  const response = await fetch(`${base}products/${id}`, {
    method: "PUT",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });
  const data = await response.json();
  return data;
};

const deleteProduct = async (id) => {
  const base = url.endsWith("/") ? url : `${url}/`;
  const response = await fetch(`${base}products/${id}`, {
    method: "DELETE",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

const restoreProduct = async (id) => {
  const base = url.endsWith("/") ? url : `${url}/`;
  const response = await fetch(`${base}products/${id}/restore`, {
    method: "PATCH",
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

const fetchCategories = async () => {
  const base = url.endsWith("/") ? url : `${url}/`;
  const response = await fetch(`${base}categories`, {
    credentials: "include",
  });
  const data = await response.json();
  return data;
};

export {
  fetchProducts,
  fetchSales,
  createProduct,
  updateProduct,
  deleteProduct,
  restoreProduct,
  fetchCategories,
};
