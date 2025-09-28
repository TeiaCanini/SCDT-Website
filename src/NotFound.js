import React from 'react';
import './App.css';

function NotFound() {
  return (
    <div className="not-found-page">
      <div className="not-found-content">
        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>
        <p className="not-found-description">
          Oops! The page you're looking for doesn't exist or you don't have permission to access it.
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
      </div>
      
      <div className="not-found-image">
        <img src={`${process.env.PUBLIC_URL}/404.png`} alt="404 Not Found" />
      </div>
    </div>
  );
}

export default NotFound;
