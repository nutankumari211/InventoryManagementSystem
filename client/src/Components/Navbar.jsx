import React from 'react';
import { Link } from 'react-router-dom';
import CategoryDropdown from './CategoryDropdown';
import Logo from '../assets/shop1.png';

const Navbar = ({ categories, setSelectedCategory, isLoggedIn, onLogout }) => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <Link to="/" className="navbar-brand">
          <img src={Logo} alt="Site Logo" className="logo" />
          <span className="site-name">ShopKaro</span>
        </Link>
      </div>
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link-btn">
            Home
          </Link>
        </li>
        {isLoggedIn ? (
          <>
            <li>
              <Link to="/add-product" className="nav-link-btn">
                Add Product
              </Link>
            </li>
            <li>
              <button onClick={onLogout} className="nav-link-btn">
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/register" className="nav-link-btn">
                Register
              </Link>
            </li>
            <li>
              <Link to="/login" className="nav-link-btn">
                Login
              </Link>
            </li>
          </>
        )}
        <li className="nav-item">
          <CategoryDropdown categories={categories} onCategoryChange={setSelectedCategory} />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
