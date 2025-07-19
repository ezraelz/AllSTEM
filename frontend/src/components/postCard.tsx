import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './postCard.css';
import { format } from 'date-fns';
import { FaComment, FaShare } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import Reactions from './reactions';

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

const BaseUrl = 'http://127.0.0.1:8000'

const PostCard = () => {
    const [isClicked, setIsClicked] = useState<number | null>(null);
    const [user, setUser] = useState<User>();
    const [post, setPost] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleClick = (index: number) => {
        setIsClicked(prev => (prev === index ? null : index));
    }

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
                {post.map((post, index)=>(
                    <div className="card" key={index}>
                        <div className="card-top">
                            <img src={`${BaseUrl}${post.author_profile_image}`} alt="" onClick={()=> navigate(`/profile/${post.author}/`)}/>
                            <p className='card-title' >{post.title} <span onClick={()=> navigate(`/profile/${post.id}/`)}>By {post.author_username}</span></p>  
                            <p className='posted_at'>
                                {format(new Date(post.posted_at), 'PPP')}
                            </p>
                        </div>
                        <div className="card-content">
                            {post.image ? 
                            <>
                                <img src={`${BaseUrl}${post.image}`} alt="" onClick={()=> navigate(`/posts/detail/${post.id}/`)}/>
                            </> : 
                            <></>}
                            <div className="card-description">
                                <p 
                                    className={`read`} 
                                    onClick={()=> navigate(`/posts/detail/${post.id}/`)}
                                >
                                    { isClicked === index ? post.description : post.description.slice(0, 75)}
                                </p>
                                <button
                                    onClick={() => handleClick(index)}>... {isClicked === index ? ' Less': 'Read more'}
                                </button>
                            </div>
                            
                        </div>
                        <Reactions postId={post.id}/>
                    </div>
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
