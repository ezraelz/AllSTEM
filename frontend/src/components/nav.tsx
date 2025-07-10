import React, { useEffect, useState } from 'react';
import './nav.css';
import { useAuth } from '../context/AuthContext';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { FaSearch, FaBell, FaUser, FaCalendar, FaPlay, FaHome, FaFacebookMessenger} from 'react-icons/fa';
import {  MdLocationCity } from 'react-icons/md';
import Logo from '../assets/logo/logopng.png';

interface User{
    username: string;
    profile_image: string;
    role: string;
}

const BaseUrl = 'http://127.0.0.1:8000';

const Nav : React.FC  = () => {
    const [activeLink, setActiveLink] = useState<string | undefined>(undefined);
    const {isLoggedIn, setIsLoggedIn } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [scrolled, setScrolled] = useState<boolean>(false);
    const currentScroll = window.scrollY;
    const navigate = useNavigate();

    const handleScroll = ()=> {
        if (window.scrollY > 30){
            setScrolled(true);
        } else {
            setScrolled(false);
        }
    }

    useEffect(()=> {
        window.addEventListener('scroll', handleScroll);

        return ()=> window.removeEventListener('scroll', handleScroll);
    });

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
        {name: 'Home', link: '/', icon: <FaHome/>},
        {name: 'Videos', link: '/videos', icon: <FaPlay/>},
        {name: 'Centers', link: '/', icon:<MdLocationCity/>},
        {name: 'Events', link: '/', icon:<FaCalendar/>},
    ]
    const navlinks = [
        {name: 'Search', to: '#', icon: <FaSearch />},
        {name: 'Message', to: '#', icon: <FaFacebookMessenger />},
        {name: 'Notifications', to: '#', icon: <FaBell />},
        {name: 'Settings', 
            to: '/settings', 
            icon: <FaUser/>,
            
        },
    ]
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) setIsLoggedIn(true);
        else setIsLoggedIn(false);
    }, [location.pathname, setIsLoggedIn]); 
    if (!loading) return ;
    
  return (
    <div className={scrolled ? 'nav small' : 'nav'}>
      <nav className='navbar-container'>
        <div className="brand">
            <h1 onClick={()=> navigate('/')}><img src={Logo} alt="" /><span>AllSTEM</span></h1>
        </div>
        <div className="navbar-middle">
            <ul>
            {middlelinks.map((link)=>(
                <li key={link.name} onClick={()=> setActiveLink(link.link)}>
                    <button title={link.name} ><Link to={link.link} className={`link ${activeLink ? 'active' : ''}`}>{link.icon}</Link></button>
                </li>
            ))}
            </ul>
        </div>
        <div className="navbar-content">
            <ul>
                {navlinks.map((link)=> (
                    <li key={link.name}>
                        <button title={link.name}><Link to={link.name} className={`link ${activeLink ? 'active' : ''}`}>{link.icon}</Link></button>
                    </li>
                ))}
            </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
