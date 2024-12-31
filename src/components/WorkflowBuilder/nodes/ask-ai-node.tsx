import { Bot } from 'lucide-react'
import { BaseNode } from './base-node'
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Position } from 'reactflow'

export const AskAINode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Ask AI"
      description="Prompt an AI language model. Provide all relevant context and use detailed prompts to get the best results."
      variant="ai"
      data={{
        ...data,
        icon: <Bot className="h-4 w-4" />,
        subtitle: "AI Processing",
      }}
      inputs={[
        { id: 'prompt', label: 'Prompt', style: { top: '-12px', left: '33%', transform: 'translateX(-50%)' } },
        { id: 'context', label: 'Context', style: { top: '-12px', left: '67%', transform: 'translateX(-50%)' } }
      ]}
      outputs={[
        { id: 'response', label: 'Response', style: { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="prompt">AI Prompt</Label>
          <Textarea
            id="prompt"
            value={data.prompt || ''}
            onChange={(e) => data.updateField('prompt', e.target.value)}
            placeholder="Enter your prompt for the AI"
            rows={4}
          />
        </div>
      </div>
    </BaseNode>
  )
}

