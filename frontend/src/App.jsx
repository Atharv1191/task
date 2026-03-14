import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Pending from './pages/Pending';
import Complete from './pages/Complete';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './index.css';

// ← Axios interceptor — har API call mein token automatically jayega
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

const App = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const token = localStorage.getItem('token');
    const stored = localStorage.getItem('currentUser');
    if (token && stored) return JSON.parse(stored);
    return null;
  });

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  const handleAuthSubmit = data => {
    if (data.token) {
      localStorage.setItem('token', data.token)  // ← token save
    }
    const user = {
      email: data.email,
      name: data.name || 'User',
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name || 'User')}&background=random`
    };
    setCurrentUser(user);
    navigate('/', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser')
    localStorage.removeItem('token')  // ← token bhi remove karo
    setCurrentUser(null)
    navigate('/login', { replace: true })
  }

  const ProtectedLayout = () => (
    <Layout user={currentUser} onLogout={handleLogout}>
      <Outlet />
    </Layout>
  );

  return (
    <Routes>
      <Route
        path="/login"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <Login onSubmit={handleAuthSubmit} onSwitchMode={() => navigate('/signup')} />
          </div>
        }
      />
      <Route
        path="/signup"
        element={
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <SignUp onSubmit={handleAuthSubmit} onSwitchMode={() => navigate('/login')} />
          </div>
        }
      />

      <Route
        element={
          currentUser
            ? <ProtectedLayout />
            : <Navigate to="/login" replace />
        }>
        <Route index element={<Dashboard />} />
        <Route path="pending" element={<Pending />} />
        <Route path="complete" element={<Complete />} />
        <Route
          path="profile"
          element={<Profile user={currentUser} setCurrentUser={setCurrentUser} onLogout={handleLogout} />}
        />
      </Route>

      <Route path="*" element={<Navigate to={currentUser ? '/' : '/login'} replace />} />
    </Routes>
  );
};

export default App;