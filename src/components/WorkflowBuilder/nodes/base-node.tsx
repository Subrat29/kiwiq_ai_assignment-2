import React from 'react';
import { Handle, Position } from 'reactflow';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { X, HelpCircle } from 'lucide-react';

interface BaseNodeProps {
  id: string;
  title: string;
  description: string;
  variant: 'channel' | 'segment' | 'metric' | 'analysis';
  data: {
    icon: React.ReactNode;
    subtitle: string;
    [key: string]: any;
  };
  inputs?: { id: string; label: string }[];
  outputs?: { id: string; label: string }[];
  children: React.ReactNode;
}

const NODE_VARIANTS = {
  channel: 'border-blue-200 bg-blue-50',
  segment: 'border-green-200 bg-green-50',
  metric: 'border-purple-200 bg-purple-50',
  analysis: 'border-orange-200 bg-orange-50',
};

export const BaseNode: React.FC<BaseNodeProps> = ({
  id,
  title,
  description,
  variant,
  data,
  inputs = [],
  outputs = [],
  children,
}) => {
  return (
    <TooltipProvider>
      <Card className={`w-[280px] overflow-hidden ${NODE_VARIANTS[variant]}`}>
        {inputs.map((input) => (
          <Handle
            key={input.id}
            type="target"
            position={Position.Top}
            id={input.id}
            style={{ top: 0, borderRadius: 0 }}
          />
        ))}
        {outputs.map((output) => (
          <Handle
            key={output.id}
            type="source"
            position={Position.Bottom}
            id={output.id}
            style={{ bottom: 0, borderRadius: 0 }}
          />
        ))}
        <div className="p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-white">{data.icon}</div>
              <div>
                <h3 className="text-sm font-medium">{title}</h3>
                <p className="text-xs text-gray-500">{data.subtitle}</p>
              </div>
            </div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <HelpCircle className="h-4 w-4" />
                  <span className="sr-only">Node info</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{description}</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="mt-2">{children}</div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

