import { useEffect } from 'react';
import { useRouter } from 'next/router';

const useAuth = () => {
  const router = useRouter();

  useEffect(() => {
    // Verifica se há um token no localStorage
    const token = localStorage.getItem('token');

    // Se não houver token, redireciona para a página de login
    if (!token) {
      router.push('/login');
    }
  }, [router]); // Dependência do router para evitar warnings
};

export default useAuth;