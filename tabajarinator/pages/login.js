import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Login.module.css';
import Image from 'next/image';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login: loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    const result = await loginUser(login, password);
    if (result.success) {
      router.push('/ratings');
    } else {
      setError(result.error || 'Erro ao fazer login. Verifique suas credenciais.');
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
        <button type="submit" className={styles.button}><b>Entrar</b></button>
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