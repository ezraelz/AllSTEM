import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';

interface Post{
    id: number;
    title: string;
    description: string;
    image: string;
    tag: string;
    author_username: string;
    author_profile_image: string;
    posted_at: number;
}

const SignlePostcard = () => {
    const { id } = useParams<{id: string}>();
    const [post, setPost] = useState<Post>();
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const fetchPostData = async () =>{
            setLoading(true);
            const token = localStorage.getItem('access_token');
            if (!token) return;
            const res = await axios.get(`/posts/detail/${id}`, {
                headers: {Authorization: `Bearer ${token}`}
            });

            setPost(res.data);
            console.log(res.data);
        }
        if(id) fetchPostData();
    }, [id]);

    if (!loading) return(<>Loading...</>)

  return (
    <div className='single-post'>
      <div className="single-post-card">
        <div className="card-top">
            <img src={`http://127.0.0.1:8000${post?.author_profile_image}`} alt="" />
            <p className='card-title'>{post?.title} <span>By {post?.author_username}</span></p>  
            <p className='posted_at'>
                {format(new Date(post?.posted_at), 'PPP')}
            </p>
        </div>
        <div className="card-content">
            <img src={`http://127.0.0.1:8000${post?.image}`} alt="" />
            <p>{post?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default SignlePostcard
