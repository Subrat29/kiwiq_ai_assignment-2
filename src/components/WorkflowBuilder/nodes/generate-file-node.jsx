import * as React from "react";
import { FileText } from "lucide-react";
import { BaseNode } from "./base-node";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GenerateFileNode = ({ id, data }) => {
  const inputs = [
    {
      id: "fileName",
      label: "Name",
      position: "33%",
    },
    {
      id: "fileContents",
      label: "Contents",
      position: "67%",
    },
  ];

  const outputs = [
    {
      id: "generatedFile",
      label: "File",
      position: "50%",
    },
  ];

  const fileTypes = [
    { value: "pdf", label: "PDF Document (.pdf)" },
    { value: "docx", label: "Word Document (.docx)" },
    { value: "txt", label: "Text File (.txt)" },
    { value: "csv", label: "CSV Spreadsheet (.csv)" },
  ];

  return (
    <BaseNode
      id={id}
      data={data}
      title="Generate File"
      description="Create various file types from input data. Supports PDF, Word, Text, and CSV formats with customizable file names."
      icon={FileText}
      inputs={inputs}
      outputs={outputs}
      themeColor="blue"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="file-name" className="text-sm font-medium text-gray-900">
            File Name
          </Label>
          <Input
            id="file-name"
            value={data.fileName || ""}
            onChange={(e) => data.updateField("fileName", e.target.value)}
            placeholder="Enter file name"
            className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="file-type" className="text-sm font-medium text-gray-900">
            File Type
          </Label>
          <Select
            value={data.fileType || "pdf"}
            onValueChange={(value) => data.updateField("fileType", value)}
          >
            <SelectTrigger
              id="file-type"
              className="border-gray-200 focus:border-blue-300 focus:ring-blue-200"
            >
              <SelectValue placeholder="Select file type" />
            </SelectTrigger>
            <SelectContent>
              {fileTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* <Card className="border border-gray-200">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-900">
                Generation Status
              </span>
              <Badge
                variant="outline"
                className="text-blue-500 border-blue-200 bg-blue-50"
              >
                {data.status || "Ready"}
              </Badge>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Output Format</span>
                <span className="text-gray-700">
                  {data.fileType?.toUpperCase() || "Not Set"}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">File Size</span>
                <span className="text-gray-700">
                  {data.fileSize || "0 KB"}
                </span>
              </div>
            </div>
          </div>
        </Card> */}

        {/* <div className="text-xs text-gray-500">
          Connect inputs and configure settings to generate file
        </div> */}
      </div>
    </BaseNode>
  );
};

export { GenerateFileNode };