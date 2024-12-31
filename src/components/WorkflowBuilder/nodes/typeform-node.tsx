import { ClipboardList } from 'lucide-react'
import { BaseNode } from './base-node'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Position } from 'reactflow'

export const TypeformNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Typeform Submission Reader"
      description="Read the responses of a Typeform form."
      variant="typeform"
      data={{
        ...data,
        icon: <ClipboardList className="h-4 w-4" />,
        subtitle: "Typeform",
      }}
      inputs={[
        { id: 'responseLimit', label: 'Response Limit', style: { top: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
      outputs={[
        { id: 'q1', label: 'Question 1', style: { bottom: '-12px', left: '25%', transform: 'translateX(-50%)' } },
        { id: 'q2', label: 'Question 2', style: { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' } },
        { id: 'q3', label: 'Question 3', style: { bottom: '-12px', left: '75%', transform: 'translateX(-50%)' } }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="form-id">Form ID</Label>
          <Input
            id="form-id"
            value={data.formId || ''}
            onChange={(e) => data.updateField('formId', e.target.value)}
            placeholder="Enter Typeform ID"
          />
        </div>
      </div>
    </BaseNode>
  )
}

