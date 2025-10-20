import React from 'react';
import { Link } from 'react-router-dom';
export default function Navbar({ auth, onLogout }) {
  return (
    <div style={{padding:'12px 24px', display:'flex', justifyContent:'space-between', alignItems:'center', background:'rgba(0,0,0,0.12)'}}>
      <div style={{fontWeight:700}}>Resume Ecosystem</div>
      <div style={{display:'flex',gap:12,alignItems:'center'}}>
        <Link to="/">Home</Link>
        <Link to="/editor">Editor</Link>
        <Link to="/preview">Preview</Link>
        {auth?.token ? (
          <>
            <span style={{opacity:0.8}}>{auth.user?.name}</span>
            <button className="btn" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login"><button className="btn">Login</button></Link>
            <Link to="/register"><button className="btn">Register</button></Link>
          </>
        )}
      </div>
    </div>
  );
}
