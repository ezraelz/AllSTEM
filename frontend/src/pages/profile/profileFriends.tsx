import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import './profilePhotos.css';
import { useParams } from 'react-router-dom';

interface Friend{
  id: number;
  author_username: string;
  author_profile_image: string;
  title:string;
  description: string;
  image: string;
  tag: string;
  posted_at: string;
}

const BaseUrl = 'http://127.0.0.1:8000';

const ProfileFriends = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState<Friend[]>([]);

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

  return (
    <div className='profile-photos'>
      {friends.length > 0 ? (
        <>
          {friends.map((photo)=>(
              <div className="photos" key={photo.title}>
                  <div className="card-content">
                      <img src={`${BaseUrl}${photo.image}`} alt="" />
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

export default ProfileFriends
