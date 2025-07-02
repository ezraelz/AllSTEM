import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './homeLeft.css';
import { FaUserFriends, FaUserPlus, FaUsers } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { IoIosContacts } from 'react-icons/io';
import { MdGroups } from 'react-icons/md';
import { Link } from 'react-router-dom';
import HomeRightPeople from './homeRight/homeRightPeople';
import HomeRightFollower from './homeRight/homeRightFollower';
import HomeRightContact from './homeRight/homeRightContact';
import HomeRightFriends from './homeRight/homeRightFriends';
import HomeRightGroup from './homeRight/homeRightGroup';

const HomeLeft = () => {
  const [activeTab, setActiveTab] = useState<string>();

  const leftLinks = [
      {name: 'People', link: '/', icon:<FaUsers/>},
      {name: 'Friends', link: '/', icon:<FaUserFriends/>},
      {name: 'Followers', link: '/', icon:<FaUserPlus/>},
      {name: 'Groups', link: '/', icon:<MdGroups/>},
      {name: 'Contacts', link: '/', icon:<IoIosContacts/>},
  ]

  const renderActiveTab = ()=> {
    switch(activeTab){
      case 'People':
        return <HomeRightPeople />
      case 'Friends':
        return <HomeRightFriends />
      case 'Followers':
        return <HomeRightFollower />
      case 'Groups':
        return <HomeRightGroup />
      case 'Contacts':
        return <HomeRightContact />
      default:
        return <HomeRightPeople />
    }
  }

  return (
    <div className='home-left-container'>
      <div className="home-left-container-nav">
        <ul>
          {leftLinks.map((link)=>(
              <li key={link.name} onClick={()=> setActiveTab(link.name)}>
                  <button key={link.name} title={link.name}><Link to={link.link} className='link'><span>{link.icon}</span></Link></button>
              </li>
          ))}
        </ul>
      </div>
      <div className="home-left-container-content">
          {renderActiveTab()}
      </div>
    </div>
  )
}

export default HomeLeft
