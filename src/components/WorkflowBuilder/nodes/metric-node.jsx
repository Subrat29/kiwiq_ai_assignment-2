import * as React from "react";
import { BarChart } from "lucide-react";
import { BaseNode } from "./base-node";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const MetricNode = ({ id, data }) => {
  const inputs = [
    {
      id: "sourceData",
      label: "Source",
      position: "50%",
    },
  ];

  const outputs = [
    {
      id: "metricData",
      label: "Metric",
      position: "50%",
    },
  ];

  const metrics = [
    { value: "engagement", label: "Engagement Rate" },
    { value: "ctr", label: "Click-through Rate (CTR)" },
    { value: "conversion", label: "Conversion Rate" },
    { value: "bounce", label: "Bounce Rate" },
    { value: "retention", label: "Retention Rate" },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Metric Selection"
      description="Select and configure performance metrics for analysis. Transform raw data into meaningful KPIs."
      icon={BarChart}
      inputs={inputs}
      outputs={outputs}
      themeColor="rose"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="metric" className="text-sm font-medium text-gray-900">
            Performance Metric
          </Label>
          <Select
            value={data.metric || "engagement"}
            onValueChange={(value) => data.updateField("metric", value)}
          >
            <SelectTrigger
              id="metric"
              className="w-full border-gray-200 focus:border-rose-300 focus:ring-rose-200"
            >
              <SelectValue placeholder="Choose metric to analyze" />
            </SelectTrigger>
            <SelectContent>
              {metrics.map((metric) => (
                <SelectItem key={metric.value} value={metric.value}>
                  {metric.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Metric Overview
              </span>
              <Badge
                variant="outline"
                className="text-rose-500 border-rose-200 bg-rose-50"
              >
                {data.metric ? "Selected" : "Choose Metric"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Current Value</span>
                <span className="text-gray-700">
                  {data.currentValue || "No data"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Trend</span>
                <span className="text-gray-700">
                  {data.trend || "Calculating..."}
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-xs text-gray-500">
          Connect data source to view metric performance
        </div>
      </div>
    </BaseNode>
  );
};

export { MetricNode };