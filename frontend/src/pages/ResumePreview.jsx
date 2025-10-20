import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';

export default function ResumePreview({ auth }) {
  const [resume, setResume] = useState(null);

  useEffect(()=>{
    (async ()=>{
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const r = await apiFetch('/resumes/me', { token });
        setResume(r);
      } catch (e) { console.error(e); }
    })();
  }, []);

  if (!resume) return <div className="card">Loading preview...</div>;

  return (
    <div className="preview">
      <h1>{resume.headline || (resume.user ? resume.user.name : 'Candidate')}</h1>
      <p style={{fontStyle:'italic'}}>{resume.summary}</p>
      <h3>Skills</h3>
      <div>{(resume.skills || []).join(' • ')}</div>

      <h3 style={{marginTop:12}}>Projects</h3>
      {(resume.projects||[]).map((p, i) => (
        <div key={i} style={{marginBottom:8}}>
          <strong>{p.title}</strong>
          <div style={{fontSize:13}}>{p.description}</div>
          {p.link && <div style={{fontSize:13}}><a href={p.link}>{p.link}</a></div>}
        </div>
      ))}

      <h3 style={{marginTop:12}}>Achievements & Courses</h3>
      {(resume.achievements||[]).map((a,i)=>(<div key={i}>• {a.title} {a.date ? `(${new Date(a.date).toLocaleDateString()})`: ''}</div>))}
      {(resume.courses||[]).map((c,i)=>(<div key={i}>• {c.title} — {c.provider}</div>))}
    </div>
  );
}
