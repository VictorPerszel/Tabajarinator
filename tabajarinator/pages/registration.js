import React, { useState, useRef } from 'react';
import axios from 'axios';
import formStyles from '../styles/Form.module.css';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Cadastro = () => {
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState('/default-avatar.png');
  const fileInputRef = useRef(null);
  const router = useRouter();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('As senhas não coincidem!');
      return;
    }

    const formData = new FormData();
    formData.append('username', login);
    formData.append('password', password);
    formData.append('first_name', name);
    if (profileImage) {
      formData.append('profile_image', profileImage);
    }

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Cadastro bem-sucedido!');
      router.push('/ratings');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  const onSwitchToLogin = () => {
    router.push('/login');
  };

  return (
    <div className={formStyles.container}>
      <form onSubmit={handleSubmit} className={formStyles.form}>
        <h1 className={formStyles.title}>Bem-vindo ao Tabajarinator</h1>
        <p className={formStyles.subtitle}>Porque nem toda pelada é uma várzea</p>
        
        <div className={formStyles.formColumns}>
          <div className={formStyles.column}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>Login:</label>
              <input
                type="text"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
                className={formStyles.input}
              />
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>Senha:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength="8"
                className={formStyles.input}
              />
            </div>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>Confirme a senha:</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength="8"
                className={formStyles.input}
              />
            </div>
          </div>
          
          <div className={formStyles.column}>
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>Como gostaria de ser chamado?</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={formStyles.input}
              />
            </div>
            
            <div className={formStyles.formGroup}>
              <label className={formStyles.label}>Foto de perfil:</label>
              <div className={formStyles.profileImageContainer}>
                <div className={formStyles.imagePreview}>
                  <Image
                    src={preview}
                    alt="Preview"
                    width={150}
                    height={150}
                    className={formStyles.profileImage}
                  />
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  style={{ display: 'none' }}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={formStyles.uploadButton}
                >
                  Escolher imagem
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className={formStyles.buttonContainer}>
          <button type="submit" className={formStyles.button}>
            Cadastrar
          </button>
          <button
            type="button"
            className={formStyles.switchButton}
            onClick={onSwitchToLogin}
          >
            Já tem uma conta? Faça login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;