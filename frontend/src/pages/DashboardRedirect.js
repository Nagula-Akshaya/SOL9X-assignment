import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
export default function DashboardRedirect(){ const navigate = useNavigate(); useEffect(()=>{(async()=>{ try{ const res = await api.get('/auth/me'); if(res.user.role==='admin') navigate('/admin'); else navigate('/student'); }catch(err){ navigate('/login'); } })();},[navigate]); return <div>Redirecting...</div>; }
