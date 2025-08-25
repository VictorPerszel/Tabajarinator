import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import FUTCard from '@/components/fut_card';
import Navbar from '../components/Navbar';
import styles from '../styles/Ratings.module.css';

const Rating = () => {
  const [players, setPlayers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');

        // Fetch current user data
        const currentUserResponse = await axios.get('http://localhost:8000/api/ratings/current-user/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setCurrentUser(currentUserResponse.data);

        // Fetch other players data
        const playersResponse = await axios.get('http://localhost:8000/api/ratings/players/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(playersResponse.data);
        setPlayers(playersResponse.data);
      } catch (error) {
        console.error('Erro ao buscar dados', error);
        router.push('/login');
      }
    };

    fetchData();
  }, []);
  

  return (
    <>
      <Navbar />
      <div className={styles.header}>
        <div className={styles.tribunalContainer}>
          <img src="/gabel_gold.png" alt="T" className={styles.gabel} />
          <span className={styles.tribunalText}>Tribunal</span>
        </div>
        {currentUser && (
          <div className={styles.currentUserCard}>
            <FUTCard 
              name={currentUser.first_name} 
              initialRating={currentUser.overall} 
              idRated={currentUser.id} 
              picture={currentUser.profile?.profile_picture}
              isCurrentUser={true}
            />
          </div>
        )}
      </div>
      
      <div className={styles.container}>
          {players.map((player) => (            
            <form key={player.id}>
              <div className={styles.usuarioContainer}>
                <FUTCard name={player.first_name} initialRating={player.overall} idRated={player.id} picture={player.profile?.profile_picture}/>
              </div>
            </form>
          ))}
      </div>
    </>
  );
};

export default Rating;