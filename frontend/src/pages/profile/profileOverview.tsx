import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import { useParams } from 'react-router-dom';
import { FaPeopleCarry, FaPodcast, FaUserFriends, FaUserPlus, FaUsers } from 'react-icons/fa';

const ProfileOverview = () => {
    const { id } = useParams<{id: string}>();
    const [posts, setPosts] = useState([]);
    const [friends, setFriends] = useState();
    const [followers, setFollowers] = useState();

    useEffect(()=> {
        const fetchData = async () => {
            const token = localStorage.getItem('access_token');
            const config = {headers: {Authorization : `Bearer ${token}`}};

            const [
                postRes, 
            ] = await Promise.all([
                axios.get(`/posts/user/posts/${id}`, config)
            ]);

            setPosts(postRes.data)
        }
        fetchData();
    }, []);

  return (
    <div className='profile-overview'>
      <p><FaPodcast /> Posts {posts.length}</p>
      <p><FaUserFriends /> Friends {posts.length}</p>
      <p><FaUserPlus/> Followers {posts.length}</p>
      <p><FaUsers /> Groups {posts.length}</p>
      
    </div>
  )
}

export default ProfileOverview
