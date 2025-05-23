import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import UserIcon from "./UserIcon";
import useCurrentUser from "../hooks/useCurrentUser";
import { useRouter } from "next/router";

export default function Navbar({ activeSection, setActiveSection }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { user, loading } = useCurrentUser();
  const router = useRouter();
  const drawerRef = useRef(null);
  const buttonRef = useRef(null);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    document.body.style.overflow = !drawerOpen ? 'hidden' : 'unset';
  };

  const closeDrawer = () => {
    setDrawerOpen(false);
    document.body.style.overflow = 'unset';
  };

  // Close drawer when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        closeDrawer();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Close drawer on route change
  useEffect(() => {
    const handleRouteChange = () => closeDrawer();
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      document.body.style.overflow = 'unset';
    };
  }, [router]);

  // Example menu items (replace with your real ones)
  const menuItems = [
    { icon: '🏠', label: 'Home', href: '/' },
    { icon: 'ℹ️', label: 'About', href: '#about' },
    { icon: '💼', label: 'Internships', href: '/internships' },
    { icon: '📰', label: 'Blog', href: '/blog' },
    { icon: '🎉', label: 'Events', href: '#events' },
    { icon: '👥', label: 'Team', href: '#team' },
    { icon: '📞', label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="navbar mobile-navbar">
        <button
          className="floating-hamburger in-navbar"
          onClick={toggleDrawer}
          ref={buttonRef}
          aria-label="Open menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>
        <div className="mobile-navbar-center">
          <div className="circular-logo">
            <Image src="/think-india-logo.png" alt="Think India Logo" width={36} height={36} priority />
          </div>
          <span className="mobile-navbar-title">Think India</span>
        </div>
      </nav>

      {/* Overlay */}
      <div
        className={`side-drawer-overlay${drawerOpen ? ' active' : ''}`}
        onClick={closeDrawer}
      />

      {/* Side Drawer */}
      <aside
        className={`side-drawer${drawerOpen ? ' open' : ''}`}
        ref={drawerRef}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-user">
            <div className="drawer-avatar">
              <Image src="/think-india-logo.png" alt="User" width={40} height={40} />
            </div>
            <div className="drawer-user-info">
              <span className="drawer-user-name">
                {user ? user.name || 'User Name' : 'Guest'}
              </span>
            </div>
          </div>
          <button className="drawer-signout" onClick={() => {/* sign out logic */}}>
            {user ? 'Sign out' : ''}
          </button>
        </div>
        {/* Menu List */}
        <nav className="drawer-menu">
          <ul>
            {menuItems.map((item) => (
              <li key={item.label}>
                <Link href={item.href} onClick={closeDrawer} className="drawer-menu-link">
                  <span className="drawer-menu-icon">{item.icon}</span>
                  <span className="drawer-menu-label">{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Desktop Navbar (hidden on mobile) */}
      <nav className="navbar desktop-navbar">
        <div className="logo">
          <div className="circular-logo">
            <Image src="/think-india-logo.png" alt="Think India Logo" width={40} height={40} priority />
          </div>
          <span>Think India</span>
        </div>
        <ul className="nav-links">
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
                onClick={() => setActiveSection(id)}
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
                <button onClick={() => router.push('/login')} className="login-btn" type="button">Login</button>
                <button onClick={() => router.push('/signup')} className="signup-btn" type="button">Sign Up</button>
              </>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
} 