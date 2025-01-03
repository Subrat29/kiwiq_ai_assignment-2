import * as React from "react";
import { Users } from "lucide-react";
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

const SegmentNode = ({ id, data }) => {
  const inputs = [
    {
      id: "sourceData",
      label: "Source",
      position: "50%",
    },
  ];

  const outputs = [
    {
      id: "filtered",
      label: "Filtered",
      position: "50%",
    },
  ];

  const segments = [
    { value: "enterprise", label: "Enterprise" },
    { value: "mid-market", label: "Mid-market" },
    { value: "smb", label: "SMB" },
    { value: "startup", label: "Startup" },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Segment Filter"
      description="Filter and analyze data based on customer segments. Apply segment-specific rules and conditions."
      icon={Users}
      inputs={inputs}
      outputs={outputs}
      themeColor="orange"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="segment" className="text-sm font-medium text-gray-900">
            Customer Segment
          </Label>
          <Select
            value={data.segment || "enterprise"}
            onValueChange={(value) => data.updateField("segment", value)}
          >
            <SelectTrigger
              id="segment"
              className="w-full border-gray-200 focus:border-orange-300 focus:ring-orange-200"
            >
              <SelectValue placeholder="Choose segment to filter" />
            </SelectTrigger>
            <SelectContent>
              {segments.map((segment) => (
                <SelectItem key={segment.value} value={segment.value}>
                  {segment.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Card className="border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Filter Status
              </span>
              <Badge
                variant="outline"
                className="text-orange-500 border-orange-200 bg-orange-50"
              >
                Active
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Records</span>
                <span className="text-gray-700">
                  {data.recordCount || "0"} matching
                </span>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-xs text-gray-500">
          Connect data source to begin filtering by segment
        </div>
      </div>
    </BaseNode>
  );
};

export { SegmentNode };