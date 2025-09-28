import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './Home';
import Resources from './Resources';
import Calendar from './Calendar';
import MeetingNotes from './Meeting-Notes';
import EboardLogin from './Eboard-Login';
import Github from './github';

function App() {
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
              <Link to="/resources">Resources</Link>
              <Link to="/calendar">Calendar</Link>
              <Link to="/meeting-notes">Meeting Notes</Link>
              <Link to="/eboard-login">Eboard Login</Link>
              <Link to="/github">GitHub</Link>
            </div>
          </div>
          <Link to="/" className="header-title">Stevens Cyber Defense Team</Link>
          <div className='SCDT-logo'>
            SCDT
          </div>
        </header>
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/meeting-notes" element={<MeetingNotes />} />
            <Route path="/eboard-login" element={<EboardLogin />} />
            <Route path="/github" element={<Github />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
