import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import './App.css'
import PublicRoute from './router/publicRoute';
import { useEffect, useState } from 'react';
import axios from './utils/axios';

import type { ReactElement } from 'react';
import Login from './pages/auth/login';
import Nav from './components/nav';

const ProtectedRoute = ({ element } : { element: ReactElement }) => {
  const isLoggedin = localStorage.getItem('access_token');
  return isLoggedin ? element : <Navigate to="/login" replace/>;
}

const App = () => {
  const { id } = useParams();
  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [role, setRole] = useState('');
      
  useEffect(()=> {
    const checkAuthStat = async () => {
      const token = localStorage.getItem('access_token');
      try{
        if (!token) return;
        const res = await axios.get('/api/auth/status/', {
            headers: {Authorization: `Bearer ${token}`}
        });

        const data = res.data;
        setRole(data.role);
        setIsLoggedin(true);
      }catch(err){
        console.log('not authenticated', err);
        setIsLoggedin(false);
      }
    }
    checkAuthStat();
  }, []);


  return (
    <Router>
      <Nav />
      <Routes>
        <Route path='/*' element={<ProtectedRoute element={<PublicRoute />}/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
