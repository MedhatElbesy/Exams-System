import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";

import AdminDashboard from "./components/admin/AdminDashboard";
import ExamCreate from "./components/admin/ExamCreate";
import QuestionCreate from "./components/admin/QuestionCreate";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./components/layout/Home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/create-exam" element={<ExamCreate />} />
          <Route
            path="/admin/:examId/add-question"
            element={<QuestionCreate />}
          />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-center" autoClose={1500} />
    </Provider>
  );
}

export default App;
