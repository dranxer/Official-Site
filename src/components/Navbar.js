import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UserIcon from "./UserIcon";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";

export default function Navbar({ activeSection, setActiveSection }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, loading } = useCurrentUser();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogin = () => {
    router.push('/login');
    setMenuOpen(false);
  };

  const handleSignup = () => {
    router.push('/signup');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <div className="circular-logo">
          <Image src="/think-india-logo.png" alt="Think India Logo" width={40} height={40} priority />
        </div>
        <span>Think India</span>
      </div>
      <button className="mobile-menu-button" onClick={toggleMenu} aria-label="Toggle menu">
        <div className={`menu-icon ${menuOpen ? "open" : ""}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link href="/about" onClick={() => setMenuOpen(false)}>About</Link>
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
              onClick={() => {
                setActiveSection(id);
                setMenuOpen(false);
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