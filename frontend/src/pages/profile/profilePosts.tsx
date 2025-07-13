import React, { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import axios from '../../utils/axios';
import { format } from 'date-fns';
import './profilePosts.css'

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

const ProfilePosts = () => {
  const { id } = useParams<{id: string}>();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(()=>{
    const fetchPostData = async ()=>{
      setLoading(true);
      const token = localStorage.getItem('access_token');
      if (!token) return;
      try{
        const res = await axios.get(`/posts/user/posts/${id}`, {
          headers: {Authorization: `Bearer ${token}`}
        });
        setPosts(res.data);
      }catch(err){
        console.log('error during fetch', err)
      }
    }
    fetchPostData();
  }, []);

  return (
    <div className='profile-posts'>
      {loading ? (
        <>
          {posts.map((post)=>(
              <div className="card" key={post.title}>
                  <div className="card-top">
                      <img src={`${BaseUrl}${post.author_profile_image}`} alt="" />
                      <p className='card-title'>{post.title} <span>By {post.author_username}</span></p>  
                      <p className='posted_at'>
                          {format(new Date(post.posted_at), 'PPP')}
                      </p>
                  </div>
                  <div className="card-content">
                      <img src={`${BaseUrl}${post.image}`} alt="" />
                      <p>{post.description}</p>
                  </div>
              </div>
          ))}
        </>
      ) : (
        <><p>Loading Posts...</p></>
      )}
    </div>
  )
}

export default ProfilePosts
