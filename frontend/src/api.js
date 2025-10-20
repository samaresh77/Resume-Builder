const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function apiFetch(path, { method='GET', body, token } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const json = await res.json().catch(()=> ({}));
  if (!res.ok) throw new Error(json.msg || 'API error');
  return json;
}
