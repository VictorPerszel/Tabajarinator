import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Navbar.module.css';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null); // Ref for the nav element to detect outside clicks

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsMenuOpen(false);
    router.push('/login');
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Effect to close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effect to close dropdown on route change
  useEffect(() => {
    const handleRouteChange = () => {
      setIsMenuOpen(false);
    };
    router.events.on('routeChangeComplete', handleRouteChange);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <nav className={`${styles.navbar} fixed w-full top-0 left-0 z-50`} ref={navRef}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link href="/" passHref legacyBehavior>
          <a onClick={closeMenu} className="flex-shrink-0 flex items-center">
            <Image className={styles.logo} src="/logo.png" width={40} height={40} alt="Logo" />
          </a>
        </Link>

        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            type="button"
            className="inline-flex items-center justify-center p-2 rounded-md text-yellow-500 hover:bg-gray-700/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            aria-expanded={isMenuOpen}
          >
            <span className="sr-only">Open main menu</span>
            {!isMenuOpen ? (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            ) : (
              <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>

        <div className={`hidden md:flex md:items-center ${styles.navLinks} md:space-x-4`}>
          <Link href="/ratings" passHref legacyBehavior><a onClick={closeMenu} className={styles.navLink}>Avaliar</a></Link>
          <Link href="/calculator" passHref legacyBehavior><a onClick={closeMenu} className={styles.navLink}>Dividir times</a></Link>
          <Link href="/profile" passHref legacyBehavior><a onClick={closeMenu} className={styles.navLink}>Perfil</a></Link>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Log Out
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 shadow-lg" id="mobile-menu" style={{ background: 'linear-gradient(to right, var(--deep-purple), var(--royal-purple))' }}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-stretch text-center">
            <Link href="/ratings" passHref legacyBehavior><a onClick={closeMenu} className={`${styles.navLink} block py-2 px-3 rounded-md hover:bg-gray-700/50`}>Avaliar</a></Link>
            <Link href="/calculator" passHref legacyBehavior><a onClick={closeMenu} className={`${styles.navLink} block py-2 px-3 rounded-md hover:bg-gray-700/50`}>Dividir times</a></Link>
            <Link href="/profile" passHref legacyBehavior><a onClick={closeMenu} className={`${styles.navLink} block py-2 px-3 rounded-md hover:bg-gray-700/50`}>Perfil</a></Link>
            <button onClick={handleLogout} className={`${styles.logoutButton} w-full mt-2 py-2 text-center`}>
              Log Out
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 