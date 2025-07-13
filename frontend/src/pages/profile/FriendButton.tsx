import React, { useState, useEffect } from 'react';
import axios from '../../utils/axios'; // adjust to your path
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './friendButton.css'; // optional styling

interface FriendButtonProps {
  targetUserId: number;
}

type FriendStatus = 'none' | 'pending' | 'friends';

const FriendButton: React.FC<FriendButtonProps> = ({ targetUserId }) => {
  const [status, setStatus] = useState<FriendStatus>('none');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access_token');
  const headers = { Authorization: `Bearer ${token}` };

  useEffect(() => {
    const fetchFriendStatus = async () => {
      try {
        const res = await axios.get(`/users/friend-status/${targetUserId}/`, { headers });
        setStatus(res.data.status); // must return 'none' | 'pending' | 'friends'
      } catch (error) {
        console.error('Error fetching friend status', error);
      }
    };

    fetchFriendStatus();
  }, [targetUserId]);

  const handleAddFriend = async () => {
    setLoading(true);
    try {
      const res = await axios.post('/users/friend-request-send/', {
        receiver_id: targetUserId,
      }, { headers });

      toast.success('Friend request sent!');
      setStatus('pending');
    } catch (error: any) {
      toast.error(error?.response?.data?.error || 'Failed to send request');
      console.error('Friend request error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      className={`friend-button ${status}`}
      onClick={handleAddFriend}
      disabled={status !== 'none' || loading}
    >
      {loading ? 'Sending...' : status === 'none' ? 'Add Friend' : status === 'pending' ? 'Request Sent' : 'Friends'}
    </button>
  );
};

export default FriendButton;
