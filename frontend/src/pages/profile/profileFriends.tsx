import React, { useEffect, useState } from 'react';
import axios from '../../utils/axios';
import './profileFriends.css';
import { useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

interface Friend {
  id: number;
  from_user: string;
  from_user_username: string;
  from_user_profile_image: string;
  to_user_username: string;
  to_user_profile_image: string;
}

const BaseUrl = 'http://127.0.0.1:8000/media/';

const ProfileFriends = () => {
  const { id } = useParams();
  const [friends, setFriends] = useState<Friend[]>([]);
  const [requests, setRequests] = useState<Friend[]>([]);
  const [sent, setSent] = useState<Friend[]>([]);
  const [activeTab, setActiveTab] = useState('Friends');
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem('access_token');
  let loggedInUserId: string | null = null;

  if (token) {
    const decoded: any = jwtDecode(token);
    loggedInUserId = String(decoded.user_id);
  }

  const isOwner = !id || id === loggedInUserId;

  useEffect(() => {
    const fetchFriends = async () => {
      setLoading(true);
      if (!token) return;

      try {
        const res = await axios.get(`/users/friends/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setFriends(res.data);
      } catch (err) {
        console.error('Error fetching friends:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  useEffect(() => {
    if (!isOwner) return;

    const fetchRequests = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`/users/friend-requests/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching friend requests:', err);
      }
    };

    fetchRequests();
  }, [isOwner]);

  useEffect(() => {
    if (!isOwner) return;

    const fetchSent = async () => {
      if (!token) return;

      try {
        const res = await axios.get(`/users/friend-request-sent/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setSent(res.data);
      } catch (err) {
        console.error('Error fetching sent requests:', err);
      }
    };

    fetchSent();
  }, [isOwner]);

  const handleAccept = async (id: number) => {
    try {
      setLoading(true);
      await axios.post(`/users/friend-request-accept/${id}/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
      // Optionally, refetch friends or optimistically update
    } catch (err) {
      console.error('Accept failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id: number) => {
    try {
      setLoading(true);
      await axios.post(`/users/friend-requests/${id}/reject/`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setRequests((prev) => prev.filter((req) => req.id !== id));
    } catch (err) {
      console.error('Reject failed:', err);
    } finally {
      setLoading(false);
    }
  };


  const friendRequests = () => (
    <div className="requests">
      {requests.length > 0 ? (
        requests.map((request) => (
          <div className="request" key={request.id}>
              <img src={`${BaseUrl}${request.from_user_profile_image}`} alt="" />
            <div className="card-content">
              <p>{request.from_user_username}</p>
              <div className="button-group">
                <button title="accept" className="accept" onClick={() => handleAccept(request.id)}>Accept</button>
                <button title="reject" className="reject" onClick={() => handleReject(request.id)}>Reject</button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>You have no requests yet</p>
      )}
    </div>
  );

  const sentRequests = () => (
    <div className="sent-request">
      {sent.length > 0 ? (
        sent.map((item) => (
          <div className="sent-card" key={item.id}>
            <img src={`${BaseUrl}${item.to_user_profile_image}`} alt="" />
            <div className="sent-card-content">
              <span>{item.to_user_username}</span> <br></br>
              <span>Friends {friends.length}</span>
            </div>
          </div>
        ))
      ) : (
        <p>No sent requests found.</p>
      )}
    </div>
  );

  const Friends = () => (
    <div className="profile-friends">
      {friends.length > 0 ? (
        friends.map((friend) => (
          <div className="photos" key={`friend-${friend.id}`}>
            <div className="card-content">
              <img src={`${BaseUrl}${friend.from_user_profile_image}`} alt="" />
            </div>
          </div>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );

  const tabs = [
    ...(isOwner ? [{ name: 'Requests' }, { name: 'Sent' }] : []),
    { name: 'Friends' },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Requests':
        return friendRequests();
      case 'Sent':
        return sentRequests();
      case 'Friends':
      default:
        return Friends();
    }
  };

  return (
    <div className="profile-friend">
      <div className="request-buttons">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            title={tab.name}
            className={activeTab === tab.name ? 'active-tab' : ''}
            onClick={() => setActiveTab(tab.name)}
          >
            {tab.name}
          </button>
        ))}
      </div>
      <div className="profile-friends-status">
        {loading ? <p>Loading...</p> : renderActiveTab()}
      </div>
    </div>
  );
};

export default ProfileFriends;
