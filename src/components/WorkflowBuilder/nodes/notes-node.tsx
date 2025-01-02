import * as React from "react";
import { useDispatch } from "react-redux";
import { StickyNote, X, HelpCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteNode } from "@/redux/flowSlice";
import { cn } from "@/lib/utils";

const NODE_STYLES = {
  background: "bg-white hover:bg-gray-50/50",
  border: "border-yellow-200 hover:border-yellow-300",
  icon: "text-yellow-500 bg-yellow-50",
};

const NotesNode = ({ id, data }) => {
  const dispatch = useDispatch();

  const handleDelete = React.useCallback(() => {
    dispatch(deleteNode(id));
  }, [dispatch, id]);

  return (
    <TooltipProvider>
      <Card
        className={cn(
          "w-[320px] rounded-xl shadow-sm border-2 transition-all duration-200",
          NODE_STYLES.background,
          NODE_STYLES.border
        )}
      >
        <div className="flex items-center justify-between p-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                NODE_STYLES.icon
              )}
            >
              <StickyNote className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-gray-900">Notes</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-4 w-4 p-0">
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs text-sm">
                      Add notes or comments to document your workflow. These notes help explain your process and decisions.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-sm text-gray-500">Documentation</p>
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
          <div className="space-y-4">
            <Textarea
              value={data.notes || ""}
              onChange={(e) => data.updateField("notes", e.target.value)}
              placeholder="Enter your notes here..."
              rows={6}
              className="border-gray-200 focus:border-yellow-300 focus:ring-yellow-200"
            />
          </div>
        </div>
      </Card>
    </TooltipProvider>
  );
};

export { NotesNode };