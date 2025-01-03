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

const BaseNode = ({
  id,
  data,
  title,
  description,
  icon: Icon,
  inputs = [],
  outputs = [],
  children,
  themeColor = "blue",
}) => {
  const dispatch = useDispatch();

  const handleDelete = React.useCallback(() => {
    dispatch(deleteNode(id));
  }, [dispatch, id]);

  // Define theme styles based on color
  const NODE_STYLES = {
    background: "bg-white hover:bg-gray-50/50",
    border: `border-${themeColor}-200 hover:border-${themeColor}-300`,
    icon: `text-${themeColor}-500 bg-${themeColor}-50`,
    handle: {
      border: {
        blue: "#93c5fd",
        green: "#86efac",
        purple: "#d8b4fe",
        orange: "#fdba74",
        rose: "#fda4af",
      }[themeColor],
      background: "#ffffff",
    },
  };

  const createHandle = ({
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
        style={{ ...HANDLE_STYLES, ...style }}
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
  );

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "w-[320px] rounded-xl shadow-sm border-2 transition-all duration-200",
          NODE_STYLES.background,
          NODE_STYLES.border
        )}
      >
        {inputs.map((input) =>
          createHandle({
            type: "target",
            position: Position.Top,
            id: `${id}-${input.id}`,
            style: {
              borderColor: NODE_STYLES.handle.border,
              background: NODE_STYLES.handle.background,
              left: input.position,
            },
            label: input.label,
          })
        )}

        {outputs.map((output) =>
          createHandle({
            type: "source",
            position: Position.Bottom,
            id: `${id}-${output.id}`,
            style: {
              borderColor: NODE_STYLES.handle.border,
              background: NODE_STYLES.handle.background,
              left: output.position,
            },
            label: output.label,
          })
        )}

        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                NODE_STYLES.icon
              )}
            >
              <Icon className="h-4 w-4" />
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
              <p className="text-sm text-gray-500">{data.subtitle || "Node"}</p>
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

        <div className="relative space-y-4 p-4">
          {children}
        </div>
      </Card>
    </TooltipProvider>
  );
};

export { BaseNode };