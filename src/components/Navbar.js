import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import UserIcon from "./UserIcon";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";

export default function Navbar({ activeSection, setActiveSection }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      <div className="logo">
        <div className="circular-logo">
          <Image src="/think-india-logo.png" alt="Think India Logo" width={40} height={40} priority />
        </div>
        <span>Think India</span>
      </div>
      <div className={`mobile-menu-button ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        <div className="menu-icon">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li>
          <Link href="/" className={activeSection === "home" ? "active" : ""}>Home</Link>
        </li>
        <li>
          <Link href="#about" className={activeSection === "about" ? "active" : ""}>About</Link>
        </li>
        <li>
          <Link href="/internships">Internships</Link>
        </li>
        <li>
          <Link href="/blog">Blog</Link>
        </li>
        {["events", "team", "contact"].map((id) => (
          <li key={id}>
            <Link 
              href={`#${id}`} 
              className={activeSection === id ? "active" : ""}
              onClick={() => {
                setActiveSection(id);
                setIsMenuOpen(false);
              }}
            >
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </Link>
          </li>
        ))}
        <li className="auth-buttons">
          {loading ? null : user ? (
            <UserIcon />
          ) : (
            <>
              <button onClick={handleLogin} className="login-btn" type="button">Login</button>
              <button onClick={handleSignup} className="signup-btn" type="button">Sign Up</button>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
} 