import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./components/admin/AdminDashboard";
import ExamCreate from "./components/admin/ExamCreate";

function App() {
  return (
    <Provider store={store}>

      <Router>
    <Routes>
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/admin/create-exam" element={<ExamCreate />} />

      </Routes>

      </Router>
      <ToastContainer position="top-center" autoClose={1500} />
    </Provider>

  );
}

export default App;
