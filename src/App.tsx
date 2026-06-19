// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';
import AdminPortal from './components/AdminPortal';
import HomePage from './pages/HomePage';
import LoungesPage from './pages/LoungesPage';
import MembershipPage from './pages/MembershipPage';
import MyBookingsPage from './pages/MyBookingsPage';
import HelpPage from './pages/HelpPage';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <main id="app-container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/lounges" element={<LoungesPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/bookings" element={<MyBookingsPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>
          <Footer />
          <AuthModal />
          <AdminPortal />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}