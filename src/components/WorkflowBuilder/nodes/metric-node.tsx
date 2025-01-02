import { BaseNode } from './base-node'
import { BarChart } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

export const MetricNode = ({ id, data }) => {
  return (
    <BaseNode
      id={id}
      title="Metric Selection"
      description="Select performance metric"
      variant="metric"
      data={{
        ...data,
        icon: <BarChart className="h-4 w-4" />,
        subtitle: "Metric",
      }}
      inputs={[
        { id: 'input', label: 'Data' }
      ]}
      outputs={[
        { id: 'output', label: 'Metric Data' }
      ]}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="metric">Metric</Label>
          <Select
            value={data.metric || 'engagement'}
            onValueChange={(value) => data.updateField('metric', value)}
          >
            <SelectTrigger id="metric">
              <SelectValue placeholder="Select metric" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engagement">Engagement Rate</SelectItem>
              <SelectItem value="ctr">Click-through Rate (CTR)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </BaseNode>
  )
}

