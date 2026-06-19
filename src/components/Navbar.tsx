// src/components/Navbar.tsx
import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import { AuthContext } from '../contexts/AuthContext';

export default function Navbar() {
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useContext(ThemeContext);
  const { user, logout, openAuth } = useContext(AuthContext);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      logout();
      navigate('/');
    }
  };

  return (
    <nav>
      <div className="nav-logo" onClick={() => navigate('/')}>
        Lounge<span>Pass</span>
      </div>
      <ul className="nav-links">
        <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/lounges" className={({ isActive }) => isActive ? 'active' : ''}>Lounges</NavLink></li>
        <li><NavLink to="/membership" className={({ isActive }) => isActive ? 'active' : ''}>Membership</NavLink></li>
        <li><NavLink to="/bookings" className={({ isActive }) => isActive ? 'active' : ''}>My Bookings</NavLink></li>
        <li><NavLink to="/help" className={({ isActive }) => isActive ? 'active' : ''}>Help</NavLink></li>
      </ul>
      <div className="nav-actions">
        <button 
          type="button"
          className="btn-ghost" 
          style={{ padding: '8px 12px', fontSize: '16px', border: 'none' }} 
          onClick={toggleTheme} 
          title="Toggle Theme"
        >
          {isDark ? '☀️' : '🌙'}
        </button>
        
        {user ? (
          user.picture ? (
            <img 
              src={user.picture} 
              alt="Profile" 
              onClick={handleLogout}
              title={`Logout (${user.name})`}
              style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover', cursor: 'pointer', border: '2px solid var(--accent)' }} 
            />
          ) : (
            <div 
              onClick={handleLogout}
              title={`Logout (${user.name})`}
              style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', fontWeight: 'bold' }}
            >
              {(user.name || 'U').charAt(0).toUpperCase()}
            </div>
          )
        ) : (
          <>
            <button type="button" className="btn-ghost" onClick={() => openAuth('signin')}>Sign in</button>
            <button type="button" className="btn-solid" onClick={() => openAuth('signup')}>Join free</button>
          </>
        )}
      </div>
    </nav>
  );
}