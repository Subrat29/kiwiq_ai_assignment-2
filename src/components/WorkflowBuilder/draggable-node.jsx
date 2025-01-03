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
  LineChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const nodeTypes = {
  input: {
    icon: ArrowUpToLine,
    description: 'Input node for receiving data into your workflow'
  },
  output: {
    icon: ArrowDownToLine,
    description: 'Output node for final workflow results'
  },
  askAI: {
    icon: Bot,
    description: 'AI-powered node for natural language processing'
  },
  combineLists: {
    icon: ListTree,
    description: 'Combine multiple lists into a single list'
  },
  joinListItems: {
    icon: ListTree,
    description: 'Join list items with a specified separator'
  },
  generateFile: {
    icon: ClipboardList,
    description: 'Generate files from your workflow data'
  },
  typeform: {
    icon: ClipboardList,
    description: 'Process Typeform submissions and responses'
  },
  notes: {
    icon: StickyNote,
    description: 'Add documentation and notes to your workflow'
  },
  channel: {
    icon: Linkedin,
    description: 'Configure social media channel integrations'
  },
  segment: {
    icon: Users,
    description: 'Define and manage audience segments'
  },
  metric: {
    icon: BarChart,
    description: 'Track and analyze key metrics'
  },
  analysis: {
    icon: LineChart,
    description: 'Perform data analysis and visualization'
  },
  default: {
    icon: Box,
    description: 'Custom node type'
  }
};

export const DraggableNode = ({ type, label }) => {
  const dispatch = useDispatch();
  const getNodeId = useNodeId();

  const nodeType = nodeTypes[type] || nodeTypes.default;
  const Icon = nodeType.icon;

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
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            className={cn(
              'w-full px-3 py-2 h-auto justify-start gap-2.5',
              'border rounded-lg shadow-sm',
              'transition-all duration-200',
              'bg-white hover:bg-gray-50/50',
              'border-gray-200 hover:border-gray-300'
            )}
            onDragStart={handleDragStart}
            onClick={handleClick}
            draggable
          >
            <div className={cn(
              'flex items-center justify-center w-6 h-6 rounded-md',
              'bg-gray-50',
              'text-gray-600'
            )}>
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {label}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="right" className="max-w-[200px]">
          <p className="text-sm">{nodeType.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};