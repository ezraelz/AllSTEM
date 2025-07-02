import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import './profile.css';

interface User{
    username: string;
    first_name: string;
    last_name: string;
    profile_image:string;
    joined_at: string;
}

const Profile = () => {
  const [user, setUser] = useState<User>();
  const [activeTab, setActiveTab] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    const fetchUserData = async () => {
        const token = localStorage.getItem('access_token');
        const res = await axios.get('/users/me/', {
            headers: {Authorization: `Bearer ${token}`}
        });
        setUser(res.data);
    }
    fetchUserData();
  }, []);
  const profile_links = [
    {name: 'Posts', link: '/posts'},
    {name: 'Photos', link: '/photos'},
    {name: 'Videos', link: '/videos'},
  ]
  const renderTab = () => {
    return (
        <div className="profile-tabs">
            {profile_links.map((link)=>(
                <div className="button">
                    <button title={link.name}>{link.name}</button>
                </div>
            ))}
        </div>
    )
  }
  return (
    <div className='profile-container'>
      <div className="profile-top">
        <img src={''} alt="" className='profile-bg-img'/>
        <img src={`http://127.0.0.1:8000${user?.profile_image}`} alt="" />
      </div>
      <div className="profile-right-side">

      </div>
      <div className="profile-content">
        <div className="profile-nav">
            {renderTab()}
        </div>
      </div>
    </div>
  )
}

export default Profile
