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
import { ArrowDownToLine } from 'lucide-react'

export const InputNode = ({ id, data }) => {
  const inputName = data?.inputName || 'input'
  const inputType = data?.inputType || 'string'

  return (
    <BaseNode
      id={id}
      data={{
        icon: <ArrowDownToLine className="h-4 w-4" />,
        subtitle: "Flow Basics",
        inputName,
        inputType,
      }}
      title="Input"
      description="Entry point for receiving values into the automation. Used for accepting user inputs and external data."
      outputs={[{ id: 'output', type: 'source' }]}
      className="border-blue-100"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Input name
            </Label>
          </div>
          <Input
            id="name"
            value={inputName}
            onChange={(e) => data.updateField('inputName', e.target.value)}
            className="h-9"
            placeholder="Enter input name"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Label htmlFor="type" className="text-sm font-medium">
              Input type
            </Label>
          </div>
          <Select 
            value={inputType} 
            onValueChange={(value) => data.updateField('inputType', value)}
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

