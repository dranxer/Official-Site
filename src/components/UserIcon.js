import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/UserIcon.module.css';

export default function UserIcon() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/auth/me');
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/');
      router.reload();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) return null;

  return (
    <div className={styles.userIconContainer}>
      <button 
        className={styles.userIcon}
        onClick={() => setShowDropdown(!showDropdown)}
        aria-label="User menu"
      >
        <span className={styles.avatar}>
          {user.name.charAt(0).toUpperCase()}
        </span>
      </button>
      
      {showDropdown && (
        <div className={styles.dropdown}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{user.name}</span>
            <span className={styles.userEmail}>{user.email}</span>
          </div>
          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
} 