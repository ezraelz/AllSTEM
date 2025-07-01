import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Register from './register';
import Login from './login';
import './Authenticate.css';

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
      <div className="container">
        <div className="header">
          <button title='login' onClick={handleOpen}>Login</button>
          <button title='login' onClick={handleOpen}>Register</button>
        </div>
        {open ? <Register/> : <Login/>}
      </div>

    </div>
  )
}

export default Authenticate
