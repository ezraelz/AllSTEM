import React from 'react';
import './scrollLeft.css';

interface ScrollProps{
    isScrolled: boolean;
    onScrolled: ()=> void;
}

const ScrollLeft: React.FC<ScrollProps> = ({isScrolled, onScrolled}) => {
    if (!isScrolled) return;

  return (
    <div className='scrollLeft' onClick={onScrolled}>
      <p>&#8249;</p>
    </div>
  )
}

export default ScrollLeft
