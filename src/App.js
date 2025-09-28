import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="dropdown-nav">
          <button class="dropbtn">Menu
            <i class="fa fa-caret-down"></i>
          </button>
          <div class="dropdown-nav-content">
            <a href="Home.js">Home</a>
            <a href="Resources.js">Resources</a>
            <a href="Calendar.js">Calendar</a>
            <a href="Meeting-Notes.js">Meeting Notes</a>
            <a href="Eboard-Login.js">Eboard Login</a>
          </div>
        </div>
        Stevens Cyber Defense Team
        <div className='SCDT-logo'>
          logo
        </div>
      </header>
    </div>
  );
}

export default App;
