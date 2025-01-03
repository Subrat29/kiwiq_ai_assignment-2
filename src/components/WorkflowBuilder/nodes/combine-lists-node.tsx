import * as React from "react";
import { ListTree } from "lucide-react";
import { BaseNode } from "./base-node";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CombineListsNode = ({ id, data }) => {
  const inputs = [
    {
      id: "input1",
      label: "Input 1",
      position: "25%",
    },
    {
      id: "input2",
      label: "Input 2",
      position: "50%",
    },
    {
      id: "input3",
      label: "Input 3",
      position: "75%",
    },
  ];

  const outputs = [
    {
      id: "combined",
      label: "Combined",
      position: "50%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Combine Lists"
      description="Merge multiple lists into a single combined list. Maintains order of inputs and handles duplicates."
      icon={ListTree}
      inputs={inputs}
      outputs={outputs}
      themeColor="green"
    >
      <div className="space-y-4">
        <Card className="border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Combination Status
              </span>
              <Badge
                variant="outline"
                className="text-green-500 border-green-200 bg-green-50"
              >
                {data.connectedInputs ? "Ready" : "Awaiting Input"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Connected Lists</span>
                <span className="text-gray-700">
                  {data.connectedInputs || 0} / 3
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Total Items</span>
                <span className="text-gray-700">
                  {data.totalItems || 0} items
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
          <div className="text-sm text-gray-500">
            Lists will be combined in the order of connection:
            <ul className="mt-2 space-y-1 text-xs">
              <li>• Input 1 (Primary list)</li>
              <li>• Input 2 (Secondary list)</li>
              <li>• Input 3 (Tertiary list)</li>
            </ul>
          </div>
        </div>

        <div className="text-xs text-gray-500">
          Connect input lists to begin combination
        </div> */}
      </div>
    </BaseNode>
  );
};

export { CombineListsNode };