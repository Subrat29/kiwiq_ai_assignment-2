import { ArrowDownToLine } from 'lucide-react'
import { BaseNode } from './base-node'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Position } from 'reactflow'

export const InputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Input"
      description="Entry point for receiving values into the automation."
      variant="input"
      data={{
        ...data,
        icon: <ArrowDownToLine className="h-4 w-4" />,
        subtitle: "Flow Input",
      }}
      outputs={[
        { id: 'output', label: 'Output', style: { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="input-name">Input Name</Label>
          <Input
            id="input-name"
            value={data.inputName || ''}
            onChange={(e) => data.updateField('inputName', e.target.value)}
            placeholder="Enter input name"
          />
        </div>
      </div>
    </BaseNode>
  )
}

