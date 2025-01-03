import * as React from "react";
import { ListTree } from "lucide-react";
import { BaseNode } from "./base-node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const JoinListItemsNode = ({ id, data }) => {
  const inputs = [
    {
      id: "list",
      label: "List",
      position: "50%",
    },
  ];

  const outputs = [
    {
      id: "joinedList",
      label: "Joined List",
      position: "50%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Join List Items"
      description="Joins list items into a single text string using the specified separator."
      icon={ListTree}
      inputs={inputs}
      outputs={outputs}
      themeColor="green"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="separator" className="font-medium">
            Separator
          </Label>
          <Input
            id="separator"
            value={data.separator || ""}
            onChange={(e) => data.updateField("separator", e.target.value)}
            placeholder="Enter separator (e.g., comma, newline)"
            className="border-gray-200 focus:border-green-300 focus:ring-green-200"
          />
        </div>
      </div>
    </BaseNode>
  );
};

export { JoinListItemsNode };