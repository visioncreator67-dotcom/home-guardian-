import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/NotFound';
import EmergencyMode from './pages/EmergencyMode';
import Devices from './pages/Devices';
import Contacts from './pages/Contacts';
import LinkProvider from './pages/LinkProvider';
import Settings from './pages/Settings';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />;
        <Route path="/dashboard" element={<Dashboard />} />;
        <Route path="/login" element={<Login />} />;
        <Route path="/signup" element={<Signup />} />;
        <Route path="/emergency" element={<EmergencyMode />} />;
        <Route path="/devices" element={<Devices />} />;
        <Route path="/contacts" element={<Contacts />} />;
        <Route path="/link-provider" element={<LinkProvider />} />;
        <Route path="/settings" element={<Settings />} />;
        <Route path="/forgot-password" element={<ForgotPassword />} />;
        <Route path="/reset-password" element={<ResetPassword />} />;
        <Route path="*" element={<NotFound />} />;
      </Routes>
    </Router>
  );
}

export default App;