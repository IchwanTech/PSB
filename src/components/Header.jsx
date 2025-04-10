import React from "react";
import "./Header.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Header = () => {
  return (
    <header className="topbar">
      <div className="search-container">
        <div className="search-icon">
          <i className="fas fa-search"></i>
        </div>
        <input type="text" className="search-input" placeholder="Cari..." />
      </div>

      <div className="topbar-right">
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Administrator</span>
            <div className="user-avatar">
              <img src="https://picsum.photos/200" alt="Admin" />
            </div>
          </div>
          <div className="user-menu">
            <button className="icon-button">
              <i className="fas fa-caret-down"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
