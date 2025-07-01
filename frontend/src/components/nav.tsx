import React, { useEffect, useState } from 'react';
import './nav.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { FaSearch, FaEnvelope, FaBell, FaUser, FaWarehouse, FaVideo, FaPeopleCarry, FaCalendar, FaPlay } from 'react-icons/fa';
import { MdGroups, MdLocationCity } from 'react-icons/md';
import Logo from '../assets/logo/logopng.png';

interface User{
    username: string;
    profile_image: string;
    role: string;
}
const Nav = () => {
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUserData = async () => {
            setIsLoggedin(true);
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
                setIsLoggedin(false);
                navigate('/login');
            }
        }
        fetchUserData();
    }, []);

    const middlelinks = [
        {name: 'Home', link: '/', icon: <FaWarehouse/>},
        {name: 'Videos', link: '/videos', icon: <FaPlay/>},
        {name: 'Groups', link: '/groups', icon: <MdGroups/>},
        {name: 'Centers', link: '/', icon:<MdLocationCity/>},
        {name: 'Events', link: '/', icon:<FaCalendar/>},
    ]

    const navlinks = [
        {name: 'Search', to: '#', icon: <FaSearch />},
        {name: 'Message', to: '#', icon: <FaEnvelope />},
        {name: 'Notifications', to: '#', icon: <FaBell />},
        {name: 'Profile', to: '#', icon:isLoggedin ? <img src={`http://127.0.0.1:8000${user?.profile_image}`} alt="" className='nav-pro-img'/> : <FaUser />},
    ]
    
  return (
    <div className='nav'>
      <nav className='navbar-container'>
        <div className="brand">
            <h1><img src={Logo} alt="" /><span>AllSTEM</span></h1>
        </div>
        <div className="navbar-middle">
            <ul>
            {middlelinks.map((link)=>(
                <li key={link.name}>
                    <button>{link.icon}</button>
                </li>
            ))}
            </ul>
        </div>
        <div className="navbar-content">
            <ul>
                {navlinks.map((link)=> (
                    <li key={link.name}>
                        <button onClick={()=> <Navigate to={link.to}/>}>{link.icon}</button>
                    </li>
                ))}
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
