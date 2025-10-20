import React, { useState } from 'react';
import { apiFetch } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Register({ onLogin }) {
  const [form, setForm] = useState({ name:'', email:'', password:'' });
  const [err, setErr] = useState('');
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const json = await apiFetch('/auth/register', { method:'POST', body: form });
      onLogin(json);
      nav('/');
    } catch (err) { setErr(err.message); }
  }

  return (
    <div className="card">
      <h2>Register</h2>
      <form onSubmit={submit} className="col">
        <input placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})}/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})}/>
        <input type="password" placeholder="Password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})}/>
        <button className="btn">Register</button>
        {err && <div className="small-muted">{err}</div>}
      </form>
    </div>
  );
}
