import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';

const Navbar = () => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navLinks}>
        <Link href="/avaliar" className={styles.navLink}>
          Avaliar
        </Link>
        <Link href="/calculadora" className={styles.navLink}>
          Dividir times
        </Link>
        <Link href="/profile" className={styles.navLink}>
          Perfil
        </Link>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default Navbar; 