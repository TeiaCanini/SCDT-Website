import React from 'react';
import './App.css';

function MeetingNotes() {
  return (
    <div className="meeting-notes-container">
      <h1>Meeting Notes</h1>
      
      <div className="notes-section">
        <div className="meeting-note">
          <h2>Meeting - September 15, 2025</h2>
          <p><strong>Attendees:</strong> 4 members</p>
          <p><strong>Topics Discussed:</strong></p>
          <ul>
            <li>NJIT Hackathon</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
          <p><strong>Action Items:</strong></p>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>

        <div className="meeting-note">
          <h2>Meeting - September 18, 2025</h2>
          <p><strong>Attendees:</strong> 3 members</p>
          <p><strong>Topics Discussed:</strong></p>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
          <p><strong>Action Items:</strong></p>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>

        <div className="meeting-note">
          <h2>Meeting - September 27, 2025</h2>
          <p><strong>Attendees:</strong> 2 members</p>
          <p><strong>Topics Discussed:</strong></p>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
          <p><strong>Action Items:</strong></p>
          <ul>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
            <li>Lorem Ipsum</li>
          </ul>
        </div>
      </div>

      <div className="notes-access">
        <h2>Note</h2>
        <p>Lorem Ipsum</p>
        <p><em>Note: Lorem Ipsum.</em></p>
      </div>
    </div>
  );
}

export default MeetingNotes;
