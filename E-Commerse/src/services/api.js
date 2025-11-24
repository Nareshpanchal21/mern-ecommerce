// ✅ API base URL using Render or fallback to localhost
const BASE_URL = (import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api/");

// 🔹 GET request
export const get = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error(`GET request failed for ${endpoint}`);
  return res.json();
};

// 🔹 POST request
export const post = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`POST request failed for ${endpoint}`);
  return res.json();
};

// 🔹 PUT request
export const put = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`PUT request failed for ${endpoint}`);
  return res.json();
};

// 🔹 DELETE request
export const del = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`DELETE request failed for ${endpoint}`);
  return res.json();
};

// 🔹 Optional helper to get Render URL anywhere
export const getRenderURL = () =>
  (import.meta.env.VITE_BACKEND_URL || "https://mern-ecommerce-kmq2.onrender.com/api/");
