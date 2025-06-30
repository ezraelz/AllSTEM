import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';
import './postCard.css';

interface User{
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    profile_image: string;
}

interface Post{
    id: string;
    author: User;
    title: string;
    image: string;
    posted_at: number;
    description: string;
    tag: string;
}

const PostCard = () => {
    const [user, setUser] = useState<User>();
    const [post, setPost] = useState<Post[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(()=> {
        const fetchUserData = async () => {
            setLoading(true);
            const token = localStorage.getItem('access_token');
            try{
                const res = await axios.get('/users/me/',{
                    headers: {Authorization: `Bearer ${token}`}
                })
                setUser(res.data);
                console.log(res.data);
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
                console.log(res.data);
            } catch (err){
                console.log('error during user fetch data', err);
                setLoading(false);
            }
        }
        fetchPostData();
    }, []);

  return (
    <div className='card-container'>
        {post.map((post)=>(
            <div className="card" key={post.title}>
                <div className="card-top">
                    <img src={post.author.profile_image} alt="" />
                    <p><span>{post.author.username}</span><span>{post.posted_at}</span></p>
                </div>
                <div className="card-content">
                    <img src={post.image} alt="" />
                    <p>{post.description}</p>
                </div>
            </div>
        ))}
      
    </div>
  )
}

export default PostCard
