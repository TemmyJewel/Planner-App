// ===============================
// SIDEBAR COMPONENT (CLEAN + COMMENTED)
// ===============================

import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PlannerLogo from '../assets/Planner Logo.png';
import './Sidebar.css';

// -------------------------------
// Small reusable menu item
// -------------------------------
function MenuItem({ itemIcon, itemName, route }) {
    return (
    <li className="menu-item">
        {/* NavLink automatically knows when a route is active */}
        <NavLink
        to={route}
        className={({ isActive }) =>
            isActive ? 'menu-link active' : 'menu-link'
        }
        >
        <span className="material-symbols-outlined">{itemIcon}</span>
        <span className="menu-label">{itemName}</span>
        </NavLink>
    </li>
    );
}

// -------------------------------
// Main Sidebar component
// -------------------------------
function Sidebar() {
// Decide sidebar state on first load (mobile = closed)
    const getInitialSidebarState = () => {
    if (typeof window !== 'undefined') {
        return window.innerWidth >= 768; // open on desktop
    }
    return true;
    };

// Sidebar open / close
    const [openSidebar, setOpenSidebar] = useState(getInitialSidebarState);

// Dark mode state (saved in localStorage)
    const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
    );

// Apply dark mode to body
    useEffect(() => {
        const body = document.body;

        if (isDarkMode) {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);

// Toggle sidebar open / close
    function toggleSidebar() {
        setOpenSidebar(prev => !prev);
    }

// Toggle dark mode
    function toggleDarkMode() {
        setIsDarkMode(prev => !prev);
    }

// Icons change based on sidebar state
    const mobileMenuIcon = openSidebar ? 'close' : 'menu';
    const desktopChevronIcon = openSidebar ? 'chevron_left' : 'chevron_right';

// Dynamic classes
    const sidebarClass = `sidebar ${openSidebar ? '' : 'collapsed'}`;
    const indicatorClass = isDarkMode ? 'active' : '';

return (
<>
    {/* Top navbar (mobile toggle) */}
    <nav className="site-nav">
    <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="material-symbols-outlined">{mobileMenuIcon}</span>
    </button>
    </nav>

    {/* Sidebar */}
    <aside className={sidebarClass}>
    {/* Header */}
    <header className="sidebar-header">
        <img
        src={PlannerLogo}
        alt="Planner App Logo"
        className="header-logo"
        />

        <button className="sidebar-toggle" onClick={toggleSidebar}>
        <span className="material-symbols-outlined">
            {desktopChevronIcon}
        </span>
        </button>
    </header>

    {/* Menu */}
    <div className="sidebar-content">
        <ul className="menu-list">
        <MenuItem itemIcon="home" itemName="Home" route="/" />
        <MenuItem itemIcon="checklist" itemName="Tasks" route="/tasks" />
        <MenuItem itemIcon="note_stack" itemName="Notes" route="/notes" />
        </ul>
    </div>

    {/* Footer (Dark Mode Toggle) */}
    <div className="sidebar-footer">
        <button className="theme-toggle" onClick={toggleDarkMode}>
        <div className="theme-label">
            <span className="theme-icon material-symbols-outlined">
            {isDarkMode ? 'light_mode' : 'dark_mode'}
            </span>
            <span className="theme-text">
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </span>
        </div>

        <div className="theme-toggle-track">
            <div className={`theme-toggle-indicator ${indicatorClass}`} />
        </div>
        </button>
    </div>
    </aside>
</>
);
}

export default Sidebar;
