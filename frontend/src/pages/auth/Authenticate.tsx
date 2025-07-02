import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Register from './register';
import Login from './login';
import './Authenticate.css';
import logo from '../../assets/logo/logopng.png';

const Authenticate = () => {
  const [activeForm, setActiveForm] = useState<'login' | 'register'>('login');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleClick = (form: 'login' | 'register') => {
    setActiveForm(form);
    setLoading(true);
  };

  return (
    <div className='authenticate'>
      <div className="side-section">
        <img src={logo} alt="AllSTEM Logo" />
        <h1>AllSTEM</h1>
        <span>Fun and Education</span>
      </div>

      <div className="container">
        <div className="header">
          <button
            title='login'
            onClick={() => handleClick('login')}
            className={`button ${activeForm === 'login' ? 'active' : ''}`}
          >
            Login
          </button>
          <button
            title='signup'
            onClick={() => handleClick('register')}
            className={`button ${activeForm === 'register' ? 'active' : ''}`}
          >
            Register
          </button>
        </div>

        {loading ? (activeForm === 'register' ? <Register /> : <Login />) : null}
      </div>
    </div>
  )
}

export default Authenticate;
