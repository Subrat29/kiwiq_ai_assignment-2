import React from 'react';
import {
  FileText,
  Code,
  Package,
  Globe,
  Repeat,
  Clock,
  Search,
  BarChart,
  Inbox,
  Box,
} from 'lucide-react';

const nodeConfig = {
  customInput: { color: 'bg-blue-100', hoverColor: 'hover:bg-blue-200', icon: <Inbox className="text-blue-600" /> },
  llm: { color: 'bg-purple-100', hoverColor: 'hover:bg-purple-200', icon: <Code className="text-purple-600" /> },
  customOutput: { color: 'bg-green-100', hoverColor: 'hover:bg-green-200', icon: <Package className="text-green-600" /> },
  text: { color: 'bg-gray-100', hoverColor: 'hover:bg-gray-200', icon: <FileText className="text-gray-600" /> },
  api: { color: 'bg-red-100', hoverColor: 'hover:bg-red-200', icon: <Globe className="text-red-600" /> },
  transform: { color: 'bg-yellow-100', hoverColor: 'hover:bg-yellow-200', icon: <Repeat className="text-yellow-600" /> },
  timer: { color: 'bg-indigo-100', hoverColor: 'hover:bg-indigo-200', icon: <Clock className="text-indigo-600" /> },
  filter: { color: 'bg-pink-100', hoverColor: 'hover:bg-pink-200', icon: <Search className="text-pink-600" /> },
  aggregator: { color: 'bg-cyan-100', hoverColor: 'hover:bg-cyan-200', icon: <BarChart className="text-cyan-600" /> },
  default: { color: 'bg-gray-100', hoverColor: 'hover:bg-gray-200', icon: <Box className="text-gray-600" /> },
};

export const DraggableNode = ({ type, label }) => {
  const { color, hoverColor, icon } = nodeConfig[type] || nodeConfig.default;

  const handleDragStart = (event) => {
    const appData = { nodeType: type };
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
    event.currentTarget.style.opacity = '0.8';
  };

  const handleDragEnd = (event) => {
    event.currentTarget.style.opacity = '1';
  };

  return (
    <div
      className={`${color} ${hoverColor} transition duration-200 ease-in-out cursor-grab w-24 h-12 rounded-md flex items-center justify-center gap-1 text-gray-800 font-medium select-none p-2 shadow-sm`}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      draggable
    >
      <span className="text-base">{icon}</span>
      <span className="text-xs">{label}</span>
    </div>
  );
};
