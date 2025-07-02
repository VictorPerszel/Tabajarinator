import React, { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../contexts/AuthContext';
import styles from '../styles/Login.module.css';
import Image from 'next/image';
import formStyles from '../styles/Form.module.css';

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
    <div className={formStyles.container}>
    <Image className={styles.logo} src="/logo.png" width={50} height={50} alt="Logo" />
    <Image className={styles.vines} src="/vines.png" width={350} height={50} alt="Logo" />
      <div className={styles.form}>
        <form onSubmit={handleSubmit}>
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
              className={formStyles.input}
            />
          </div>
          <button type="submit" className={formStyles.button}>Entrar</button>
          <button
            type="button"
            className={formStyles.secondaryButton}
            onClick={onSwitchToCadastro}
          >
            Cadastre-se
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;