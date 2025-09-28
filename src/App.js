import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { FaInstagram } from 'react-icons/fa';
import './App.css';
import Home from './Home';
import Github from './github';
import Resources from './Resources';
import ClubResources from './Club-Resources';
import ArticleView from './ArticleView';
import Analytics from './Analytics';
import NotFound from './NotFound';
import Calendar from './Calendar';
import MeetingNotes from './Meeting-Notes';
import EboardLogin from './Eboard-Login';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Default to dark theme
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open state
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false); // Submenu open state

  useEffect(() => {
    // Check if user has a saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDarkTheme(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    // Apply theme to document body
    document.body.className = isDarkTheme ? 'dark-theme' : 'light-theme';
    // Save theme preference
    localStorage.setItem('theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('.main-navigation')) {
        setIsMenuOpen(false);
        setIsSubmenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsSubmenuOpen(false);
  };

  const toggleSubmenu = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsSubmenuOpen(!isSubmenuOpen);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="main-navigation">
            <button 
              className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
              onClick={toggleMenu}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
              <span className="menu-bar"></span>
            </button>
            
            <div className={`navigation-menu ${isMenuOpen ? 'open' : ''}`}>
              <Link to="/" className="nav-item" onClick={closeMenu}>
                <span className="nav-icon">🏠</span>
                <span className="nav-text">Home</span>
              </Link>
              
              <div className="nav-item-with-submenu">
                <button 
                  className={`nav-item submenu-trigger ${isSubmenuOpen ? 'active' : ''}`}
                  onClick={toggleSubmenu}
                  aria-expanded={isSubmenuOpen}
                >
                  <span className="nav-icon">📚</span>
                  <span className="nav-text">Resources</span>
                  <span className={`submenu-indicator ${isSubmenuOpen ? 'rotated' : ''}`}>▼</span>
                </button>
                
                <div className={`submenu ${isSubmenuOpen ? 'visible' : ''}`}>
                  <Link to="/resources/general" className="submenu-item" onClick={closeMenu}>
                    <span className="nav-icon">🔗</span>
                    <span className="nav-text">General Resources</span>
                  </Link>
                  <Link to="/resources/club" className="submenu-item" onClick={closeMenu}>
                    <span className="nav-icon">📄</span>
                    <span className="nav-text">Club Resources</span>
                  </Link>
                </div>
              </div>
              
              <Link to="/github" className="nav-item" onClick={closeMenu}>
                <span className="nav-icon">💻</span>
                <span className="nav-text">GitHub</span>
              </Link>
              
              <Link to="/calendar" className="nav-item" onClick={closeMenu}>
                <span className="nav-icon">📅</span>
                <span className="nav-text">Calendar</span>
              </Link>
              
              <Link to="/meeting-notes" className="nav-item" onClick={closeMenu}>
                <span className="nav-icon">📝</span>
                <span className="nav-text">Meeting Notes</span>
              </Link>
              
              <Link to="/eboard-login" className="nav-item" onClick={closeMenu}>
                <span className="nav-icon">👥</span>
                <span className="nav-text">Eboard Login</span>
              </Link>
            </div>
          </nav>
          <Link to="/" className="header-title">Stevens Cyber Defense Team</Link>
          <div className="theme-toggle-container">
            <button onClick={toggleTheme} className="theme-toggle-btn">
              {isDarkTheme ? '☀️' : '🌙'}
            </button>
          </div>
          <div className='SCDT-logo'>
            SCDT
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/general" element={<Resources />} />
            <Route path="/resources/club" element={<ClubResources />} />
            <Route path="/resources/club/:articleId" element={<ArticleView />} />
            <Route path="/resources/club/analytics" element={<Analytics />} />
            <Route path="/github" element={<Github/>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/meeting-notes" element={<MeetingNotes />} />
            <Route path="/eboard-login" element={<EboardLogin />} />
            {/* Catch-all route for 404 pages */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        
        <footer className="app-footer">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Connect With Us</h4>
              <div className="footer-links">
                <a 
                  href="https://ducklink.stevens.edu/SCDT/club_signup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <span className="footer-icon">🦆</span>
                  Ducklink
                </a>
                <a 
                  href="https://www.instagram.com/stevens_scdt/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  <FaInstagram className="footer-icon instagram-icon" />
                  Instagram
                </a>
                <a 
                  href="mailto:scdt@stevens.edu"
                  className="footer-link"
                >
                  <span className="footer-icon">📧</span>
                  scdt@stevens.edu
                </a>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2025 Stevens Cyber Defense Team. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
