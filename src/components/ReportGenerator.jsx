import React, { useState } from 'react';
import Sidebar from './Sidebar';
import D3Charts from './D3Charts/BarChart';

const ReportGenerator = () => {
  const [elements, setElements] = useState([]);

  return (
    <div className="h-screen flex">
      <Sidebar setElements={setElements} />
      <div className="flex-grow bg-gray-50 border-l-2 border-gray-200 p-4">
        {elements.map((el, index) => (
          <div key={index} className="mb-4">
            {el.type === 'BarChart' ? <D3Charts data={el.data} /> : <p>{el.text}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportGenerator;
