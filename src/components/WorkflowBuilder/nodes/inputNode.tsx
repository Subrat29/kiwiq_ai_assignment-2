"use client"

import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
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
import { updateNodeField } from "../../../redux/flowSlice"
import { FileInput, Type } from 'lucide-react'

export const InputNode = ({ id, data }) => {
  const dispatch = useDispatch()
  const { inputName = id.replace('customInput-', 'input_'), inputType: initialInputType = 'Text' } = data || {}

  const [currName, setCurrName] = useState(inputName)
  const [inputType, setInputType] = useState(initialInputType)

  useEffect(() => {
    dispatch(updateNodeField({ nodeId: id, fieldName: 'inputName', fieldValue: currName }))
    dispatch(updateNodeField({ nodeId: id, fieldName: 'inputType', fieldValue: inputType }))
  }, [currName, inputType, dispatch, id])

  return (
    <BaseNode
      id={id}
      data={{
        ...data,
        icon: inputType === 'Text' ? <Type className="h-4 w-4" /> : <FileInput className="h-4 w-4" />
      }}
      title="Input"
      outputs={[{ id: 'value', type: 'source' }]}
      className="border-blue-200 bg-blue-50/50"
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
          <Select value={inputType} onValueChange={setInputType}>
            <SelectTrigger id="type" className="h-8">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Text">Text</SelectItem>
              <SelectItem value="File">File</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  )
}

