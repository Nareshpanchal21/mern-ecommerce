const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000/api";

export const get = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) throw new Error("API request failed");
  return res.json();
};

export const post = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API request failed");
  return res.json();
};

export const put = async (endpoint, data) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("API request failed");
  return res.json();
};

export const del = async (endpoint) => {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error("API request failed");
  return res.json();
};

export const getRenderURL = () => "https://mern-ecommerce-kmq2.onrender.com/api";
