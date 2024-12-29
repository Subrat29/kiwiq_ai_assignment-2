import React, { useState } from 'react';
import { DraggableNode } from './draggableNode';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';

export const PipelineToolbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const nodeTypes = [
    { type: 'customInput', label: 'Input' },
    { type: 'llm', label: 'LLM' },
    { type: 'customOutput', label: 'Output' },
    { type: 'text', label: 'Text' },
    { type: 'api', label: 'API' },
    { type: 'transform', label: 'Transform' },
    { type: 'timer', label: 'Timer' },
    { type: 'filter', label: 'Filter' },
    { type: 'aggregator', label: 'Aggregator' },
  ];

  const filteredNodes = nodeTypes.filter(({ label }) =>
    label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className={`border-b border-gray-200 ${isOpen ? 'p-4' : 'p-2'} bg-gray-50 transition-all`}>
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="text-gray-600 hover:text-gray-800 transition"
          aria-label="Toggle Toolbar"
        >
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {isOpen && (
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-2 top-2 text-gray-400" size={16} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search nodes..."
              className="w-full pl-8 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {isOpen && (
        <div className="flex flex-wrap gap-2 mt-3">
          {filteredNodes.map(({ type, label }) => (
            <DraggableNode key={type} type={type} label={label} />
          ))}
        </div>
      )}
    </div>
  );
};
