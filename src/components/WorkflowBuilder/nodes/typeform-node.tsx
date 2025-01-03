import * as React from "react";
import { ClipboardList } from "lucide-react";
import { BaseNode } from "./base-node";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const TypeformNode = ({ id, data }) => {
  const inputs = [
    {
      id: "responseLimit",
      label: "Response Limit",
      position: "50%",
    },
  ];

  const outputs = [
    {
      id: "q1",
      label: "Question 1",
      position: "25%",
    },
    {
      id: "q2",
      label: "Question 2",
      position: "50%",
    },
    {
      id: "q3",
      label: "Question 3",
      position: "75%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Typeform Submission Reader"
      description="Read and process responses from a Typeform form. Connects to your Typeform account to fetch submission data."
      icon={ClipboardList}
      inputs={inputs}
      outputs={outputs}
      themeColor="blue"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-id" className="font-medium">
            Form ID
          </Label>
          <Input
            id="form-id"
            value={data.formId || ""}
            onChange={(e) => data.updateField("formId", e.target.value)}
            placeholder="Enter Typeform ID"
            className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
          />
        </div>
      </div>
    </BaseNode>
  );
};

export { TypeformNode };