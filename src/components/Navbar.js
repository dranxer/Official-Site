import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import UserIcon from "./UserIcon";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";

const Navbar = ({ activeSection, setActiveSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const handleLogin = () => {
    router.push('/login');
    setIsMenuOpen(false);
  };

  const handleSignup = () => {
    router.push('/signup');
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <button 
        className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>

      <div className="logo">
        <Image src="/think-india-logo.png" alt="Think India Logo" width={40} height={40} />
        <span>Think India</span>
      </div>

      <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <button className="close-menu" onClick={toggleMenu} aria-label="Close menu">
          <span className="sr-only">Close menu</span>
        </button>
        
        <Link href="/" onClick={toggleMenu}>Home</Link>
        <Link href="/about" onClick={toggleMenu}>About</Link>
        <Link href="/events" onClick={toggleMenu}>Events</Link>
        <Link href="/members" onClick={toggleMenu}>Members</Link>
        <Link href="/contact" onClick={toggleMenu}>Contact</Link>

        <div className="auth-buttons">
          <Link href="/login" className="login-btn" onClick={toggleMenu}>Login</Link>
          <Link href="/signup" className="signup-btn" onClick={toggleMenu}>Sign Up</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 