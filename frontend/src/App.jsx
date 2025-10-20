import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ResumeEditor from './pages/ResumeEditor';
import ResumePreview from './pages/ResumePreview';
import Navbar from './components/Navbar';

export default function App() {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user')||'null');
    return { token, user };
  });

  const onLogin = ({ token, user }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({ token, user });
  };
  const onLogout = () => {
    localStorage.removeItem('token'); localStorage.removeItem('user');
    setAuth({ token: null, user: null });
  };

  return (
    <>
      <Navbar auth={auth} onLogout={onLogout}/>
      <div className="container">
        <Routes>
          <Route path="/" element={<Dashboard auth={auth} />} />
          <Route path="/register" element={<Register onLogin={onLogin} />} />
          <Route path="/login" element={<Login onLogin={onLogin} />} />
          <Route path="/editor" element={<ResumeEditor auth={auth} />} />
          <Route path="/preview" element={<ResumePreview auth={auth} />} />
        </Routes>
      </div>
    </>
  );
}
