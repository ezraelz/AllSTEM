import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './profile.css';
import ProfilePosts from './profilePosts';
import ProfileVideos from './profileVideos';
import ProfilePhotos from './profilePhotos';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/backButton';

interface User {
  username: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  joined_at: string;
}

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();
  const [activeTab, setActiveTab] = useState<string>('Posts'); // default tab

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('access_token');
      const res = await axios.get(`/users/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    };
    fetchUserData();
  }, []);

  const profile_links = [
    { name: 'Posts', value: 'Posts' },
    { name: 'Photos', value: 'Photos' },
    { name: 'Videos', value: 'Videos' },
    { name: 'Friends', value: 'Friends' },
    { name: 'Followers', value: 'Followers' },
    { name: 'Profile', value: 'More' },
  ];

  const renderTabs = () => (
    <div className="profile-tabs">
      {profile_links.map((link) => (
        <button
          key={link.value}
          className={`button ${activeTab === link.value ? 'active' : ''}`}
          onClick={() => setActiveTab(link.value)}
        >
          {link.name}
        </button>
      ))}
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Posts':
        return <ProfilePosts />;
      case 'Videos':
        return <ProfileVideos />;
      case 'Photos':
        return <ProfilePhotos />;
      case 'Friends':
        return <ProfilePhotos />;
      case 'Followers':
        return <ProfilePhotos />;
      case 'Profile':
        return <ProfilePhotos />;
      default:
        return <ProfilePosts />;
    }
  };

  return (
    <div className="profile-container">
      <BackButton />
      <div className="profile-top">
        <img src={''} alt="" className="profile-bg-img" />
        {user && <img src={`http://127.0.0.1:8000${user.profile_image}`} alt="Profile" />}
      </div>

      <div className="profile-content">
        <div className="profile-nav">
          {renderTabs()}
        </div>
        <div className="profile-main-content">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
