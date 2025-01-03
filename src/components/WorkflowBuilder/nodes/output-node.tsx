import * as React from "react";
import { ArrowDownToLine } from "lucide-react";
import { BaseNode } from "./base-node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const OutputNode = ({ id, data }) => {
  const inputs = [
    {
      id: "input",
      label: "Input",
      position: "50%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Output"
      description="Display and store the final output of your workflow. You can label and preview the output value here."
      icon={ArrowDownToLine}
      inputs={inputs}
      themeColor="rose"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label" className="font-medium">
            Label
          </Label>
          <Input
            id="label"
            value={data.label || ""}
            onChange={(e) => data.updateField("label", e.target.value)}
            placeholder="Enter output label"
            className="border-gray-200 focus:border-rose-300 focus:ring-rose-200"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="preview" className="font-medium">
            Preview Value
          </Label>
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 text-gray-600 min-h-[40px]">
            {data.value || "No value yet"}
          </div>
        </div>
      </div>
    </BaseNode>
  );
};

export { OutputNode };