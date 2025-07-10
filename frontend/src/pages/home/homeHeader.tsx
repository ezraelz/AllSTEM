import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './homeHeader.css';
import ScrollLeft from '../../components/scrollLeft';
import { useNavigate, useParams } from 'react-router-dom';

interface User{
    id: number,
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

const BaseUrl = 'http://127.0.0.1:8000';

const HomeHeader = () => {
    const { id } = useParams();
    const [scrolledLeft, setScrolledLeft] = useState<boolean>(false)
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState<User>();
    const [users, setUsers] = useState<User[]>([]);
    const [post, setPost] = useState();
    const navigate = useNavigate();

    const handleScrollled = () => {
        setScrolledLeft(true);
    }

    useEffect(()=>{
        const fetchUserData = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            const res = await axios.get('/users/detail/', {
                headers: {Authorization: `Bearer ${token}`}
            });
            setUser(res.data);
            console.log(res.data);
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
        <img src={`${BaseUrl}${user?.profile_image}`} alt="pi" className='user-pic' onClick={() => navigate(`/profile/${user?.id}/`)}/>
        {users.map((user)=>(
            <div className='header-card' key={user.id} onClick={() => navigate(`/profile/${user.id}/`)}>
                <img src={`${BaseUrl}${user.profile_image}`} alt="pi" />
                <div className="user-info">{user.username}</div>
            </div>
        ))}

        <ScrollLeft onScrolled={handleScrollled} isScrolled={scrolledLeft}/>
      </div>
    </div>
  )
}

export default HomeHeader
