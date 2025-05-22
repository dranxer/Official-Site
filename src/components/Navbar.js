import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import UserIcon from "./UserIcon";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";

export default function Navbar({ activeSection, setActiveSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !menuOpen ? 'hidden' : 'unset';
  };

  // Close menu when route changes
  useEffect(() => {
    const handleRouteChange = () => {
      setMenuOpen(false);
      document.body.style.overflow = 'unset';
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  const handleLogin = () => {
    router.push('/login');
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleSignup = () => {
    router.push('/signup');
    setMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="circular-logo">
          <Image src="/think-india-logo.png" alt="Think India Logo" width={40} height={40} priority />
        </div>
        <span>Think India</span>
      </div>
      <div className="mobile-menu-button" onClick={toggleMenu} role="button" tabIndex={0} aria-label="Toggle menu">
        <div className={`menu-icon ${menuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link href="/" className={activeSection === "home" ? "active" : ""} onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link href="#about" className={activeSection === "about" ? "active" : ""} onClick={() => setMenuOpen(false)}>About</Link>
        </li>
        <li>
          <Link href="/internships" onClick={() => setMenuOpen(false)}>Internships</Link>
        </li>
        <li>
          <Link href="/blog" onClick={() => setMenuOpen(false)}>Blog</Link>
        </li>
        {["events", "team", "contact"].map((id) => (
          <li key={id}>
            <Link 
              href={`#${id}`} 
              className={activeSection === id ? "active" : ""}
              onClick={() => {
                setActiveSection(id);
                setMenuOpen(false);
                document.body.style.overflow = 'unset';
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