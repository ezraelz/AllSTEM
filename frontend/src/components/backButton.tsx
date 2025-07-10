import React from 'react'
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './backbutton.css';

const BackButton = () => {
    const navigate = useNavigate();

  return (
    <div className='backbutton'>
        <button title='back' onClick={()=> navigate(-1)} className='backbutton'><FaArrowLeft /></button>
    </div>
  )
}

export default BackButton
