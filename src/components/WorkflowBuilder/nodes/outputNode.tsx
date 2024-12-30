"use client"

import { useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { BaseNode } from "./base-node"
import { ArrowUpToLine } from 'lucide-react'

export const OutputNode = ({ id, data }) => {
  const outputName = data?.outputName || 'output'
  const outputType = data?.outputType || 'string'

  return (
    <BaseNode
      id={id}
      data={{
        icon: <ArrowUpToLine className="h-4 w-4" />,
        subtitle: "Flow Basics",
        outputName,
        outputType,
      }}
      title="Output"
      description="Exit point for passing values out of automation. Useful for webhooks and nested automations."
      inputs={[{ id: 'input', type: 'target' }]}
      className="border-green-100"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Output name
            </Label>
          </div>
          <Input
            id="name"
            value={outputName}
            onChange={(e) => data.updateField('outputName', e.target.value)}
            className="h-9"
            placeholder="Enter output name"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Output type
            </Label>
          </div>
          <Select 
            value={outputType} 
            onValueChange={(value) => data.updateField('outputType', value)}
          >
            <SelectTrigger id="type" className="h-9">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="string">String</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="boolean">Boolean</SelectItem>
              <SelectItem value="object">Object</SelectItem>
              <SelectItem value="array">Array</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  )
}

