import React, { useEffect, useState } from 'react';
import axios from '../../../utils/axios';
import './homeRightPeople.css';

interface People{
    username: string;
    profile_image: string;
    first_name: string;
    last_name: string;
    is_active: boolean;
}

const BaseUrl = 'http://127.0.0.1:8000'

const HomeRightPeople = () => {
    const [loading, setLoading] = useState(false);
    const [people, setPeople] = useState<People[]>([]);

    useEffect(()=> {
        const fetchPeopleData = async () =>{
            setLoading(true);
            const token = localStorage.getItem('access_token');
            if(!token) return;

            try{
                const res = await axios.get('/users/list/', {
                    headers: {Authorization: `Bearer ${token}`}
                })

                setPeople(res.data);
            }catch(err){
                console.log('error during fetch', err)
            }
        } 
        fetchPeopleData();
    }, []);

  return (
    <div className='home-people hide-scrollbar'>
        <h4>Peoples</h4>
      {loading ? (
        <>
            {people.map((p)=>(
                <div className="people-card" key={p.username}>
                    <img src={`${BaseUrl}${p.profile_image}`} alt="" />
                    <p>{p.username}</p>
                </div>
            ))}
        </>
      ) : (
        <><p>Loading..</p></>
      )}
    </div>
  )
}

export default HomeRightPeople
