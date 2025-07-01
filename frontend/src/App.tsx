import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import './App.css'
import PublicRoute from './router/publicRoute';
import { useEffect, useState } from 'react';
import axios from './utils/axios';

import type { ReactElement } from 'react';
import Login from './pages/auth/login';
import Nav from './components/nav';
import Logout from './pages/auth/logout';

const ProtectedRoute = ({ element } : { element: ReactElement }) => {
  const isLoggedin = localStorage.getItem('access_token');
  return isLoggedin ? element : <Navigate to="/login" replace/>;
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

  return (
    <Router>
      {loading && isLoggedin && <Nav />}
      
      <Routes>
        <Route path='/*' element={<ProtectedRoute element={<PublicRoute />}/>}/>
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </Router>
  )
}

export default App
