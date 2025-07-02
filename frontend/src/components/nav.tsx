import React, { useEffect, useState } from 'react';
import './nav.css';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { FaSearch, FaBell, FaUser, FaWarehouse, FaCalendar, FaPlay } from 'react-icons/fa';
import { MdGroups, MdLocationCity } from 'react-icons/md';
import Logo from '../assets/logo/logopng.png';
import messageIcon from '../assets/logo/messenger-icon.png';

interface NavProps {
  isLoggedIn: boolean;
} 

interface User{
    username: string;
    profile_image: string;
    role: string;
}

const BaseUrl = 'http://127.0.0.1:8000';

const Nav : React.FC<NavProps>  = () => {
    const [activeLink, setActiveLink] = useState<string | undefined>(undefined);
    const {isLoggedIn, setIsLoggedIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    
    const navigate = useNavigate();
    //fetch user data
    useEffect(()=>{
        const fetchUserData = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token');

            try{
                const res = await axios.get('/users/detail/', {
                    headers: {Authorization: `Bearer ${token}`}
                });
                setUser(res.data);
            }catch{
                console.log('Faild to fetch data')
            }
        }
        if (isLoggedIn) fetchUserData();
    }, [isLoggedIn]);

    const middlelinks = [
        {name: 'Home', link: '/', icon: <FaWarehouse/>},
        {name: 'Videos', link: '/videos', icon: <FaPlay/>},
        {name: 'Groups', link: '/groups', icon: <MdGroups/>},
        {name: 'Centers', link: '/', icon:<MdLocationCity/>},
        {name: 'Events', link: '/', icon:<FaCalendar/>},
    ]
    const navlinks = [
        {name: 'Search', to: '#', icon: <FaSearch />},
        {name: 'Message', to: '#', icon: <><img src={messageIcon} alt="" className='message-icon'/></>},
        {name: 'Notifications', to: '#', icon: <FaBell />},
        {name: 'Profile', 
            to: '/profile', 
            icon:isLoggedIn ? <img src={`${BaseUrl}${user?.profile_image}`} alt="" className='nav-pro-img'/> : <FaUser />,
            
        },
    ]
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    }, [location.pathname, setIsLoggedIn]); 
    if (!loading) return;
    
  return (
    <div className='nav'>
      <nav className='navbar-container'>
        <div className="brand">
            <h1><img src={Logo} alt="" /><span>AllSTEM</span></h1>
        </div>
        <div className="navbar-middle">
            <ul>
            {middlelinks.map((link)=>(
                <li key={link.name} onClick={()=> setActiveLink(link.link)}>
                    <button title={link.name} className={`link ${activeLink ? 'active' : ''}`}><Link to={link.link}>{link.icon}</Link></button>
                </li>
            ))}
            </ul>
        </div>
        <div className="navbar-content">
            <ul>
                {navlinks.map((link)=> (
                    <li key={link.name}>
                        <button title={link.name}><Link to={link.name}>{link.icon}</Link></button>
                    </li>
                ))}
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
