import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ContentProvider } from './context/ContentContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import BackofficeLogin from './pages/BackofficeLogin';
import './App.css';

function App() {
  return (
    <ContentProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/backoffice" element={<BackofficeLogin />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ContentProvider>
  );
}

export default App;
