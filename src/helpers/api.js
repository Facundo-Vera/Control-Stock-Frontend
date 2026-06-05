const url = import.meta.env.VITE_API_URL;

const fetchProducts = async () => {
  const apiUrl = url.endsWith("/") ? `${url}products?limite=1000` : `${url}/products?limite=1000`;
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

export { fetchProducts, fetchSales };
