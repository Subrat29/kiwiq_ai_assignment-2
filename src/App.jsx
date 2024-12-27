import React, { useState } from 'react';
import WorkflowBuilder from './components/WorkflowBuilder';
import ReportGenerator from './components/ReportGenerator';

const App = () => {
  const [activeTab, setActiveTab] = useState('Workflow');

  return (
    <div className="h-screen">
      <div className="p-4 bg-blue-600 text-white flex justify-between">
        <button onClick={() => setActiveTab('Workflow')} className="px-4 py-2 bg-blue-800 rounded">Workflow Builder</button>
        <button onClick={() => setActiveTab('Report')} className="px-4 py-2 bg-blue-800 rounded">Report Generator</button>
      </div>
      <div className="h-full">
        {activeTab === 'Workflow' ? <WorkflowBuilder /> : <ReportGenerator />}
      </div>
    </div>
  );
};

export default App;
