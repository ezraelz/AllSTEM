import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/profile/profile';
import SignlePostcard from '../components/signlePostcard';

const Home = lazy(()=> import('../pages/home/home')); 

const PublicRoute = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/posts/detail/:id' element={<SignlePostcard />} />
      </Routes>
    </div>
  )
}

export default PublicRoute
