
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo" aria-label="Салон красоты Ego - главная страница">
            <h1>Ego</h1>
          </Link>
          
          <nav className={`nav ${isMenuOpen ? 'nav-open' : ''}`} aria-label="Основная навигация">
            <Link to="/" className="nav-link">Главная</Link>
            <Link to="/services" className="nav-link">Услуги</Link>
            <Link to="/about" className="nav-link">О нас</Link>
            <Link to="/contacts" className="nav-link">Контакты</Link>
          </nav>

          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label="Открыть меню"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
