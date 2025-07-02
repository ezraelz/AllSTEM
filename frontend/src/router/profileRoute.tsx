import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/profile/profile';

const ProfilePosts = lazy(()=> import('../pages/profile/profilePosts')); 
const Login = lazy(()=> import('../pages/auth/login')) ;

const ProfileRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Profile />} />
        <Route path="/posts" element={<ProfilePosts />} />
      </Routes>
    </div>
  )
}

export default ProfileRoute
