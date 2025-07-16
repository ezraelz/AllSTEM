import React, { lazy, use, useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './profile.css';
const ProfilePosts = lazy(()=> import('./profilePosts'));
const ProfileVideos = lazy(()=> import('./profileVideos'));
const ProfilePhotos = lazy(()=> import ('./profilePhotos'));
import { useParams } from 'react-router-dom';
import BackButton from '../../components/backButton';
import FriendFollow from './friendFollow';
import FriendButton from './FriendButton';
import { toast } from 'react-toastify';
const ProfileFriends = lazy(()=> import('./profileFriends'));

interface Post{
  id: number;
  author_username: string;
  author_profile_image: string;
  title:string;
  description: string;
  image: string;
  video: string;
  tag: string;
  posted_at: string;
}

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  profile_image: string;
  joined_at: string;
}

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Post[]>([]);
  const [videos, setVideos] = useState<Post[]>([]);
  const [friends, setFriends] = useState([]);
  const [followers, setFollowers] = useState();
  const [user, setUser] = useState<User>();
  const [activeTab, setActiveTab] = useState<string>('Posts'); // default tab

  useEffect(()=> {
    const fetchData = async () => {
        const token = localStorage.getItem('access_token');
        const config = {headers: {Authorization : `Bearer ${token}`}};

        const [
            postRes, 
        ] = await Promise.all([
            axios.get(`/posts/user/posts/${id}`, config)
        ]);

        const allPosts: Post[] = postRes.data;
        setPosts(allPosts);
        setPhotos(allPosts.filter(post => post.image));
        setVideos(allPosts.filter(post => post.video));
    }
    fetchData();
  }, []);

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

  useEffect(()=>{
    const fetchFriendsData = async ()=>{
      setLoading(true);
      const token = localStorage.getItem('access_token');
      try{
        const res = await axios.get('/users/friend-requests/',{
        headers: {Authorization: `Bearer ${token}`}});
        setFriends(res.data);
        console.log('friends data', res.data);
      }catch{
        toast.error('error fetching friends data');
      }
    }
    fetchFriendsData();
  }, []);

  const profile_links = [
    { name: 'Posts', value: 'Posts' , count: posts.length},
    { name: 'Photos', value: 'Photos', count: photos.length},
    { name: 'Videos', value: 'Videos' , count: videos.length},
    { name: 'Friends', value: 'Friends', count: friends.length },
    { name: 'Followers', value: 'Followers', count: posts.length },
    { name: 'Profile', value: 'More' },
  ];

  const renderTabs = () => (
    <div className="profile-tabs">
      {profile_links.map((link) => (
        <>
          <button
            key={link.value}
            className={`button ${activeTab === link.value ? 'active' : ''}`}
            onClick={() => setActiveTab(link.value)}
          >
            {link.name} <span>{link.count}</span>
          </button>
          
        </>
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
        return <ProfileFriends />;
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
        {user && <img src={`${user.profile_image}`} alt="Profile" />}
        <h4 className='profile-username'>{user?.username}</h4>
        {id && <FriendButton targetUserId={parseInt(id, 10)} />}
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
