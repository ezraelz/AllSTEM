import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Profile from '../pages/profile/profile';
import OtherUserProfile from '../pages/profile/userProfileView';

const ProfilePosts = lazy(()=> import('../pages/profile/profilePosts')); 
const Login = lazy(()=> import('../pages/auth/login')) ;

const ProfileRoute = () => {
  return (
    <div>
      <Routes>
        <Route index element={<Profile />} />
        <Route path="/posts" element={<ProfilePosts />} />
        <Route path='/:id/' element={<Profile /> } />
      </Routes>
    </div>
  )
}

export default ProfileRoute
