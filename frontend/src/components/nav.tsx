import React, { useEffect, useState } from 'react';
import './nav.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { FaSearch, FaEnvelope, FaBell, FaUser } from 'react-icons/fa';

const Nav = () => {
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    
    useEffect(()=> {
        const checkAuthStat = async () => {
            const token = localStorage.getItem('access_token');
            try{
                if (!token) return;
                const res = await axios.get('/api/auth/status/', {
                    headers: {Authorization: `Bearer ${token}`}
                });

                const data = res.data;
                setRole(data.role);
                setIsLoggedin(true);
                navigate('/');
            }catch(err){
                console.log('not authenticated', err);
                setIsLoggedin(false);
                navigate('/login');
            }
        }
        checkAuthStat();
    }, []);

    const navlinks = [
        {name: 'Search', to: '#', icon: <FaSearch />},
        {name: 'Message', to: '#', icon: <FaEnvelope />},
        {name: 'Notifications', to: '#', icon: <FaBell />},
        {name: 'Profile', to: '#', icon: <FaUser />},
    ]

    if (!isLoggedin) return;

  return (
    <div className='nav'>
      <nav className='navbar-container'>
        <div className="brand">
            <h1>AllSTEM</h1>
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
