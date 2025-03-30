import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import FUTCard from '@/components/fut_card';

const Avaliar = () => {
  const [avaliacoes, setAvaliacoes] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchAvaliacoes = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8000/api/avaliacoes/jogadores/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        console.log(response.data);
        setAvaliacoes(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
        router.push('/login');
      }
    };

    fetchAvaliacoes();
  }, []);
  

  return (
    <div style={styles.container}>
        {avaliacoes.map((aval) => (          
          <form key={aval.id}>
            <div style={styles.usuarioContainer}>
              <FUTCard nome={aval.first_name} initialRating={aval.nota_geral} idAvaliado={aval.id}/>
            </div>
          </form>
        ))}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',    
    'flex-wrap': 'wrap',
    'justify-content': 'center'
  },
  usuarioContainer: {
    margin: '8px',
  }
};

export default Avaliar;