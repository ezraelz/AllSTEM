import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/profile/profile';

const Home = lazy(()=> import('../pages/home/home')); 
const Login = lazy(()=> import('../pages/auth/login')) ;

const PublicRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />} />
    </Routes>
    </div>
  )
}

export default PublicRoute
