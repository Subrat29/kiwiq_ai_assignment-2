import React from 'react';

const Sidebar = ({ setElements }) => {
  const addElement = (type) => {
    const newElement =
      type === 'BarChart'
        ? { type, data: [10, 20, 30, 40] }
        : type === 'LineChart'
        ? { type, data: [5, 15, 25, 35, 45] }
        : type === 'PieChart'
        ? { type, data: [20, 30, 50] }
        : type === 'Subheading'
        ? { type, text: 'New Subheading' }
        : type === 'Heading'
        ? { type, text: 'New Heading' }
        : { type, text: 'New Paragraph' };
    setElements((els) => [...els, newElement]);
  };

  return (
    <div className="bg-white p-4 border-r-2 border-gray-200">
      <h3 className="text-lg font-bold mb-4">Add Components</h3>
      <button onClick={() => addElement('Heading')} className="block w-full py-2 px-4 bg-green-600 text-white rounded mb-2">Heading</button>
      <button onClick={() => addElement('Subheading')} className="block w-full py-2 px-4 bg-indigo-600 text-white rounded mb-2">Subheading</button>
      <button onClick={() => addElement('Text')} className="block w-full py-2 px-4 bg-yellow-600 text-white rounded mb-2">Paragraph</button>
      <button onClick={() => addElement('BarChart')} className="block w-full py-2 px-4 bg-blue-600 text-white rounded mb-2">Bar Chart</button>
      <button onClick={() => addElement('PieChart')} className="block w-full py-2 px-4 bg-pink-600 text-white rounded mb-2">Pie Chart</button>
      <button onClick={() => addElement('LineChart')} className="block w-full py-2 px-4 bg-purple-600 text-white rounded mb-2">Line Chart</button>
    </div>
  );
};

export default Sidebar;