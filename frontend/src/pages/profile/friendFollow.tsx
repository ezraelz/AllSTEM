import React, { useState } from 'react';
import axios from '../../utils/axios';
import './friendFollow.css';

interface FriendFollowProps {
  targetUserId: number;
}

const FriendFollow: React.FC<FriendFollowProps> = ({ targetUserId }) => {
  const [loading, setLoading] = useState(false);
  const [friendStatus, setFriendStatus] = useState<string | null>(null);
  const [followStatus, setFollowStatus] = useState<string | null>(null);

  const token = localStorage.getItem('access_token');
  const headers = { Authorization: `Bearer ${token}` };

  const handleAddFriend = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/users/friend-request-send/', {
        to_user: targetUserId,
        }, { headers });

      setFriendStatus('Friend request sent!');
      console.log(res.data);
    } catch (error) {
      console.error('Error sending friend request', error);
      setFriendStatus('Failed to send friend request');
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/users/friend-request-send/', {
        to_user: targetUserId,
        }, { headers });

      setFollowStatus('Followed!');
      console.log(res.data);
    } catch (error) {
      console.error('Error following user', error);
      setFollowStatus('Failed to follow user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='friend-follow'>
      <div className="button-group">
        <button onClick={handleAddFriend} disabled={loading}>
          {loading ? 'Sending...' : 'Add Friend'}
        </button>
        <button onClick={handleFollow} disabled={loading}>
          {loading ? 'Processing...' : 'Follow'}
        </button>
      </div>
      {friendStatus && <p>{friendStatus}</p>}
      {followStatus && <p>{followStatus}</p>}
    </div>
  );
};

export default FriendFollow;
