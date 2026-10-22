import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const linkClass = ({ isActive }) => 'nav-link' + (isActive ? ' active' : '');

const Navbar = () => {
  return (
    <header className="navbar">
      <Link to="/" className="brand">Ngilo</Link>
      <nav className="nav-links">
        <NavLink to="/" end className={linkClass}>Home</NavLink>
        <NavLink to="/inbox" className={linkClass}>Inbox</NavLink>
        <NavLink to="/profile" className={linkClass}>Profile</NavLink>
      </nav>
    </header>
  );
};

export default Navbar;