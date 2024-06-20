import logo from './logo.svg';
import './App.css';
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import AdminDashboard from "./components/admin/AdminDashboard";

function App() {
  return (
      <Router>
    <Routes>
    <Route path="/admin" element={<AdminDashboard />} />

      </Routes>

      </Router>

  );
}

export default App;
