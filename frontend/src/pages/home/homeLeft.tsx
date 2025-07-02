import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './homeLeft.css';
import { FaUserFriends, FaUserPlus } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoIosContacts } from 'react-icons/io';
import { MdGroups } from 'react-icons/md';
import { Link } from 'react-router-dom';

const HomeLeft = () => {

  const leftLinks = [
      {name: 'Friends', link: '/', icon:<FaUserFriends/>},
      {name: 'Followers', link: '/', icon:<FaUserPlus/>},
      {name: 'Groups', link: '/', icon:<MdGroups/>},
      {name: 'Contacts', link: '/', icon:<IoIosContacts/>},
  ]

  return (
    <div className='home-left-container'>
        <ul>
        {leftLinks.map((link)=>(
            <li key={link.name}>
                <button key={link.name} title={link.name}><Link to={link.link} className='link'><span>{link.icon}</span></Link></button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default HomeLeft
