import React, { useEffect, useState } from 'react'
import axios from '../../utils/axios';
import './profilePhotos.css';

interface Post{
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

const ProfilePhotos = () => {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<Post[]>([]);

  useEffect(()=>{
    const fetchPostData = async ()=>{
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try{
        const res = await axios.get('/posts/user/posts/', {
          headers: {Authorization: `Bearer ${token}`}
        });
        setPhotos(res.data);
        console.log(res.data);
      }catch(err){
        console.log('error during fetch', err)
      }
    }
    fetchPostData();
  }, []);

  return (
    <div className='profile-photos'>
      {loading ? (
        <>
          {photos.map((photo)=>(
              <div className="photos" key={photo.title}>
                  <div className="card-content">
                      <img src={`${BaseUrl}${photo.image}`} alt="" />
                  </div>
              </div>
          ))}
        </>
      ) : (
        <><p>Loading Photos...</p></>
      )}
    </div>
  )
}

export default ProfilePhotos
