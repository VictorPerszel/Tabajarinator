import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/Login.module.css';
import { useRouter } from 'next/router';

const Cadastro = () => {
  const [login, setLogin] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', {
        username: login,
        password: password,
        first_name: name
      });

      alert('Cadastro bem-sucedido!');
      onSwitchToLogin();
    } catch (error) {
      alert('Erro ao cadastrar. Tente novamente.');
    }
  };

  const onSwitchToLogin = () => {
    router.push('/login');
  }

  return (
    <div className={styles.container}>
      <h2>Cadastro</h2>
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
          <label className={styles.label}>Como gostaria de ser chamado?</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
        <button type="submit" className={styles.button}>Cadastrar</button>
        <button
          type="button"
          className={styles.switchButton}
          onClick={onSwitchToLogin}
        >
          Já tem uma conta? Faça login
        </button>
      </form>
    </div>
  );
}

export default Cadastro;