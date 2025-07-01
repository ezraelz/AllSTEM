import React, { useEffect, useState } from 'react';
import './nav.css';
import { Navigate, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { FaSearch, FaEnvelope, FaBell, FaUser, FaWarehouse, FaVideo, FaPeopleCarry, FaCalendar } from 'react-icons/fa';
import { MdGroups } from 'react-icons/md';

const Nav = () => {
    const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
    const [role, setRole] = useState('');
    
    const navigate = useNavigate();

    const middlelinks = [
        {name: 'Home', link: '/', icon: <FaWarehouse/>},
        {name: 'Videos', link: '/videos', icon: <FaVideo/>},
        {name: 'Groups', link: '/groups', icon: <MdGroups/>},
        {name: 'Events', link: '/', icon:<FaCalendar/>},
    ]

    const navlinks = [
        {name: 'Search', to: '#', icon: <FaSearch />},
        {name: 'Message', to: '#', icon: <FaEnvelope />},
        {name: 'Notifications', to: '#', icon: <FaBell />},
        {name: 'Profile', to: '#', icon: <FaUser />},
    ]
    
  return (
    <div className='nav'>
      <nav className='navbar-container'>
        <div className="brand">
            <h1>AllSTEM</h1>
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
