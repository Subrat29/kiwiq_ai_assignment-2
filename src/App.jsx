import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import WorkflowBuilder from './pages/Workflow-builder';
import ReportGenerator from './pages/ReportGenerator';
const App = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/workflow-builder" element={<WorkflowBuilder />} />
        <Route path="/report-generator" element={<ReportGenerator />} />
      </Routes>
    </Router>

  );

};

export default App;
