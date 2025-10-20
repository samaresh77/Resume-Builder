import React, { useState } from 'react';
import { apiFetch } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email:'', password:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const json = await apiFetch('/auth/login', { method:'POST', body: form });
      onLogin(json);
      nav('/');
    } catch (err) { setErr(err.message); }
  }

  return (
    <div className="card">
      <h2>Login</h2>
      <form onSubmit={submit} className="col">
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="btn">Login</button>
        {err && <div className="small-muted">{err}</div>}
      </form>
    </div>
  );
}
