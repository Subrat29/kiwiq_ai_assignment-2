import React, { useState } from 'react';
import Sidebar from './ReportGenerator/Sidebar';
import BarChart from './ReportGenerator/D3Charts/BarChart';
import LineChart from './ReportGenerator/D3Charts/LineChart';
import PieChart from './ReportGenerator/D3Charts/PieChart';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ReportGenerator = () => {
  const [elements, setElements] = useState([]);
  const [isPreview, setIsPreview] = useState(false);

  const updateElement = (index, newData) => {
    setElements((els) => els.map((el, i) => (i === index ? { ...el, ...newData } : el)));
  };

  const deleteElement = (index) => {
    setElements((els) => els.filter((_, i) => i !== index));
  };

  const moveElement = (dragIndex, hoverIndex) => {
    const updatedElements = [...elements];
    const [removed] = updatedElements.splice(dragIndex, 1);
    updatedElements.splice(hoverIndex, 0, removed);
    setElements(updatedElements);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex">
        <Sidebar setElements={setElements} />
        <div className="flex-grow bg-gray-50 border-l-2 border-gray-200 p-4">
          <div className="mb-4">
            <button
              onClick={() => setIsPreview(!isPreview)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isPreview ? 'Edit' : 'Preview'}
            </button>
          </div>
          {elements.map((el, index) => (
            <DraggableElement
              key={index}
              index={index}
              element={el}
              onUpdate={(newData) => updateElement(index, newData)}
              onDelete={() => deleteElement(index)}
              moveElement={moveElement}
              isPreview={isPreview}
            />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

const DraggableElement = ({ element, index, onUpdate, onDelete, moveElement, isPreview }) => {
  const [, ref] = useDrag({
    type: 'element',
    item: { index },
  });

  const [, drop] = useDrop({
    accept: 'element',
    hover: (item) => {
      if (item.index !== index) {
        moveElement(item.index, index);
        item.index = index;
      }
    },
  });

  const handleTextChange = (e) => {
    onUpdate({ text: e.target.value });
  };

  const handleDataChange = (e) => {
    const newData = e.target.value.split(',').map(Number);
    onUpdate({ data: newData });
  };

  const addChartRow = () => {
    onUpdate({
      data: [...element.data, 0],
      labels: [...(element.labels || []), `Label ${element.labels?.length + 1 || 1}`],
    });
  };

  const updateChartValue = (index, value) => {
    const newData = [...element.data];
    newData[index] = value;
    onUpdate({ data: newData });
  };

  const updateLabel = (index, value) => {
    const newLabels = [...(element.labels || [])];
    newLabels[index] = value;
    onUpdate({ labels: newLabels });
  };

  return (
    <div
      ref={(node) => ref(drop(node))}
      className="mb-4 border p-2 bg-white rounded shadow flex flex-col relative"
    >
      {!isPreview && (
        <div className="absolute top-2 right-2 flex space-x-2">
          <button
            className="text-red-600 hover:text-red-800 font-bold"
            onClick={onDelete}
          >
            ✖
          </button>
          <span className="cursor-move text-gray-500">↕</span>
        </div>
      )}
      <div>
        {element.type === 'BarChart' && <BarChart data={element.data} labels={element.labels} hoverInfo={element.labels} />}
        {element.type === 'LineChart' && <LineChart data={element.data} labels={element.labels} hoverInfo={element.labels} />}
        {element.type === 'PieChart' && <PieChart data={element.data} labels={element.labels} hoverInfo={element.labels} />}
        {element.type === 'Heading' || element.type === 'Subheading' || element.type === 'Text' ? (
          <input
            type="text"
            value={element.text || ''}
            onChange={handleTextChange}
            className={
              `w-full p-2 ${
                element.type === 'Heading'
                  ? 'text-xl font-bold'
                  : element.type === 'Subheading'
                  ? 'text-lg font-semibold'
                  : ''
              } border border-gray-300 rounded`
            }
            disabled={isPreview}
          />
        ) : null}
        {element.type.includes('Chart') && !isPreview && (
          <>
            <div className="flex gap-2 mb-2">
              <button
                onClick={addChartRow}
                className="px-2 py-1 bg-green-500 text-white rounded"
              >
                Add Entry
              </button>
            </div>
            <ul className="mb-2">
              {element.data.map((val, i) => (
                <li key={i} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={element.labels?.[i] || ''}
                    onChange={(e) => updateLabel(i, e.target.value)}
                    placeholder={`Label ${i + 1}`}
                    className="p-1 border border-gray-300 rounded"
                  />
                  <input
                    type="number"
                    value={val}
                    onChange={(e) => updateChartValue(i, Number(e.target.value))}
                    className="p-1 border border-gray-300 rounded"
                  />
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;
