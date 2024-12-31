import { ArrowUpToLine } from 'lucide-react'
import { BaseNode } from './base-node'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Position } from 'reactflow'

export const OutputNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Output"
      description="Exit point for passing values out of automation."
      variant="output"
      data={{
        ...data,
        icon: <ArrowUpToLine className="h-4 w-4" />,
        subtitle: "Flow Output",
      }}
      inputs={[
        { id: 'input', label: 'Input', style: { top: '-12px', left: '50%', transform: 'translateX(-50%)' } }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="output-name">Output Name</Label>
          <Input
            id="output-name"
            value={data.outputName || ''}
            onChange={(e) => data.updateField('outputName', e.target.value)}
            placeholder="Enter output name"
          />
        </div>
      </div>
    </BaseNode>
  )
}

