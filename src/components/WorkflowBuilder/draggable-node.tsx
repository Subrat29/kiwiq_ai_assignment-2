import React from 'react';
import { useDispatch } from 'react-redux';
import { addNode } from '@/redux/flowSlice';
import { useNodeId } from '@/hooks/useNodeId';
import { 
  ArrowUpToLine, 
  ArrowDownToLine, 
  Bot, 
  ListTree, 
  ClipboardList,
  StickyNote,
  Box,
  Linkedin,
  Users,
  BarChart,
  LineChart
} from 'lucide-react';

const nodeConfig = {
  input: { 
    color: 'bg-orange-50', 
    hoverColor: 'hover:bg-orange-100', 
    borderColor: 'border-orange-200',
    iconColor: 'text-orange-500',
    icon: <ArrowUpToLine className="h-4 w-4" /> 
  },
  output: { 
    color: 'bg-rose-50', 
    hoverColor: 'hover:bg-rose-100',
    borderColor: 'border-rose-200', 
    iconColor: 'text-rose-500',
    icon: <ArrowDownToLine className="h-4 w-4" /> 
  },
  askAI: { 
    color: 'bg-purple-50', 
    hoverColor: 'hover:bg-purple-100',
    borderColor: 'border-purple-200', 
    iconColor: 'text-purple-500',
    icon: <Bot className="h-4 w-4" /> 
  },
  combineLists: { 
    color: 'bg-green-50', 
    hoverColor: 'hover:bg-green-100',
    borderColor: 'border-green-200', 
    iconColor: 'text-green-500',
    icon: <ListTree className="h-4 w-4" /> 
  },
  joinListItems: { 
    color: 'bg-green-50', 
    hoverColor: 'hover:bg-green-100',
    borderColor: 'border-green-200', 
    iconColor: 'text-green-500',
    icon: <ListTree className="h-4 w-4" /> 
  },
  generateFile: { 
    color: 'bg-blue-50', 
    hoverColor: 'hover:bg-blue-100',
    borderColor: 'border-blue-200', 
    iconColor: 'text-blue-500',
    icon: <ClipboardList className="h-4 w-4" /> 
  },
  typeform: { 
    color: 'bg-blue-50', 
    hoverColor: 'hover:bg-blue-100',
    borderColor: 'border-blue-200', 
    iconColor: 'text-blue-500',
    icon: <ClipboardList className="h-4 w-4" /> 
  },
  notes: { 
    color: 'bg-yellow-50', 
    hoverColor: 'hover:bg-yellow-100',
    borderColor: 'border-yellow-200', 
    iconColor: 'text-yellow-500',
    icon: <StickyNote className="h-4 w-4" /> 
  },
  channel: { 
    color: 'bg-blue-50', 
    hoverColor: 'hover:bg-blue-100',
    borderColor: 'border-blue-200', 
    iconColor: 'text-blue-500',
    icon: <Linkedin className="h-4 w-4" /> 
  },
  segment: { 
    color: 'bg-blue-50', 
    hoverColor: 'hover:bg-blue-100',
    borderColor: 'border-blue-200', 
    iconColor: 'text-blue-500',
    icon: <Users className="h-4 w-4" /> 
  },
  metric: { 
    color: 'bg-blue-50', 
    hoverColor: 'hover:bg-blue-100',
    borderColor: 'border-blue-200', 
    iconColor: 'text-blue-500',
    icon: <BarChart className="h-4 w-4" /> 
  },
  analysis: { 
    color: 'bg-blue-50', 
    hoverColor: 'hover:bg-blue-100',
    borderColor: 'border-blue-200', 
    iconColor: 'text-blue-500',
    icon: <LineChart className="h-4 w-4" /> 
  },
  default: { 
    color: 'bg-gray-50', 
    hoverColor: 'hover:bg-gray-100',
    borderColor: 'border-gray-200', 
    iconColor: 'text-gray-500',
    icon: <Box className="h-4 w-4" /> 
  }
};

export const DraggableNode = ({ type, label }) => {
  const dispatch = useDispatch();
  const getNodeId = useNodeId();
  const config = nodeConfig[type] || nodeConfig.default;

  const handleDragStart = (event) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify({ type }));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleClick = () => {
    const newNode = {
      id: getNodeId(type),
      type,
      position: { x: 100, y: 100 },
      data: { label: `${label} node` },
    };
    dispatch(addNode(newNode));
  };

  return (
    <div
      className={`
        ${config.color} 
        ${config.hoverColor} 
        transition-all 
        duration-200 
        cursor-grab 
        w-full 
        rounded-lg 
        flex 
        items-center 
        gap-2.5 
        font-medium 
        select-none 
        p-2.5 
        border
        ${config.borderColor}
        shadow-sm
      `}
      onDragStart={handleDragStart}
      onClick={handleClick}
      draggable
    >
      <div className={`flex h-6 w-6 items-center justify-center rounded-md ${config.color} ${config.iconColor}`}>
        {config.icon}
      </div>
      <span className="text-sm text-gray-700">{label}</span>
    </div>
  );
}; 