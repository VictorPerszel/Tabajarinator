import { useState } from 'react';
import Login from './login';
import Cadastro from './cadastro';

function MyApp({ Component, pageProps }) {
  const [isCadastro, setIsCadastro] = useState(false);

  return (
    <>
      {isCadastro ? (
        <Cadastro
          onRegister={() => setIsCadastro(false)}
          onSwitchToLogin={() => setIsCadastro(false)}
        />
      ) : (
        <Login onSwitchToCadastro={() => setIsCadastro(true)} />
      )}
    </>
  );
}

export default MyApp;