import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import formStyles from '../styles/Form.module.css';
import Image from 'next/image';

export default function Profile() {
  const [name, setName] = useState('');
  const [telephone, setTelephone] = useState('');
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
      setTelephone(response.data.profile?.telephone || '');
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
      formData.append('profile.telephone', telephone);
      if (profilePicture) {
        formData.append('profile.profile_picture', profilePicture);
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
      <div className={formStyles.container}>
        <form onSubmit={handleSubmit} className={formStyles.form}>
          <h1 className={formStyles.title}>Meu Perfil</h1>
          <p className={formStyles.subtitle}>Atualize suas informações pessoais</p>
          
          <div className={formStyles.formColumns}>
            <div className={formStyles.column}>
              <div className={formStyles.formGroup}>
                <label className={formStyles.label}>Como gostaria de ser chamado?</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={formStyles.input}
                  placeholder="Digite seu apelido"
                />
              </div>
              <div className={formStyles.formGroup}>
                <label className={formStyles.label}>Telefone:</label>
                <input
                  type="tel"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className={formStyles.input}
                  placeholder="Como estiver no WhatsApp"
                />
              </div>
            </div>
            
            <div className={formStyles.column}>
              <div className={formStyles.formGroup}>
                <label className={formStyles.label}>Foto de perfil:</label>
                <div className={formStyles.profileImageContainer}>
                  <div className={formStyles.imagePreview}>
                    {preview ? (
                      <Image
                        src={preview}
                        alt="Preview"
                        width={150}
                        height={150}
                        className={formStyles.profileImage}
                      />
                    ) : (
                      <div>
                        Sem foto
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="profile-image-input"
                  />
                  <label htmlFor="profile-image-input" className={formStyles.uploadButton}>
                    Escolher imagem
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          {error && (
            <div style={styles.errorMessage}>
              {error}
            </div>
          )}
          
          <div className={formStyles.buttonContainer}>
            <button
              type="submit"
              disabled={loading}
              className={formStyles.button}
            >
              {loading ? 'Atualizando...' : 'Salvar Alterações'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const styles = {
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.2rem',
  },
  errorMessage: {
    color: '#d32f2f',
    backgroundColor: '#ffebee',
    padding: '0.75rem',
    borderRadius: '4px',
    marginBottom: '1rem',
    textAlign: 'center',
  },
};