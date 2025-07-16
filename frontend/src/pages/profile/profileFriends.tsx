import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import './profileFriends.css';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const token = localStorage.getItem('access_token');
let loggedInUserId = null;

if (token) {
  const decoded: any = jwtDecode(token);
  loggedInUserId = decoded.user_id; 
}

interface Friend{
  id: number;
  from_user: string;
  from_user_username: string;
  from_user_profile_image: string;
  to_user_username: string;
}

const BaseUrl = 'http://127.0.0.1:8000';

const ProfileFriends = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [sent, setSent] = useState<Friend[]>([]);
  const [activeTab, setActiveTab] = useState('');

  const isOwner = !id || id === loggedInUserId;

  useEffect(()=>{
    const fetchPostData = async ()=>{
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try{
        const res = await axios.get(`/users/friends/`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setFriends(res.data);
        console.log(res.data);
      }catch(err){
        console.log('error during fetch', err)
      }
    }
    fetchPostData();
  }, []);

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try{
        const res = await axios.get(`/users/friend-requests/`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setRequests(res.data);
        console.log(res.data);
      }catch(err){
        console.log('error during fetch', err)
      }
    }
    fetchData();
  }, []);

  useEffect(()=>{
    const fetchData = async ()=>{
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try{
        const res = await axios.get(`/users/friend-request-sent/`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setSent(res.data);
        console.log(res.data);
      }catch(err){
        console.log('error during fetch', err)
      }
    }
    fetchData();
  }, []);

  const friendRequests = ()=> {
    return(
      <div className="requests">
        {requests.length > 0 ? (
            <>
              {requests.map((request)=>(
                  <div className="request" key={request.id}>
                      <div className="card-content">
                          <img src={`${BaseUrl}${request.from_user_profile_image}`} alt="" />
                          <p>{request.from_user_username}</p>
                          <div className="button-group">
                            <button title='accept' className="accept">Accept</button>
                            <button title='reject' className="reject">Reject</button>
                          </div>
                      </div>
                  </div>
              ))}
            </>
        ) : (
            <><p>You have no requests yet</p></>
        )}
      </div>
    )
  }

  const sentRequests = ()=> {
    return(
      <div className="sent-request">
        {sent.length > 0 ? 
        <>
          {sent.map((sent)=>(
            <div className="sent-card">
              <img src={sent.from_user_profile_image} alt="" />
              <p>{sent.to_user_username}</p>
            </div>
          ))}
        </>
        : 
        <>
          <p>no sent request found!</p>
        </> 
        }
      </div>
    )
  }

  const Friends = ()=> {
    return(
      <div className='profile-friends'>
        {friends.length > 0 ? (
          <>
            {friends.map((friend)=>(
                <div className="photos" key={friend.id}>
                    <div className="card-content">
                        <img src={`${BaseUrl}${friend.from_user_profile_image}`} alt="" />
                    </div>
                </div>
            ))}
          </>
        ) : (
          <><p>You have no friends to connect..</p></>
        )}
      </div>
    )
  }

  const tabs = [
    {name: 'Requests', link: '' },
    {name: 'Sent', link: ''},
    {name: 'Friends', link: ''},
  ]

  const renderActiveTab = ()=> {
    switch(activeTab){
      case 'Requests':
        return <>{friendRequests()}</>
      case 'Sent':
        return <>{sentRequests()}</>
      case 'Friends':
        return <>{Friends()}</>
      default:
        return<>{Friends()}</>
    }
  }

  return (
    <div className='profile-friend'>
      <div className="reqeust-buttons">
        {tabs.map((tab)=>(
          <>
            <button 
              title={tab.name} 
              key={tab.name}
              onClick={()=> setActiveTab(tab.name)}>
                {tab.name}
            </button>
          </>
        ))}
      </div>
      <div className="profile-friends-status">
        {renderActiveTab()}
      </div>
    </div>
  )
}

export default ProfileFriends
