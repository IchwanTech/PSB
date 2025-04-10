import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaTachometerAlt, FaUserPlus } from "react-icons/fa";

const Sidebar = () => {
  return (
    <div className="sidebar d-flex flex-column justify-content-between">
      <div>
        <div className="sidebar-brand">
          <h2>Administrasi</h2>
        </div>
        <div className="sidebar-menu">
          <NavLink to="/" className="menu-item" end>
            <div className="menu-icon me-2">
              <FaTachometerAlt />
            </div>
            <span>Dashboard</span>
          </NavLink>
          <NavLink to="/tambah" className="menu-item">
            <div className="menu-icon me-2">
              <FaUserPlus />
            </div>
            <span>Tambah Pendaftar</span>
          </NavLink>
        </div>
      </div>

      <div className="sidebar-logout">
        <button className="btn btn-danger w-100 m-2">
          <i className="fas fa-sign-out-alt me-2"></i>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
