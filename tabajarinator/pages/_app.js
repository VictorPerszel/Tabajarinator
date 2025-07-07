import '../styles/globals.css'; // Importe seus estilos globais, se houver
import '../styles/fut_card.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import { AuthProvider } from '../contexts/AuthContext';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;