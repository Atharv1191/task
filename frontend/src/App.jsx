import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Pending from './pages/Pending';
import Complete from './pages/Complete';
import Profile from './components/Profile';
import Login from './components/Login';
import SignUp from './components/SignUp';
import './index.css';

const App = () => {
  const navigate = useNavigate();
 const [currentUser, setCurrentUser] = useState(() => {
  const token = localStorage.getItem('token');
  const stored = localStorage.getItem('currentUser');

  // Dono hone chahiye — sirf user object se auto-login mat karo
  if (token && stored) {
    return JSON.parse(stored);
  }

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
  // Token backend response se aana chahiye
  if (data.token) {
    localStorage.setItem('token', data.token);  // ← token save karo
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
  localStorage.removeItem('currentUser') // ← bas yahi kaafi hai
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