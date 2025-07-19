import React, { lazy, Suspense, useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './profile.css';
import { useParams } from 'react-router-dom';
import BackButton from '../../components/backButton';
import FriendFollow from './friendFollow';
import FriendButton from './FriendButton';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';
import ProfilePosts from './ProfilePosts';
import ProfileVideos from './ProfileVideos';
import ProfilePhotos from './ProfilePhotos';
import ProfileFriends from './profileFriends';

interface Post {
  id: number;
  author_username: string;
  author_profile_image: string;
  title: string;
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
  const [posts, setPosts] = useState<Post[]>([]);
  const [photos, setPhotos] = useState<Post[]>([]);
  const [videos, setVideos] = useState<Post[]>([]);
  const [friends, setFriends] = useState([]);
  const [user, setUser] = useState<User | undefined>();
  const [activeTab, setActiveTab] = useState<string>('Posts');
  const [isOwner, setIsOwner] = useState(false);

  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      const decoded: any = jwtDecode(token);
      if (!id || decoded.user_id === parseInt(id)) {
        setIsOwner(true);
      }
    }
  }, [id, token]);

  useEffect(() => {
    const fetchData = async () => {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      try {
        const postRes = await axios.get(`/posts/user/posts/${id}`, config);
        const allPosts: Post[] = postRes.data;
        setPosts(allPosts);
        setPhotos(allPosts.filter((post) => post.image));
        setVideos(allPosts.filter((post) => post.video));
      } catch (err) {
        toast.error('Error loading posts');
      }
    };

    if (id) fetchData();
  }, [id, token]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`/users/${id}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data);
      } catch {
        toast.error('Error loading user data');
      }
    };

    if (id) fetchUserData();
  }, [id, token]);

  useEffect(() => {
    const fetchFriendsData = async () => {
      if (!isOwner || !token) return;

      try {
        const res = await axios.get('/users/friend-requests/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFriends(res.data);
      } catch {
        toast.error('Error fetching friends data');
      }
    };

    fetchFriendsData();
  }, [isOwner, token]);

  const profileLinks = [
    { name: 'Posts', value: 'Posts', count: posts.length },
    { name: 'Photos', value: 'Photos', count: photos.length },
    { name: 'Videos', value: 'Videos', count: videos.length },
    ...(isOwner ? [{ name: 'Friends', value: 'Friends', count: friends.length }] : []),
    ...(isOwner ? [{ name: 'Followers', value: 'Followers', count: 0 }] : []),
    { name: 'Profile', value: 'More' },
  ];

  const renderTabs = () => (
    <div className="profile-tabs">
      {profileLinks.map((link) => (
        <button
          key={link.value}
          className={`button ${activeTab === link.value ? 'active' : ''}`}
          onClick={() => setActiveTab(link.value)}
        >
          {link.name}
          {'count' in link && <span>{link.count}</span>}
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
        return <ProfileFriends />;
      case 'Followers':
        return <FriendFollow targetUserId={id ? parseInt(id, 10) : 0} />;
      case 'Profile':
        return <div className="more-section">Additional Profile Info</div>;
      default:
        return <ProfilePosts />;
    }
  };

  return (
    <div className="profile-container">
      <BackButton />
      <div className="profile-top">
        <img src={''} alt="" className="profile-bg-img" />
        {user && <img src={user.profile_image} alt="Profile" />}
        <h4 className="profile-username">{user?.username}</h4>
        {id && isOwner === false && (
          <FriendButton targetUserId={parseInt(id, 10)} />
        )}
      </div>

      <div className="profile-content">
        <div className="profile-nav">{renderTabs()}</div>
        <div className="profile-main-content">
          {renderActiveTab()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
