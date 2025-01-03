import * as React from "react";
import { Linkedin } from "lucide-react";
import { BaseNode } from "./base-node";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ChannelNode = ({ id, data }) => {
  const outputs = [
    {
      id: "connections",
      label: "Connections",
      position: "33%",
    },
    {
      id: "activity",
      label: "Activity",
      position: "67%",
    },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="LinkedIn"
      description="Connect to LinkedIn API to fetch professional network data, interactions, and activity metrics."
      icon={Linkedin}
      outputs={outputs}
      themeColor="blue"
    >
      <div className="space-y-4">
        <Card className="border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Connection Status
              </span>
              <Badge
                variant="outline"
                className="text-blue-500 border-blue-200 bg-blue-50"
              >
                Ready
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Last Sync</span>
                <span className="text-gray-700">2 minutes ago</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Data Points</span>
                <span className="text-gray-700">1.2K</span>
              </div>
            </div>
          </div>
        </Card>

        <div className="text-xs text-gray-500">
          Connect outputs to analyze LinkedIn metrics
        </div>
      </div>
    </BaseNode>
  );
};

export { ChannelNode };
