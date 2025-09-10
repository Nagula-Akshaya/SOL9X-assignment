import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../services/api';
export default function ProtectedRoute({ children, allowedRole }) {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  useEffect(() => { (async () => {
    const token = localStorage.getItem('token');
    if (!token) { setAuthorized(false); setLoading(false); return; }
    try { const res = await api.get('/auth/me'); if (allowedRole && res.user.role !== allowedRole) setAuthorized(false); else setAuthorized(true); } catch (err) { setAuthorized(false); }
    setLoading(false);
  })(); }, [allowedRole]);
  if (loading) return <div>Loading...</div>;
  if (!authorized) return <Navigate to='/login' replace />;
  return children;
}
