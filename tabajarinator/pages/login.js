import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/Login.module.css';
import Image from 'next/image'

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username: login,
        password: password,
      });
      
      console.log(response)
      const { token } = response.data;
      localStorage.setItem('token', token);
      router.push('/ratings');
    } catch (error) {
      console.log(error);
      alert('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  const onSwitchToCadastro = () => {
    router.push('/registration');
  }

  return (
    <div className={styles.container}>
      <Image className={styles.logo} src="/logo.png" width={50} height={50} alt="Logo" />
      <Image className={styles.vines} src="/vines.png" width={300} height={50} alt="Logo" />
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label}>Login:</label>
          <input
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Senha:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
        </div>
        <button type="submit" className={styles.button}>Entrar</button>
        <button
          type="button"
          className={styles.switchButton}
          onClick={onSwitchToCadastro}
        >
          Cadastre-se
        </button>
      </form>
    </div>
  );
};

export default Login;