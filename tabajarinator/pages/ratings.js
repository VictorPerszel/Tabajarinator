import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import FUTCard from '@/components/fut_card';
import Navbar from '../components/Navbar';

const Rating = () => {
  const [ratings, setRatings] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('token', token);

        const response = await axios.get('http://localhost:8000/api/ratings/players/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(response.data);
        setRatings(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
        router.push('/login');
      }
    };

    fetchRatings();
  }, []);
  

  return (
    <>
      <Navbar />
      <h1 style={styles.header}>Tribunal</h1>
      
      <div style={styles.container}>
          {ratings.map((rating) => (          
            <form key={rating.id}>
              <div style={styles.usuarioContainer}>
                <FUTCard name={rating.first_name} initialRating={rating.overall} idRated={rating.id}/>
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
    textAlign: 'center',
    fontSize: '8em',
    color: 'brown',
    fontFamily: 'impact',
    marginTop: '80px' // Add margin to account for fixed navbar
  }
};

export default Rating;