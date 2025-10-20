import React, { useEffect, useState } from 'react';
import { apiFetch } from '../api';
import { useNavigate } from 'react-router-dom';

export default function ResumeEditor({ auth }) {
  const nav = useNavigate();
  const [resume, setResume] = useState({ skills: [], projects: [], courses: [], achievements: [] });
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState('');

  useEffect(()=>{
    if (!auth?.token) return;
    (async ()=>{
      try {
        const r = await apiFetch('/resumes/me', { token: auth.token });
        setResume(r);
      } catch (e) { console.error(e); }
      setLoading(false);
    })();
  }, [auth]);

  if (!auth?.token) return <div className="card">Please login</div>;

  function updateField(field, value) {
    setResume(prev => ({ ...prev, [field]: value }));
  }

  async function save() {
    try {
      const r = await apiFetch('/resumes/me', { method: 'PUT', body: resume, token: auth.token });
      setResume(r);
      setMsg('Saved');
      setTimeout(()=>setMsg(''), 2000);
    } catch (e) { setMsg(e.message); }
  }

  async function generateSummary() {
    try {
      const res = await apiFetch('/resumes/me/generate-summary', { method:'POST', token: auth.token });
      setResume(res.resume);
      setMsg('Summary generated');
    } catch (e) { setMsg(e.message); }
  }

  return (
    <div className="card">
      <h2>Resume Editor</h2>
      {loading ? <div>Loading...</div> : (
        <div className="flex">
          <div style={{flex:1}} className="col">
            <input placeholder="Headline" value={resume.headline||''} onChange={e=>updateField('headline', e.target.value)} />
            <textarea placeholder="Summary (auto or custom)" value={resume.summary||''} onChange={e=>updateField('summary', e.target.value)} rows={4} />
            <input placeholder="Skills (comma separated)" value={(resume.skills||[]).join(', ')} onChange={e=>updateField('skills', e.target.value.split(',').map(s=>s.trim()))} />
            <div>
              <h4>Projects</h4>
              {(resume.projects||[]).map((p, idx) => (
                <div key={idx} className="card" style={{marginBottom:8}}>
                  <input placeholder="Title" value={p.title||''} onChange={e=> {
                    const arr = [...resume.projects]; arr[idx].title = e.target.value; updateField('projects', arr);
                  }} />
                  <textarea placeholder="Desc" value={p.description||''} onChange={e=> {
                    const arr = [...resume.projects]; arr[idx].description = e.target.value; updateField('projects', arr);
                  }} />
                </div>
              ))}
              <button className="btn" onClick={() => updateField('projects', [...(resume.projects||[]), { title:'', description:'', technologies:[] }])}>Add project</button>
            </div>
            <div style={{marginTop:8}}>
              <button className="btn" onClick={save}>Save</button>
              <button className="btn" style={{marginLeft:8}} onClick={generateSummary}>Auto-generate Summary</button>
              <button className="btn" style={{marginLeft:8}} onClick={()=>nav('/preview')}>Preview</button>
            </div>
            {msg && <div className="small-muted">{msg}</div>}
          </div>
          <div style={{width:340}}>
            <h3 style={{color:'#cbd5e1'}}>Live Preview</h3>
            <iframe title="preview" src="/preview" style={{width:'100%', height:420, border:'none', borderRadius:8}} />
          </div>
        </div>
      )}
    </div>
  );
}
