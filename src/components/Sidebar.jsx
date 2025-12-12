import { NavLink } from 'react-router-dom';
import {useEffect, useState} from 'react';
import PlannerLogo from "../assets/Planner Logo.png";
import './Sidebar.css';

function MenuItem({itemIcon, itemName, route}){
    // let active = "";
    
    // if(isActive){
    //     active = 'active';
    // }
    return(
        <li className="menu-item">
            <NavLink to={route} 
            // Use a function here to let NavLink manage the active class
                className={({ isActive }) => 
                    isActive ? "menu-link active" : "menu-link"
                }>
            <span className="material-symbols-outlined">
                {itemIcon}
            </span>
            <span className="menu-label">{itemName}</span>
            </NavLink>
        </li>
    )
}

function Sidebar(){

    const getInitialSidebarState = () => {
    if (typeof window !== 'undefined') { 
        
        return window.innerWidth < 768; 
    }
    return true; 
    };

    // / State to toggle sidebar
    const [openSidebar, setOpenSidebar] = useState(getInitialSidebarState);

    // State to toggle Dark Mode
    const prefersDark = localStorage.getItem('theme') === 'dark';
    const [isDarkMode, setIsDarkMode] = useState( prefersDark);

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

    // Function to toggle sidebar state
    function toggleSidebar(){
        setOpenSidebar(!openSidebar);
    }

    function toggleDarkMode(){
        setIsDarkMode(!isDarkMode);
    }

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
                <MenuItem 
                itemIcon={"home"}
                itemName={"Home"}
                route={"/"}
                />
                <MenuItem 
                itemIcon={"checklist"}
                itemName={"Tasks"}
                route={"/tasks"}
                />
                <MenuItem 
                itemIcon={"note_stack"}
                itemName={"Notes"}
                route={"/notes"}
                />
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

export default Sidebar;