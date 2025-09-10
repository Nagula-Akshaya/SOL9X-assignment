const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const buildHeaders = () => {
  const token = localStorage.getItem('token');
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};
const api = {
  get: async (path) => { const res = await fetch(`${API_BASE}${path}`, { headers: buildHeaders() }); if (!res.ok) throw await res.json(); return res.json(); },
  post: async (path, body) => { const res = await fetch(`${API_BASE}${path}`, { method: 'POST', headers: buildHeaders(), body: JSON.stringify(body) }); if (!res.ok) throw await res.json(); return res.json(); },
  put: async (path, body) => { const res = await fetch(`${API_BASE}${path}`, { method: 'PUT', headers: buildHeaders(), body: JSON.stringify(body) }); if (!res.ok) throw await res.json(); return res.json(); },
  del: async (path) => { const res = await fetch(`${API_BASE}${path}`, { method: 'DELETE', headers: buildHeaders() }); if (!res.ok) throw await res.json(); return res.json(); }
};
export default api;
