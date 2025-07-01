import axios from '../../utils/axios';
import React, { useState } from 'react';
import './register.css';

interface Form{
    username: string;
    email: string;
    password: string;
}

const Register = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<Form>({
        username: '',
        email: '',
        password: '',
    });

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(false);

        const form = new FormData();

        form.append('username', formData.username)
        form.append('email', formData.email)
        form.append('password', formData.password)

        const res = await axios.post('/api/register/', form);
        setFormData({
            username: '',
            email: '',
            password: ''
        })
        console.log(res.data);
    }

  return (
    <div className='register'>
      <div className="register-container">
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
                placeholder="Username"
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
