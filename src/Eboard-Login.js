import React, { useState } from 'react';
import './App.css';

function EboardLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple demo authentication (replace with real authentication)
    if (credentials.username === 'admin' && credentials.password === 'password') {
      setIsLoggedIn(true);
      setError('');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCredentials({ username: '', password: '' });
    setError('');
  };

  if (isLoggedIn) {
    return (
      <div className="eboard-container">
        <h1>SCDT Executive Board Dashboard</h1>
        
        <div className="dashboard-header">
          <h2>Welcome, {credentials.username}!</h2>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>

        <div className="dashboard-content">
          <div className="dashboard-section">
            <h3>Quick Actions</h3>
            <ul className="action-list">
              <li><button className="action-btn">Add Meeting Notes</button></li>
              <li><button className="action-btn">Update Calendar</button></li>
              <li><button className="action-btn">Manage Members</button></li>
              <li><button className="action-btn">Send Announcements</button></li>
            </ul>
          </div>

          <div className="dashboard-section">
            <h3>Recent Activity</h3>
            <ul className="activity-list">
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
              <li>Lorem Ipsum</li>
            </ul>
          </div>


        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <h1>SCDT Executive Board Login</h1>
      
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleInputChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleInputChange}
            required
          />
        </div>
        
        {error && <div className="error-message">{error}</div>}
        
        <button type="submit" className="login-btn">Login</button>
      </form>
      
      <div className="login-info">
        <p><em>Demo credentials: username: admin, password: password</em></p>
        <p>Demo login system. In a production environment, this would be connected to a secure authentication system.</p>
      </div>
    </div>
  );
}

export default EboardLogin;
