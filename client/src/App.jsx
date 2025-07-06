import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Page Imports
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import CoursePage from './pages/CoursePage.jsx';
import CreateCoursePage from './pages/CreateCoursePage.jsx';
import './App.css';
import MyCoursesPage from './pages/MyCoursesPage.jsx';
import InstructorDashboardPage from './pages/InstructorDashboardPage.jsx';
import PaymentSuccessPage from './pages/PaymentSuccessPage.jsx';

function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/course/:id" element={<CoursePage />} />

          {/* Protected Routes for any logged in user */}
          <Route element={<ProtectedRoute allowedRoles={['student', 'instructor']} />}>
             <Route path="/my-courses" element={<MyCoursesPage />} />
             <Route path="/payment-success" element={<PaymentSuccessPage />} /> {/* Add the new route */}
          </Route>

          {/* Protected Routes for Instructors only */}
          <Route element={<ProtectedRoute allowedRoles={['instructor']} />}>
            <Route path="/create-course" element={<CreateCoursePage />} />
            <Route path="/dashboard" element={<InstructorDashboardPage />} />
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;