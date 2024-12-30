"use client"

import { Brain } from 'lucide-react'
import { BaseNode } from "./base-node"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const LLMNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      data={{ ...data, icon: <Brain className="h-4 w-4" /> }}
      title="LLM"
      inputs={[
        { id: 'system', type: 'target' },
        { id: 'prompt', type: 'target' }
      ]}
      outputs={[{ id: 'response', type: 'source' }]}
      className="border-purple-200 bg-purple-50/50"
    >
      <Alert className="bg-purple-100/50">
        <AlertDescription>
          This node processes text using Large Language Models.
        </AlertDescription>
      </Alert>
    </BaseNode>
  )
}

