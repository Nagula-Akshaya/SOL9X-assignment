import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import DashboardRedirect from './pages/DashboardRedirect';
import ProtectedRoute from './components/ProtectedRoute';
function App(){ return (<Routes>
  <Route path='/login' element={<Login/>} />
  <Route path='/signup' element={<Signup/>} />
  <Route path='/dashboard' element={<ProtectedRoute><DashboardRedirect/></ProtectedRoute>} />
  <Route path='/admin' element={<ProtectedRoute allowedRole='admin'><AdminDashboard/></ProtectedRoute>} />
  <Route path='/student' element={<ProtectedRoute allowedRole='student'><StudentDashboard/></ProtectedRoute>} />
  <Route path='*' element={<Login/>} />
</Routes>); }
export default App;
