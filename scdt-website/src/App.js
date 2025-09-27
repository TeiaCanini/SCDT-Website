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
            <a href="#">Resources</a>
            <a href="#">Calendar</a>
            <a href="#">Meeting Notes</a>
            <a href="#">Eboard Login</a>
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
