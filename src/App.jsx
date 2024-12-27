import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import WorkflowBuilder from './components/WorkflowBuilder';
import ReportGenerator from './components/ReportGenerator';
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
