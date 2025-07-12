import React, { ReactElement, useEffect, useRef, useState } from 'react';
import axios from '../../utils/axios';
import './homeAddPost.css';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface Form{
    title: string;
    image: File | string;
    description: string;
    tag: string;
}

const HomeAddPost = () => {
    const [clicked, setClicked] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Form>({
        title: '',
        image: '',
        description: '',
        tag: '',
    });

    const handlePost = async (e:React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const token = localStorage.getItem('access_token');
        if (!token) return ('/login');
        const form = new FormData();

        form.append('title', formData.title),
        form.append('description', formData.description),
        form.append('tag', formData.tag);
        
        if (formData.image instanceof File){
            form.append('image', formData.image)
        }

        try{
            const res = await axios.post('/posts/create/', form,{
                headers: {Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',}
            })

            setFormData({
                title: '',
                image: '',
                description: '',
                tag: '',
            })
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch {
            console.log('Error Adding Post!')
        }

    }

    const handleClick = () => {
        setClicked(!clicked);
    }

  return (
    <div className='home-post' >
      <div className="post-container">
        <h3>
            <button className={clicked ? 'backward' : 'forward'} onClick={handleClick}>
                {clicked ? <FaMinus/> : <FaPlus /> }
            </button>
            Reflect Something
        </h3>
        <form onSubmit={handlePost} className={clicked ? 'show' : ''}>
            <input 
                type="text" 
                placeholder='Title'
                value={formData.title}
                className='post-input'
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
            <textarea
                placeholder="Description"
                className="post-input"
                rows={4}
                style={{ resize: 'vertical' }}
                value={formData.description}
                onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                }
            />
            <input 
                type="text" 
                placeholder='Tag'
                value={formData.tag}
                className='post-input'
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
            />
            <label htmlFor="image">Image</label>
            <input 
                type="file" 
                placeholder='image'
                ref={fileInputRef}
                className='post-input-img'
                onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                        setFormData({ ...formData, image: e.target.files[0] });
                    }
                }}
            />
            <button>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default HomeAddPost
