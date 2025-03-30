import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Rating from 'react-rating';
import { FaStar } from 'react-icons/fa';



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

  const handleSubmit = async (avaliadoId, nota) => {
    try {
      await axios.post('http://localhost:8000/api/avaliacoes/criar/', {
        avaliado: avaliadoId,
        nota_geral: nota,
      }, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`, 
        },
      });
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
    }
  };   

  return (
    <div style={styles.container}>
      
      <h1>Avaliar Usuários</h1>
        {avaliacoes.map((aval) => (          
          <form key={aval.id} onSubmit={handleSubmit}>
            <div style={styles.usuarioContainer}>
              <h2>Avaliando: {`${aval.first_name}`}</h2>
              <Rating
                fractions="2"
                initialRating={aval.nota_geral}
                emptySymbol={<FaStar color="grey" />}
                fullSymbol={<FaStar color="gold" />}
                onChange={(nota) => handleSubmit(aval.id, nota)}
              />
            </div>
          </form>
        ))}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  usuarioContainer: {
    marginBottom: '20px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
};

export default Avaliar;