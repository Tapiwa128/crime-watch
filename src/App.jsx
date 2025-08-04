// App.jsx
import React from 'react';
import 'leaflet/dist/leaflet.css';  // <-- Added Leaflet CSS import here
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Loader from './components/Loader';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Dashboard from './components/Dashboard';
import ReportForm from './components/ReportForm';
import ChatBot from './components/ChatBot';
import GlobalStyles from './styles/GlobalStyles';

const theme = {
  colors: {
    primary: '#4361ee',
    secondary: '#3f37c9',
    accent: '#4895ef',
    danger: '#f72585',
    success: '#4cc9f0',
    dark: '#212529',
    light: '#f8f9fa',
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)',
    lg: '0 10px 25px rgba(0,0,0,0.1), 0 5px 10px rgba(0,0,0,0.05)'
  },
  radii: {
    sm: '4px',
    md: '8px',
    lg: '12px'
  }
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <ChatBot />
        <Routes>
          <Route path="/" element={<Loader />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/report" element={<ReportForm />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
