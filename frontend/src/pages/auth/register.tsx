import axios from '../../utils/axios';
import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

interface Form{
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Form>({
        username: '',
        email: '',
        password: '',
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const form = new FormData();

        form.append('username', formData.username)
        form.append('email', formData.email)
        form.append('password', formData.password)

        try{
            await axios.post('/api/register/', form);
            setFormData({
                username: '',
                email: '',
                password: '',
            })
            navigate('/login');
        }catch{
            setLoading(false);
        }
    }

  return (
    <div className='register'>
      <div className="register-container">
        <h2>Sign Up</h2>
        <form onSubmit={handleRegister}>
            <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                placeholder="Username"
                className="login-input"
                required
            />
            <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Email"
                className="login-input"
                required
            />
            <input
                name="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Password"
                className="login-input"
                required
            />

            <button type="submit" className="login-button"> {loading ? 'Registering' : 'Register'}</button>
        </form>
      </div>
    </div>
  )
}

export default Register
