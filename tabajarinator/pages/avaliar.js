import React, { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '../hooks/useAuth';
import { useRouter } from 'next/router';
import Rating from '@/components/rating';
import { Form } from 'next/form';

const Avaliar = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [notas, setNotas] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const token = localStorage.getItem('token');

        const response = await axios.get('http://localhost:8000/api/users/', {
          headers: {
            'Authorization': `Token ${token}`
          }
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários', error);
        router.push('/login');
      }
    };

    fetchUsuarios();
  }, []);

  const handleSubmit = async (avaliadoId, nota) => {
    try {
      await axios.post('http://localhost:8000/api/avaliacoes/criar/', {
        avaliado: avaliadoId,
        nota_geral: nota,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`, 
        },
      });
      router.push('/avaliacoes/consultar');
    } catch (error) {
      console.error('Erro ao criar avaliação:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Avaliar Usuários</h1>
        {usuarios.map((usuario) => (          
          <form onSubmit={handleSubmit}>
            <div key={usuario.id} style={styles.usuarioContainer}>
              <h2>Avaliando: {`${usuario.first_name} (${usuario.username})`}</h2>
              <input
                type="number"
                placeholder="Nota (1-10)"
                value={notas[usuario.id] || ''}
                onChange={(e) => handleSubmit(usuario.id, e.target.value)}
                min="1"
                max="10"
                required
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