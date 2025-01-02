import * as React from "react";
import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { X, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteNode } from "@/redux/flowSlice";
import { cn } from "@/lib/utils";

const HANDLE_STYLES = {
  width: 12,
  height: 12,
  border: "2px solid",
  borderRadius: "50%",
  backgroundColor: "white",
  position: "absolute",
  zIndex: 1,
};

// Default styles for fallback
const DEFAULT_STYLES = {
  background: "bg-white hover:bg-gray-50/50",
  border: "border-gray-200 hover:border-gray-300",
  icon: "text-gray-500 bg-gray-50",
  handle: {
    border: "#e5e7eb",
    background: "#ffffff",
  },
};

// Theme variants for different node types
const NODE_VARIANTS = {
  file: {
    background: "bg-white hover:bg-gray-50/50",
    border: "border-blue-200 hover:border-blue-300",
    icon: "text-blue-500 bg-blue-50",
    handle: {
      border: "#93c5fd",
      background: "#ffffff",
    },
  },
  ai: {
    background: "bg-white hover:bg-gray-50/50",
    border: "border-purple-200 hover:border-purple-300",
    icon: "text-purple-500 bg-purple-50",
    handle: {
      border: "#d8b4fe",
      background: "#ffffff",
    },
  },
  list: {
    background: "bg-white hover:bg-gray-50/50",
    border: "border-green-200 hover:border-green-300",
    icon: "text-green-500 bg-green-50",
    handle: {
      border: "#86efac",
      background: "#ffffff",
    },
  },
  input: {
    background: "bg-white hover:bg-gray-50/50",
    border: "border-orange-200 hover:border-orange-300",
    icon: "text-orange-500 bg-orange-50",
    handle: {
      border: "#fdba74",
      background: "#ffffff",
    },
  },
  output: {
    background: "bg-white hover:bg-gray-50/50",
    border: "border-rose-200 hover:border-rose-300",
    icon: "text-rose-500 bg-rose-50",
    handle: {
      border: "#fda4af",
      background: "#ffffff",
    },
  },
  notes: {
    background: "bg-white hover:bg-gray-50/50",
    border: "border-yellow-200 hover:border-yellow-300",
    icon: "text-yellow-500 bg-yellow-50",
    handle: {
      border: "#fcd34d",
      background: "#ffffff",
    },
  },
  typeform: {
    background: "bg-white hover:bg-gray-50/50",
    border: "border-blue-200 hover:border-blue-300",
    icon: "text-blue-500 bg-blue-50",
    handle: {
      border: "#93c5fd",
      background: "#ffffff",
    },
  },
};

const BaseNode = ({
  id,
  title,
  description,
  variant = "file",
  icon,
  subtitle,
  inputs = [],
  outputs = [],
  children,
}) => {
  const dispatch = useDispatch();
  
  // Use the specified variant styles or fall back to default styles
  const nodeStyles = NODE_VARIANTS[variant] || DEFAULT_STYLES;

  const handleDelete = React.useCallback(() => {
    dispatch(deleteNode(id));
  }, [dispatch, id]);

  const createHandle = React.useCallback(({
    type,
    position,
    id: handleId,
    style = {},
    label = "",
  }) => (
    <div
      key={handleId}
      className="absolute"
      style={{
        left: style.left,
        top: position === Position.Top ? "0px" : "auto",
        bottom: position === Position.Bottom ? "0px" : "auto",
        transform: "translate(-50%, -50%)",
      }}
    >
      <Handle
        type={type}
        position={position}
        id={handleId}
        style={{ 
          ...HANDLE_STYLES, 
          borderColor: nodeStyles.handle.border,
          background: nodeStyles.handle.background,
          ...style 
        }}
      />
      {label && (
        <span
          className="absolute text-xs text-gray-500 whitespace-nowrap"
          style={{
            [position === Position.Top ? "bottom" : "top"]: "5px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "max-content",
          }}
        >
          {label}
        </span>
      )}
    </div>
  ), [nodeStyles]);

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "w-[320px] rounded-xl shadow-sm border-2 transition-all duration-200",
          nodeStyles.background,
          nodeStyles.border
        )}
      >
        {inputs.map((input) =>
          createHandle({
            type: "target",
            position: Position.Top,
            id: `${id}-${input.id}`,
            style: input.style,
            label: input.label,
          })
        )}

        {outputs.map((output) =>
          createHandle({
            type: "source",
            position: Position.Bottom,
            id: `${id}-${output.id}`,
            style: output.style,
            label: output.label,
          })
        )}

        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                nodeStyles.icon
              )}
            >
              {icon}
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900">{title}</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">{description}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-gray-500">{subtitle}</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-colors"
            onClick={handleDelete}
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>

        <div className="relative p-4">
          {children}
        </div>
      </Card>
    </TooltipProvider>
  );
};

export { BaseNode };