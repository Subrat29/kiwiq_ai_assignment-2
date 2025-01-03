import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landing';
import WorkflowBuilder from './pages/work-flow-builder';
import ReportGenerator from './pages/report-generator';
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
