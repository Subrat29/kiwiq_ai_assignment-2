import * as React from "react";
import { LineChart } from "lucide-react";
import { BaseNode } from "./base-node";
import { Card } from "@/components/ui/card";

const AnalysisNode = ({ id, data }) => {
  const inputs = [
    {
      id: "metrics",
      label: "Metrics",
      position: "33%",
    },
    {
      id: "config",
      label: "Config",
      position: "67%",
    },
  ];
  
  const outputs = [
    {
      id: "analysis",
      label: "Analysis",
      position: "50%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Performance Analysis"
      description="Analyze and visualize performance metrics. Configure chart type and parameters to generate insightful visualizations."
      icon={LineChart}
      inputs={inputs}
      outputs={outputs}
      themeColor="green"
    >
      <div className="space-y-4">
        <Card className="border border-gray-200">
          <div className="p-4">
            <div className="font-medium text-sm text-gray-900 mb-2">
              Analysis Preview
            </div>
            <div className="w-full h-32 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center">
              <span className="text-sm text-gray-400">
                Chart visualization will appear here
              </span>
            </div>
          </div>
        </Card>
        
        <div className="text-xs text-gray-500 mt-2">
          Connect metric data and configuration to generate analysis
        </div>
      </div>
    </BaseNode>
  );
};

export { AnalysisNode };