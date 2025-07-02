import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './homeHeader.css';

interface User{
    id: number,
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

const HomeHeader = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const [post, setPost] = useState();

    useEffect(()=>{
        const fetchUserData = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            const res = await axios.get('/users/detail/', {
                headers: {Authorization: `Bearer ${token}`}
            });
            setUser(res.data);
        }
        fetchUserData();
    }, []);

    useEffect(()=>{
        const fetchUsersData = async () => {
            const token = localStorage.getItem('access_token');
            const res = await axios.get('/users/list/', {
                headers: {Authorization: `Bearer ${token}`}
            });
            setUsers(res.data);
        }
        fetchUsersData();
    }, []);

    if (!loading) return;

  return (
    <div className='home-header hide-scrollbar'>
      <div className="home-header-container">
        <img src={`http://127.0.0.1:8000${user?.profile_image}`} alt="" />
        {users.map((user)=>(
            <img key={user.id} src={`http://127.0.0.1:8000${user.profile_image}`} alt="" />
        ))}
      </div>
    </div>
  )
}

export default HomeHeader
