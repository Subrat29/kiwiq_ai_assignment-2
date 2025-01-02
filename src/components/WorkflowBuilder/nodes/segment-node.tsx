import { BaseNode } from './base-node'
import { Users } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export const SegmentNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Segment Filter"
      description="Filter data by customer segment"
      variant="segment"
      data={{
        ...data,
        icon: <Users className="h-4 w-4" />,
        subtitle: "Segment",
      }}
      inputs={[
        { id: 'input', label: 'Data' }
      ]}
      outputs={[
        { id: 'output', label: 'Filtered Data' }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="segment">Segment</Label>
          <Select
            value={data.segment || 'enterprise'}
            onValueChange={(value) => data.updateField('segment', value)}
          >
            <SelectTrigger id="segment">
              <SelectValue placeholder="Select segment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="enterprise">Enterprise</SelectItem>
              <SelectItem value="mid-market">Mid-market</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  )
}

