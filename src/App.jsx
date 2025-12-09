import PlannerLogo from "./assets/Planner Logo.png";
import {useEffect, useState} from 'react';
import './App.css';
import './Sidebar.css';

function Sidebar(){
  const getInitialSidebarState = () => {
  if (typeof window !== 'undefined') { 
    
    return window.innerWidth < 768; 
  }
  return true; 
};



  // State to toggle sidebar
  const [openSidebar, setOpenSidebar] = useState(getInitialSidebarState);

  // Function to toggle sidebar state
  function toggleSidebar(){
    setOpenSidebar(!openSidebar);
  }

   // State to toggle Dark Mode
  const prefersDark = localStorage.getItem('theme') === 'dark';
  const [isDarkMode, setIsDarkMode] = useState( prefersDark);

  function toggleDarkMode(){
    setIsDarkMode(!isDarkMode);
  }

  useEffect(() => {
    const body = document.body;
    if(isDarkMode) {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    }else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Icon logic for mobile menu button (toggles between 'menu' and 'close')
    const mobileMenuIcon = openSidebar ? 'close' : 'menu';

    // Icon logic for desktop chevron button (points to close or open)
    const desktopChevronIcon = !openSidebar ? 'chevron_right' : 'chevron_left';

    // Dynamic class for sidebar
    const sidebarClass = `sidebar ${!openSidebar ? "collapsed" : ""}`;
    
    // Dynamic class for theme indicator (for CSS styling the toggle position)
    const indicatorClass = isDarkMode ? 'active' : '';

  return (
    <>
      {/* Site navbar */}
      <nav className="site-nav">
        <button className={`sidebar-toggle`} onClick={toggleSidebar}>
            <span className="material-symbols-outlined">
              {mobileMenuIcon}
            </span>
          </button>
      </nav>
      <aside 
      className={sidebarClass}
      >
        {/* Sidebar Header */}
        <header className="sidebar-header">
          <img src={PlannerLogo} alt="Planner-App Logo" className="header-logo"/>
          
          <button className={`sidebar-toggle`} onClick={toggleSidebar}>
            <span className="material-symbols-outlined">
              {desktopChevronIcon}
            </span>
          </button>
        </header>

        <div className="sidebar-content">
          {/* Menu List */}
          <ul className="menu-list">
            <li className="menu-item">
              <a href="#" className="menu-link active">
                <span className="material-symbols-outlined">
                  home
                </span>
                <span className="menu-label">Home</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">
                <span className="material-symbols-outlined">
                  checklist
                </span>
                <span className="menu-label">Tasks</span>
              </a>
            </li>
            <li className="menu-item">
              <a href="#" className="menu-link">
                <span className="material-symbols-outlined">
                      note_stack
                  </span>
                <span className="menu-label">Notes</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={toggleDarkMode}>
            <div className="theme-label">
              <span className="theme-icon material-symbols-outlined">
                {isDarkMode ? "light_mode" : "dark_mode"}
              </span>
              <span className="theme-text">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </div>
            <div className="theme-toggle-track">
              <div className={`theme-toggle-indicator ${indicatorClass}`}>

              </div>
            </div>
          </button>
        </div>
      </aside>
    </>
  )
}


function App() {
  

  return (
    <>
      <Sidebar/>
    </>
  )
}

export default App
