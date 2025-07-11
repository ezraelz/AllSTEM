import React, { useEffect, useRef, useState } from 'react';
import { FaThumbsUp, FaComment, FaShare, FaRegThumbsUp } from 'react-icons/fa';
import './reactions.css';
import axios from '../utils/axios';
import { useParams } from 'react-router-dom';

interface ReactionProps {
  postId: number;
}

interface ReactionSummary {
  reaction: string;
  count: number;
}

const reactionTypes = [
  { type: 'like', emoji: '👍' },
  { type: 'dislike', emoji: '👎' },
  { type: 'love', emoji: '❤️' },
  { type: 'funny', emoji: '😂' },
  { type: 'sad', emoji: '😢' },
  { type: 'angry', emoji: '😠' },
];

const Reactions: React.FC<ReactionProps> = ({ postId }) => {
  const [reactions, setReactions] = useState<ReactionSummary[]>([]);
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const emojiBoxRef = useRef<HTMLDivElement>(null);

  const fetchReactions = async () => {
    const token = localStorage.getItem('access_token');
    try {
      const res = await axios.get(`/reactions/view/${postId}/`,{
        headers: {Authorization: `Bearer ${token}`}
      });
      const data = res.data;
      setReactions(data.reaction_summary || []);
      setUserReaction(data.user_reaction || null);
    } catch (err) {
      console.error('Failed to fetch reactions:', err);
    }
  };

  useEffect(() => {
    fetchReactions();
  }, [postId]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        emojiBoxRef.current &&
        !emojiBoxRef.current.contains(e.target as Node)
      ) {
        setShowEmojis(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmitReaction = async (reaction: string) => {
    setLoading(true);
    const token = localStorage.getItem('access_token');

    try {
      if (userReaction === reaction) {
        await axios.delete(`/reactions/delete/${postId}/`,{
        headers: {Authorization: `Bearer ${token}`}
      });
        setUserReaction(null);
      } else {
        await axios.post(`/reactions/create/${postId}/`, { reaction },{
        headers: {Authorization: `Bearer ${token}`}
      });
        setUserReaction(reaction);
      }
      await fetchReactions();
      setShowEmojis(false);
    } catch (err) {
      console.error('Failed to submit reaction:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reaction-container">
      <div className="sec react" ref={emojiBoxRef}>
        <button title='emoji' onClick={() => setShowEmojis(!showEmojis)}>
          {reactions.length > 0 ? <><FaThumbsUp/> Reacted</> : <><FaRegThumbsUp /> React</> }
        </button>

        {showEmojis && (
          <div className="emoji-panel">
            {reactionTypes.map(({ type, emoji }) => {
              const count = reactions.find((r) => r.reaction === type)?.count || 0;
              const isActive = userReaction === type;

              return (
                <button
                  key={type}
                  className={`emoji-btn ${isActive ? 'active' : ''}`}
                  onClick={() => handleSubmitReaction(type)}
                  disabled={loading}
                >
                  {emoji} {count > 0 && <span>{count}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="sec comment">
        <FaComment /> Comment
      </div>
      <div className="sec share">
        <FaShare /> Share
      </div>
    </div>
  );
};

export default Reactions;
