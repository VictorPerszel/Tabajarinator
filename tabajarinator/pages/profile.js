import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const [name, setName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { user, loading: authLoading, isAuthenticated } = useAuth();

  const fetchProfile = useCallback(async () => {
    if (!user?.token) return;
    
    try {
      const response = await axios.get('http://localhost:8000/api/auth/profile/', {
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      
      setName(response.data.first_name || '');
      if (response.data.profile?.profile_picture) {
        setPreview(response.data.profile.profile_picture);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError('Failed to load profile data');
    }
  }, [user?.token]);

  useEffect(() => {
    // Only run this effect if auth check is complete (authLoading is false)
    if (authLoading) return;
    
    // If no user is found after auth check, redirect to login
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }
    
    // Fetch user profile data
    fetchProfile();
  }, [authLoading, isAuthenticated, router, fetchProfile]);
  
  // Show loading state while checking auth
  if (authLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div>Loading...</div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user?.token) return;
    
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('first_name', name);
      if (profilePicture) {
        formData.append('profile[profile_picture]', profilePicture);
      }

      await axios.patch('http://localhost:8000/api/auth/profile/', formData, {
        headers: {
          'Authorization': `Token ${user.token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      
      // Refresh profile data
      await fetchProfile();
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Erro ao atualizar perfil. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <Navbar />
      <div style={styles.container}>
        <h2>Meu Perfil</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label>Apelido:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label>Foto de Perfil:</label>
            <div style={styles.imageContainer}>
              {preview ? (
                <img src={preview} alt="Profile" style={styles.imagePreview} />
              ) : (
                <div style={styles.placeholder}>Sem foto</div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={styles.fileInput}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? 'Atualizando...' : 'Salvar Alterações'}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
  },
  container: {
    maxWidth: '600px',
    margin: '6rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  input: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
  },
  textarea: {
    padding: '0.5rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    minHeight: '100px',
    resize: 'vertical',
  },
  imageContainer: {
    position: 'relative',
    marginBottom: '1rem',
  },
  imagePreview: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  placeholder: {
    width: '150px',
    height: '150px',
    backgroundColor: '#f0f0f0',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#666',
    fontSize: '1rem',
  },
  fileInput: {
    marginTop: '0.5rem',
  },
  button: {
    padding: '0.5rem 1rem',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};