import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // 🔐 Ensure session is initialized / check login status
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await axios.get('/api/auth/status/', {
          withCredentials: true
        });
        if (response.data.isAuthenticated) {
          navigate(-1); // Redirect if already logged in
        } 
      } catch{
        toast.error("Session check failed:");
      }
    };

    checkAuthStatus();
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true)
    try {
        interface LoginResponse {
            username: string;
            password: string;
            email: string; 
            refresh: string; 
            access: string; 
          }

      const response = await axios.post<LoginResponse>('/api/login/', {
        username,
        password,
      });
  
      const { access, refresh, email: userEmail, username: userUsername} = response.data;
      

      // ✅ Save tokens and role to localStorage
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      localStorage.setItem('email', userEmail);
      localStorage.setItem('username', userUsername);
      localStorage.setItem('isLoggedIn', 'true');
  
      navigate('/');
    } catch (err){
      toast.error('Login failed. Please try again.');
      console.log('login error', err);
      setLoading(false)
      navigate(-1);
    }
  };

  if (loading) return <div className="main"><div className="outer"><div className="inner"></div>
                        </div>
                          Loging In...
                      </div>;
  
  return (
    <div className="login-container">
      
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleLogin} className="login-box">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="login-input"
          required
        />
        <input
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="login-input"
          required
        />

        <button type="submit" className="login-button">Login</button>
      </form>
      {error && <div className="error-message">{error}</div>}
      <div className="login-footer">
          <p onClick={()=> navigate('/forgot-password')}>
            Forgot your password? <span>Reset here</span>
          </p>
        </div>
    </div>
  );
};

export default Login;
