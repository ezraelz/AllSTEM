import React, { useState } from 'react'

const ProfileVideos = () => {
  const [loading, setLoading] = useState();

  return (
    <div className='profile-videos'>
      {loading ? (
        <></>
      ) : (
        <><p>Loading Videos...</p></>
      )}
    </div>
  )
}

export default ProfileVideos
