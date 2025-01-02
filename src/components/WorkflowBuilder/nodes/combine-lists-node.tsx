import * as React from "react";
import { Handle, Position } from "reactflow";
import { useDispatch } from "react-redux";
import { ListTree, X, HelpCircle } from "lucide-react";
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

const NODE_STYLES = {
  background: "bg-white hover:bg-gray-50/50",
  border: "border-green-200 hover:border-green-300",
  icon: "text-green-500 bg-green-50",
  handle: {
    border: "#86efac",
    background: "#ffffff",
  },
};

const CombineListsNode = ({ id, data }) => {
  const dispatch = useDispatch();

  const handleDelete = React.useCallback(() => {
    dispatch(deleteNode(id));
  }, [dispatch, id]);

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

  const inputs = [
    {
      id: `${id}-input1`,
      label: "Input 1",
      style: {
        borderColor: NODE_STYLES.handle.border,
        background: NODE_STYLES.handle.background,
      },
      position: "25%",
    },
    {
      id: `${id}-input2`,
      label: "Input 2",
      style: {
        borderColor: NODE_STYLES.handle.border,
        background: NODE_STYLES.handle.background,
      },
      position: "50%",
    },
    {
      id: `${id}-input3`,
      label: "Input 3",
      style: {
        borderColor: NODE_STYLES.handle.border,
        background: NODE_STYLES.handle.background,
      },
      position: "75%",
    },
  ];

  const outputs = [
    {
      id: `${id}-combined`,
      label: "Combined List",
      style: {
        borderColor: NODE_STYLES.handle.border,
        background: NODE_STYLES.handle.background,
      },
      position: "50%",
    },
  ];

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
            id: input.id,
            style: { ...input.style, left: input.position },
            label: input.label,
          })
        )}

        {outputs.map((output) =>
          createHandle({
            type: "source",
            position: Position.Bottom,
            id: output.id,
            style: { ...output.style, left: output.position },
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
              <ListTree className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900">Combine Lists</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      Combines multiple lists into a single list.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-gray-500">List Operations</p>
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
          <div className="text-sm text-gray-500">
            This node will combine the input lists in the order they are connected.
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export { CombineListsNode };