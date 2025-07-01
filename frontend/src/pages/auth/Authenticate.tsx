import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Register from './register';
import Login from './login';
import './Authenticate.css';
import logo from '../../assets/logo/logopng.png';

const Authenticate = () => {
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    
    const handleOpen = ()=> {
      setOpen(!open);
      setLoading(true);
    }

  return (
    <div className='authenticate'>
      <div className="side-section">
        <img src={logo} alt="" />
        <h1>AllSTEM </h1>
        <span>Fun and Education</span>
      </div>
      <div className="container">
        <div className="header">
          <button title='login' onClick={handleOpen}>Login</button>
          <button title='login' onClick={handleOpen}>Register</button>
        </div>
        {loading && open ? <Register/> : <Login/>}
      </div>
    </div>
  )
}

export default Authenticate
