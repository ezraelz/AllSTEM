import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import './App.css'
import PublicRoute from './router/publicRoute';
import { useEffect, useState } from 'react';
import axios from './utils/axios';

import type { ReactElement } from 'react';
import Login from './pages/auth/login';

const ProtectedRoute = ({ element } : { element: ReactElement }) => {
  const isLoggedin = localStorage.getItem('access_token');
  return isLoggedin ? element : <Navigate to="/login" replace/>;
}

const App = () => {
  const { id } = useParams();
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(()=> {
    const fetchUserData = async () => {
    const token = localStorage.getItem('access_token');
    if (!token) return;
    if (!isLoggedin) return;
    try{
      const res =  await axios.get(`/user/me/${id}`, {
        headers: {Authorization: `Bearer ${token}`}
      });
      console.log(res.data);
      setIsLoggedin(true);
    }catch{
      setIsLoggedin(false);
    }
   }
   fetchUserData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/*' element={<ProtectedRoute element={<PublicRoute />}/>}/>
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
