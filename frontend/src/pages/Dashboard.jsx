import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard({ auth }) {
  const [resume, setResume] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(()=> {
    if (!auth?.token) return;
    (async ()=>{
      try {
        const res = await apiFetch('/resumes/me', { token: auth.token });
        setResume(res);
      } catch (e) { setErr(e.message); }
    })();
  }, [auth]);

  if (!auth?.token) return <div className="card"> Please login to manage your resume. </div>;

  return (
    <div className="card">
      <h2>My Resume</h2>
      {err && <div className="small-muted">{err}</div>}
      {resume ? (
        <>
          <div className="small-muted">Headline: {resume.headline || '—'}</div>
          <div className="small-muted">Skills: {(resume.skills || []).join(', ') || '—'}</div>
          <div style={{marginTop:12}}>
            <Link to="/editor"><button className="btn">Edit Resume</button></Link>
            <Link to="/preview" style={{marginLeft:8}}><button className="btn">Preview</button></Link>
          </div>
        </>
      ) : <div>Loading...</div>}
    </div>
  );
}
