"use client"

import { useState, useEffect, useCallback } from "react"
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
import { ArrowDownToLine, ImageIcon } from 'lucide-react'

export const OutputNode = ({ id, data }) => {
  const { outputName, outputType, updateField } = data

  const [currName, setCurrName] = useState(outputName || id.replace('customOutput-', 'output_'))
  const [type, setType] = useState(outputType || 'Text')

  const handleUpdateField = useCallback((fieldName, value) => {
    if (updateField) {
      updateField(fieldName, value)
    }
  }, [updateField])

  useEffect(() => {
    handleUpdateField('outputName', currName)
    handleUpdateField('outputType', type)
  }, [currName, type, handleUpdateField])

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        icon: type === 'Text' ? <ArrowDownToLine className="h-4 w-4" /> : <ImageIcon className="h-4 w-4" />
      }}
      title="Output"
      inputs={[{ id: 'input', type: 'target' }]}
      outputs={[{ id: 'output', type: 'source' }]}
      className="border-green-200 bg-green-50/50"
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={currName}
            onChange={(e) => setCurrName(e.target.value)}
            className="h-8"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger id="type" className="h-8">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  )
}