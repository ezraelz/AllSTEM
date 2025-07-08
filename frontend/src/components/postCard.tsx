import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './postCard.css';
import { format } from 'date-fns';
import { FaComment } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

interface User{
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

interface Post{
    id: number;
    author: string;
    author_username: string;
    author_profile_image: string;
    title: string;
    image: string;
    posted_at: number;
    description: string;
    tag: string;
}

const PostCard = () => {
    const { id } = useParams();
    const [user, setUser] = useState<User>();
    const [post, setPost] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(()=> {
        const fetchUserData = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            try{
                const res = await axios.get('/users/me/',{
                    headers: {Authorization: `Bearer ${token}`}
                })
                setUser(res.data);
            } catch (err){
                console.log('error during user fetch data', err);
                setLoading(false);
            }
        }
        fetchUserData();
    }, []);

    useEffect(()=> {
        const fetchPostData = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            try{
                const res = await axios.get('/posts/list/',{
                    headers: {Authorization: `Bearer ${token}`}
                })
                setPost(res.data);
            } catch (err){
                console.log('error during user fetch data', err);
                setLoading(false);
            }
        }
        fetchPostData();
    }, []);

  return (
    <div className='card-container'>
        {loading ? (
            <>
                {post.map((post)=>(
                    <>
                        <div className="card" key={post.title} onClick={()=> navigate(`/posts/detail/${post.id}/`)}>
                            <div className="card-top">
                                <img src={`http://127.0.0.1:8000${post.author_profile_image}`} alt="" />
                                <p className='card-title'>{post.title} <span>By {post.author_username}</span></p>  
                                <p className='posted_at'>
                                    {format(new Date(post.posted_at), 'PPP')}
                                </p>
                            </div>
                            <div className="card-content">
                                <img src={`http://127.0.0.1:8000${post.image}`} alt="" />
                                <p>{post.description}</p>
                            </div>
                        </div>
                        <div className="comment">
                            <button type='button' title='comment'><FaComment/></button>
                        </div>
                    </>
                ))}
            </>
        ) : (
            <>
                <p>Loading posts ...</p>
            </>
        )}
        
      
    </div>
  )
}

export default PostCard
