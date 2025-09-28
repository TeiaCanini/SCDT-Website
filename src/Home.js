import React from 'react';
import './App.css';

function Home() {
  return (
    <div className="home-container">
      <div className="About">
        <h2>About SCDT</h2>
        <p>
          Stevens Cyber Defense Team (SCDT) is a student organization dedicated to 
          cybersecurity education, training and competition. We participate in various 
          cybersecurity competitions, host workshops and provide hands-on learning 
          opportunities for students interested in information security.
        </p>
      </div>
      <div className="Join">
        <h2>Join SCDT</h2>
        <p>
          Interested in joining our team? We welcome students of all skill levels who 
          are passionate about cybersecurity. Our meetings are held weekly where we 
          discuss current security topics, practice challenges, and prepare for competitions.
        </p>
        <p>
          <strong>Meeting Details:</strong><br />
          Time: Weekly meetings (check calendar for specific times)<br />
          Location: To be announced<br />
          Contact: Reach out through resources page for more information
        </p>
        <div className="join-us-section">
          <h3>🚀 Ready to Join Us?</h3>
          <p>Connect with our community and stay updated on all SCDT activities!</p>
          <a 
            href="https://discord.com/invite/pAmBhnYSbY" 
            target="_blank" 
            rel="noopener noreferrer"
            className="discord-join-btn"
          >
            <span className="discord-icon">💬</span>
            Join our Discord Server
          </a>
        </div>
      </div>
    </div>
  );
}

export default Home;