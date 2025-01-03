import * as React from "react";
import { ArrowDownToLine as InputIcon } from "lucide-react";
import { BaseNode } from "./base-node";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

const InputNode = ({ id, data }) => {
  const outputs = [
    {
      id: "output",
      label: "Output",
      position: "50%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Input"
      description="Add custom input values to your workflow. Define labels and values that can be referenced by other nodes."
      icon={InputIcon}
      outputs={outputs}
      themeColor="orange"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="label" className="text-sm font-medium text-gray-900">
            Label
          </Label>
          <Input
            id="label"
            value={data.label || ""}
            onChange={(e) => data.updateField("label", e.target.value)}
            placeholder="Enter input label"
            className="border-gray-200 focus:border-orange-300 focus:ring-orange-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="value" className="text-sm font-medium text-gray-900">
            Value
          </Label>
          <Input
            id="value"
            value={data.value || ""}
            onChange={(e) => data.updateField("value", e.target.value)}
            placeholder="Enter value"
            className="border-gray-200 focus:border-orange-300 focus:ring-orange-200"
          />
        </div>

        {/* <Card className="border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Input Status
              </span>
              <Badge
                variant="outline"
                className="text-orange-500 border-orange-200 bg-orange-50"
              >
                {data.value ? "Set" : "Empty"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Output Key</span>
                <span className="text-gray-700">
                  {data.label || "undefined"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Type</span>
                <span className="text-gray-700">
                  {typeof data.value || "string"}
                </span>
              </div>
            </div>
          </div>
        </Card> */}

        {/* <div className="text-xs text-gray-500">
          Set label and value to provide input to connected nodes
        </div> */}
      </div>
    </BaseNode>
  );
};

export { InputNode };