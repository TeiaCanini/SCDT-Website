import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Github from './github';
import Resources from './Resources';
import ClubResources from './Club-Resources';
import Calendar from './Calendar';
import MeetingNotes from './Meeting-Notes';
import EboardLogin from './Eboard-Login';

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Default to dark theme

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

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <div className="dropdown-nav">
            <button className="dropbtn">Menu
              <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-nav-content">
              <Link to="/">Home</Link>
              <div className="dropdown-submenu">
                <span className="submenu-title">Resources ▶</span>
                <div className="submenu-content">
                  <Link to="/resources/general">General Resources</Link>
                  <Link to="/resources/club">Club Resources</Link>
                </div>
              </div>
              <Link to="/github">Github</Link>
              <Link to="/calendar">Calendar</Link>
              <Link to="/meeting-notes">Meeting Notes</Link>
              <Link to="/eboard-login">Eboard Login</Link>
            </div>
          </div>
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
            <Route path="/github" element={<Github/>} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/meeting-notes" element={<MeetingNotes />} />
            <Route path="/eboard-login" element={<EboardLogin />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
