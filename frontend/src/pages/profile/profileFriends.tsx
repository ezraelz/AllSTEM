import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import './profileFriends.css';
import { useParams } from 'react-router-dom';

interface Friend{
  id: number;
  from_user: string;
  from_user_username: string;
  from_user_profile_image: string;
}

const BaseUrl = 'http://127.0.0.1:8000';

const ProfileFriends = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]);

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
    const fetchPostData = async ()=>{
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
    fetchPostData();
  }, []);

  return (
    <>
    <div className="friends-requests">
        {requests.length > 0 ? (
            <>
            <h4>Requests</h4>
            {requests.map((request)=>(
                <div className="request" key={request.id}>
                    <div className="card-content">
                        <img src={`${request.from_user_profile_image}`} alt="" />
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
    </>
  )
}

export default ProfileFriends
