import React from 'react';

const Sidebar = ({ setElements }) => {
  const addElement = (type) => {
    const newElement =
      type === 'BarChart'
        ? { type, data: [10, 20, 30, 40] }
        : { type, text: 'New Text Element' };
    setElements((els) => [...els, newElement]);
  };

  return (
    <div className="w-1/4 bg-white p-4 border-r-2 border-gray-200">
      <h3 className="text-lg font-bold mb-4">Components</h3>
      <button onClick={() => addElement('BarChart')} className="block w-full py-2 px-4 bg-blue-600 text-white rounded mb-2">Add Bar Chart</button>
      <button onClick={() => addElement('Text')} className="block w-full py-2 px-4 bg-green-600 text-white rounded">Add Text</button>
    </div>
  );
};

export default Sidebar;