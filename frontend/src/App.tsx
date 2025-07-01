import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import './App.css'
import PublicRoute from './router/publicRoute';
import { useEffect, useState } from 'react';
import axios from './utils/axios';

import type { ReactElement } from 'react';
import Login from './pages/auth/login';
import Nav from './components/nav';
import Logout from './pages/auth/logout';
import { NavVisibilityProvider } from './context/NavVisibilityContext';
import Layout from './layout';
import ScrollToTop from './router/ScrollToTop';
import { ToastContainer } from 'react-toastify';
import Authenticate from './pages/auth/Authenticate';

const ProtectedRoute = ({ element } : { element: ReactElement }) => {
  const isLoggedin = localStorage.getItem('access_token');
  return isLoggedin ? element : <Navigate to="/authenticate" replace/>;
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [isLoggedin, setIsLoggedin] = useState<boolean>(true);
      
  useEffect(()=> {
    const token = localStorage.getItem('access_token');
    if (!token) {
      setIsLoggedin(false);
      setLoading(false);
    } else {
      setIsLoggedin(true);
    }
  })

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

  // Cart state and handlers
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
          <Route path='/authenticate' element={<Authenticate />} />
          
        </Routes>
        </Layout>
        </Suspense>
      </Router>
    </NavVisibilityProvider>
  )
}

export default App
