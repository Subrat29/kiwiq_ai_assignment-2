import * as React from "react";
import { Bot } from "lucide-react";
import { BaseNode } from "./base-node";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const AskAINode = ({ id, data }) => {
  const inputs = [
    {
      id: "prompt",
      label: "Prompt",
      position: "33%",
    },
    {
      id: "context",
      label: "Context",
      position: "67%",
    },
  ];

  const outputs = [
    {
      id: "response",
      label: "Response",
      position: "50%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Ask AI"
      description="Prompt an AI language model. Provide all relevant context and use detailed prompts to get the best results."
      icon={Bot}
      inputs={inputs}
      outputs={outputs}
      themeColor="purple"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt" className="font-medium">
            AI Prompt
          </Label>
          <Textarea
            id="prompt"
            value={data.prompt || ""}
            onChange={(e) => data.updateField("prompt", e.target.value)}
            placeholder="Enter your prompt for the AI"
            rows={4}
            className="border-gray-200 focus:border-purple-300 focus:ring-purple-200"
          />
        </div>
      </div>
    </BaseNode>
  );
};

export { AskAINode };