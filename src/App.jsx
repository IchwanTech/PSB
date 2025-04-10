import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import FormPendaftar from "./components/FormPendaftar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="content-container">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/tambah" element={<FormPendaftar />} />
              <Route path="/edit/:id" element={<FormPendaftar />} />
            </Routes>
          </main>
          <footer className="footer">
            <p>&copy; 2025 Sistem Pendaftaran Siswa Baru</p>
          </footer>
        </div>
      </div>
    </Router>
  );
}

export default App;
