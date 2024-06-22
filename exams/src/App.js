import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/layout/Navbar";
import Home from "./components/layout/Home";
import Footer from "./components/layout/Footer";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

import StudentHome from "./components/student/StudentHome";
import ExamList from "./components/student/ExamList";
import ExamDetail from "./components/student/ExamDetail";
import ExamTake from "./components/student/ExamTake";
import Results from "./components/student/Result";
import AllResults from "./components/student/AllResults";

import AdminDashboard from "./components/admin/AdminDashboard";
import ExamCreate from "./components/admin/exams/ExamCreate";
import ExamEdit from "./components/admin/exams/ExamEdit";
import ExamManage from "./components/admin/exams/ExamManage";
import QuestionCreate from "./components/admin/questions/QuestionCreate";
import QuestionsEdit from "./components/admin/questions/QuestionEdit";

import { ProtectedRoute, PublicRoute } from "./utils/ProtectedRoute";

import NotFound from "./components/error/Error404";
import InternalServerError from "./components/error/Error500";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Public Routes */}
          <Route element={<PublicRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Route>

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<StudentHome />} />
            <Route path="/exams" element={<ExamList />} />
            <Route path="/results" element={<AllResults />} />
            <Route path="/exams/:examId" element={<ExamDetail />} />
            <Route path="/exams/:examId/take" element={<ExamTake />} />
            <Route path="/exams/:examId/results" element={<Results />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute admin={true} />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/manage" element={<ExamManage />} />
            <Route path="/admin/create-exam" element={<ExamCreate />} />
            <Route path="/admin/:examId/edit" element={<ExamEdit />} />
            <Route
              path="/admin/exams/:examId/edit-questions"
              element={<QuestionsEdit />}
            />
            <Route
              path="/admin/:examId/add-question"
              element={<QuestionCreate />}
            />
          </Route>

          {/* Error Routes */}
          <Route path="/server-error" element={<InternalServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
      <ToastContainer position="top-center" autoClose={1500} />
    </Provider>
  );
}

export default App;
