import React, { useEffect, useState } from 'react';
import './homeLeftTop.css';
import axios from '../../utils/axios';
import { useNavigate } from 'react-router-dom';

interface User{
    username: string;
    profile_image: string;
    role: string;
}
const HomeLeftTop = () => {
    const [user, setUser] = useState<User>();
    const [loading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUserData = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('access_token');
            if (!token) return;

            try{
                const res = await axios.get('/users/detail/', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setUser(res.data);
                console.log(res.data);
            }catch{
                console.log('Faild to fetch data')
                setIsLoading(false);
            }
        }
        fetchUserData();
    }, []);

    if(!loading) return;

  return (
    <div className='home-left-top'>
      <div className="home-left-top-container">
        <img src={`http://127.0.0.1:8000${user?.profile_image}`} alt="" className='home-left-top-pro-img'/>
        <input type="search"  title='search' placeholder='Search here' className='home-left-search'/>
      </div>
    </div>
  )
}

export default HomeLeftTop
