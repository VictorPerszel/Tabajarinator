import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/login'); // Redireciona para a página de login
  }, []);

  return null; // Não renderiza nada, apenas redireciona
};

export default Home;