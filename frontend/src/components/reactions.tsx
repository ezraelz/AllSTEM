import React, { ReactElement, useEffect, useState } from 'react';
import { FaComment, FaReact, FaRegThumbsUp, FaShare, FaThumbsUp } from 'react-icons/fa';
import './reactions.css';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

interface ReactionProps {
  postId: string;
}

interface ReactionSummary {
  reaction: string;
  count: number;
}

const reactionTypes = [
  { type: "like", emoji: "👍" },
  { type: "dislike", emoji: "👎" },
  { type: "love", emoji: "❤️" },
  { type: "funny", emoji: "😂" },
  { type: "sad", emoji: "😢" },
  { type: "angry", emoji: "😠" },
];

interface form{
  post: string;
  type: string;
  author: string;
  reacted_at: string;
}

const Reactions: React.FC<ReactionProps> = ({postId}) => {
    const [reactions, setReactions] = useState<ReactionSummary[]>([]);
    const [loading, setLoading] = useState(false);
    const [userReaction, setUserReaction] = useState<string | null>(null);
    const { id } = useParams<{id: string}>();

    const fetchReactions = async () =>{
      try {
        const res = await axios.get(
          `/reactions/view/${id}`);
          const data = res.data;
          setReactions(data.reaction_summary || []);
      } catch (err) {
        console.error('faild to fetch reactions');
      }
    };

    useEffect(() => {
      fetchReactions();
    }, [postId]);

    const handleSubmitReaction = async (reaction: string)=>{
        setLoading(true);

        try{
          if (userReaction === reaction){
            await axios.delete(`/reactions/delete/${postId}`);
            setUserReaction(null);
          } else {
            await axios.post(
              `/reactions/create/${postId}`,
              {reaction}
            );
            setUserReaction(reaction);
          }
          fetchReactions();
        } catch(err) {
          console.error('failed to react:', err)
          setLoading(false);
        }
    }

  return (
    <div className='reaction-container'>
      <div className="sec react"> 
        {reactionTypes.map(({type, emoji})=> {
          const count = reactions?.find(r =>r.reaction === type)?.count || 0;
          const isActive = userReaction === type;

          return (
            <button 
              key={type}
              onClick={()=> handleSubmitReaction(type)}
              disabled={loading}>
              {reactions ? <FaThumbsUp/> :<FaRegThumbsUp />} React
            </button>
          )
        })}
        
      </div>
      <div className="sec comment"><FaComment /> Comment</div>
      <div className="sec share"><FaShare /> Share</div>
    </div>
  )
}

export default Reactions
