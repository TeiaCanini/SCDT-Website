import React from 'react';
import './App.css';

function Calendar() {
  return (
    <div className="calendar-container">
      <h1>SCDT Calendar</h1>
      
      <div className="calendar-section">
        <h2>Upcoming Events</h2>
        <div className="event-list">
          <div className="event-item">
            <h3>Weekly Team Meeting</h3>
            <p><strong>Date:</strong> Every Wednesday</p>
            <p><strong>Time:</strong> 7:00 PM - 8:30 PM</p>
            <p><strong>Location:</strong> NJIT</p>
            <p><strong>Description:</strong> Lorem Ipsum</p>
          </div>
          
          <div className="event-item">
            <h3>CTF Practice Session</h3>
            <p><strong>Date:</strong> Every Friday</p>
            <p><strong>Time:</strong> 6:00 PM - 9:00 PM</p>
            <p><strong>Location:</strong> NJIT</p>
            <p><strong>Description:</strong> Lorem Ipsum</p>
          </div>
          
          <div className="event-item">
            <h3>Guest Speaker Series</h3>
            <p><strong>Date:</strong> Monthly (First Thursday)</p>
            <p><strong>Time:</strong> 7:00 PM - 8:00 PM</p>
            <p><strong>Location:</strong> Lorem Ipsum</p>
            <p><strong>Description:</strong> Lorem Ipsum</p>
          </div>
        </div>
      </div>

      <div className="calendar-section">
        <h2>Competition Schedule</h2>
        <div className="competition-list">
          <div className="competition-item">
            <h3>National Cyber League (NCL)</h3>
            <p><strong>Registration:</strong> Lorem Ipsum</p>
            <p><strong>Competition:</strong> Lorem Ipsum</p>
            <p><strong>Type:</strong> Individual and Team</p>
          </div>
          
          <div className="competition-item">
            <h3>Cyber Defense Competition(CDC)</h3>
            <p><strong>Registration:</strong> Lorem Ipsum</p>
            <p><strong>Regional:</strong> Lorem Ipsum</p>
            <p><strong>Type:</strong> Team Defense</p>
          </div>
        </div>
      </div>


    </div>
  );
}

export default Calendar;
