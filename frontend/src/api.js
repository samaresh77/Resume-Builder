const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000/api';

export async function apiFetch(path, { method = 'GET', body, token } = {}) {
  try {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    let json;
    try {
      json = await res.json();
    } catch {
      json = {};
    }

    if (!res.ok) {
      const msg = json.msg || json.error || 'API request failed';
      throw new Error(msg);
    }

    return json;
  } catch (err) {
    // Optionally log error for debugging
    console.error('apiFetch error:', err);
    throw err;
  }
}
