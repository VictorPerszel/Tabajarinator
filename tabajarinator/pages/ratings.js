import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import FUTCard from '@/components/fut_card';
import Navbar from '../components/Navbar';

const Rating = () => {
  const [players, setPlayers] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchPlayersFromTeam = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8000/api/ratings/players/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(response.data);
        setPlayers(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
        router.push('/login');
      }
    };

    fetchPlayersFromTeam();
  }, []);
  

  return (
    <>
      <Navbar />
      <h1 style={styles.header}>
        <img src="/gabel_gold.png" alt="T" style={styles.gabel} />
        <span style={styles.tribunalText}>Tribunal</span>
      </h1>
      
      <div style={styles.container}>
          {players.map((player) => (            
            <form key={player.id}>
              <div style={styles.usuarioContainer}>
                <FUTCard name={player.first_name} initialRating={player.overall} idRated={player.id} picture={player.profile?.profile_picture}/>
              </div>
            </form>
          ))}
      </div>
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',    
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: '80px' // Add margin to account for fixed navbar
  },
  usuarioContainer: {
    margin: '8px',
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    fontSize: 'clamp(28px, 15.5vw, 93px)', // Adjusted for ~80% width on small screens, ~40% on large

    // n ta fazendo nada 
    textShadow: '1px 1px 2px var(--metallic-gold)',
    fontFamily: 'impact',
    marginTop: '80px',
    whiteSpace: 'nowrap', // Prevent T and ribunal from breaking apart
    position: 'relative'
  },
  gabel: {
    height: '2em', 
    width: 'auto', 
    display: 'inline-block', // Remains useful for intrinsic sizing
    verticalAlign: 'baseline', // Helps align with text if flex alignment needs assistance
    marginRight: '-30px'
  },
  tribunalText: {
    fontSize: 'clamp(28px, 15.5vw, 93px)', // Adjusted for ~80% width
    textShadow: '1px 1px 2px var(--metallic-gold)',
    fontFamily: 'impact',
    whiteSpace: 'nowrap',
    marginLeft: '-15px',
    position: 'relative',
    top: '-10px' // Move text 5px up from the baseline
  }
};

export default Rating;