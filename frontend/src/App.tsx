import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import PublicRoute from './router/publicRoute';
import type { ReactElement } from 'react';
import ScrollToTop from './router/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import Authenticate from './pages/auth/Authenticate';
import ProfileRoute from './router/profileRoute';
import axios from './utils/axios';
import Logout from './pages/auth/logout';
import Layout from './layout';
import { NavVisibilityProvider } from './context/NavVisibilityContext';

const ProtectedRoute = ({ element } : { element: ReactElement}) => {
  const isLoggedin = localStorage.getItem('access_token');
  return isLoggedin ? element : <Navigate to="/authenticate" replace/>;
}

const App = () => {
  // Check authentication status & refresh token if needed
  useEffect(() => {
    const checkAuthStatus = async () => {
      const accessToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!accessToken) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return;
      }

      try {
        const response = await axios.get('/api/auth/status/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          }
        });

        const data = response.data;
        if (!data.isAuthenticated && refreshToken) {
          const response = await axios.post('api/token/refresh/', {
            headers: {
            Authorization: `Bearer ${accessToken}`,
          }
          });

          const refreshData = response.data;
          if (refreshData.access) {
            localStorage.setItem('access_token', refreshData.access);
          } else {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
          }
        }
      } catch {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
      }
    };

    checkAuthStatus();
  }, []);
  return (
    <NavVisibilityProvider>
      <Router>
        
        <ToastContainer position="bottom-right" autoClose={3000} />
        <Suspense fallback={<div className="main">Loading Page...</div>}>
          <ScrollToTop />
          <Layout
            isLoggedIn={!!localStorage.getItem('access_token')}
          >
          <Routes>
            <Route path='/*' element={<ProtectedRoute element={<PublicRoute />}/>}/>
            <Route path='/profile/*' element={<ProtectedRoute element={<ProfileRoute />}/>}/>
            <Route path='/authenticate' element={<Authenticate />} />
            <Route path='/logout' element={<Logout/>} />
          </Routes>
          </Layout>
        </Suspense>
      </Router>
      </NavVisibilityProvider>
  )
}

export default App
